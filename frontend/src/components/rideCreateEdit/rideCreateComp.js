import React from 'react';
import axios from 'axios';
import { createRide } from '../../util/ride_api_util';



const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")
const polyline = require('@mapbox/polyline')

class NewMap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            zoom: 12,
            start: [],
            destination: [],
            waypoints: [],
            polyline: "",
            test: "",
            map: {},
            markers: [],
            start_marker: [],
            address: this.props.content.start_address,
            location: this.props.content.start_city,
            center: [],
            close: "",
            distance: ""


        }


        this.handleButtonDelete = this.handleButtonDelete.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }




    componentDidMount() {

        let location = this.state.location.split(" ").join("%20")
        let address = this.state.address.split(" ").join("%20")

        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}%2C%20${location}.json?access_token=pk.eyJ1IjoicHJvc2UwMDIxIiwiYSI6ImNrMzZoYWdidTAxcm8zaW82MW5jZmV6c2EifQ.PRbSpg500wqcoctnYFTIog&autocomplete=true`)
            .then(res => {
            mapboxgl.accessToken = "pk.eyJ1IjoicHJvc2UwMDIxIiwiYSI6ImNrMzZoYWdidTAxcm8zaW82MW5jZmV6c2EifQ.PRbSpg500wqcoctnYFTIog"
            var map = new mapboxgl.Map({
                container: this.mapContainer,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [res.data.features[0].center[0], res.data.features[0].center[1]],
                zoom: this.state.zoom,
                waypoints: this.state.waypoints,
                })

                this.setState({
                    map: map,
                    start_marker: [res.data.features[0].center[0], res.data.features[0].center[1]],
                    start: [res.data.features[0].center[0], res.data.features[0].center[1]]
                })
            })
            .then(() => {

                this.state.map.on("load", () => {
                    this.state.map.loadImage("https://i.imgur.com/MK4NUzI.png", (error, image) => {
                        if (error) throw error;
                        this.state.map.addImage("custom-marker", image);
                        this.state.map.addLayer({
                            id: "start",
                            type: "symbol",
                            source: {
                                type: "geojson",
                                data: {
                                    type: 'FeatureCollection',
                                    features: [
                                        {
                                            type: 'Feature',
                                            properties: {},
                                            geometry: {
                                                type: "Point",
                                                coordinates: [this.state.start[0], this.state.start[1]]
                                            }
                                        }
                                    ]
                                }
                            },
                            layout: {
                                "icon-image": "custom-marker",
                            }

                        })
                    })
                })


                this.state.map.on("click", (e) => {
                    e.preventDefault();

                    this.setState({
                        waypoints: [...this.state.waypoints, `${e.lngLat["lng"] + "%2C%20" + e.lngLat["lat"]}`],
                        destination: [e.lngLat["lng"], e.lngLat["lat"]]
                    })

                    let marker = [e.lngLat["lng"], e.lngLat["lat"]]
                    this.state.markers.push(marker)
                    console.log(this.state.markers)

                    this.state.map.loadImage("https://i.imgur.com/MK4NUzI.png", (error, image) => {
                        if (error) throw error;

                        if (!this.state.map.hasImage("custom" + `${this.state.waypoints.length}`, image)) {
                            this.state.map.addImage("custom" + `${this.state.waypoints.length}`, image);

                        }

                        if (this.state.map.getSource("markers" + `${this.state.waypoints.length}`)) {
                            this.state.map.removeSource("markers" + `${this.state.waypoints.length}`)
                        }

                        this.state.map.addLayer({
                            id: "markers" + `${this.state.waypoints.length}`,
                            type: "symbol",
                            source: {
                                type: "geojson",
                                data: {
                                    type: 'FeatureCollection',
                                    features: [
                                        {
                                            type: 'Feature',
                                            properties: {},
                                            geometry: {
                                                type: "Point",
                                                coordinates: [marker[0], marker[1]]
                                            }
                                        }
                                    ]
                                }
                            },
                            layout: {
                                "icon-image": "custom-marker",
                            }

                        })
                    })


                })

            })

        
        

        



    }

    componentDidUpdate(prevProps, prevState) {
        

        if (prevState.waypoints.length !== this.state.waypoints.length) {

            function assembleClickQueryURL(start, waypoints, destination) {
                const coordinates = [start, destination]
                
                let wps = ""
                for (let i = 0; i < waypoints.length; i++) {
                    wps = wps.concat(waypoints[i])
                    console.log(wps)
                    if (waypoints[i] === undefined) {
                        continue
                    } else if (i < (waypoints.length - 1)) {
                        wps = wps.concat("%3B")
                    }
                }
                return (`https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates[0][0]}%2C%20${coordinates[0][1]}%3B${wps}.json?access_token=pk.eyJ1IjoiamJvbmFhIiwiYSI6ImNrMzZnaWdsdjAxaGozbm1wM254bnR5cGoifQ.zUuEvUSaf5GdH1zFqimOVw`)
            }

            let destination = this.state.destination
            let start = this.state.start
            let waypoints = this.state.waypoints

            this.state.markers.forEach((el) => {

                this.state.map.loadImage("https://i.imgur.com/MK4NUzI.png", (error, image) => {
                    if (error) throw error;

                    if (!this.state.map.hasImage("custom" + `${(this.state.markers.indexOf(el)) + 1}`, image)) {
                        this.state.map.addImage("custom" + `${(this.state.markers.indexOf(el)) + 1}`, image);

                    }

                    if (this.state.map.getSource("markers" + `${(this.state.markers.indexOf(el)) + 1}`)) {
                        this.state.map.removeSource("markers" + `${(this.state.markers.indexOf(el)) + 1}`)
                    }

                    this.state.map.addLayer({
                        id: "markers" + `${(this.state.markers.indexOf(el)) + 1}`,
                        type: "symbol",
                        source: {
                            type: "geojson",
                            data: {
                                type: 'FeatureCollection',
                                features: [
                                    {
                                        type: 'Feature',
                                        properties: {},
                                        geometry: {
                                            type: "Point",
                                            coordinates: [el[0], el[1]]
                                        }
                                    }
                                ]
                            }
                        },
                        layout: {
                            "icon-image": "custom-marker",
                        }

                    })
                })
            })

            axios.get(assembleClickQueryURL(start, waypoints, destination))
                .then((response) => {
                    this.setState({
                        distance: response.data.routes[0].distance
                    })
                    let polyline2 = polyline.toGeoJSON(`${response.data.routes[0].geometry}`)
                    this.setState({
                        polyline: polyline2
                    })
                    this.state.map.poly = polyline2


                    if (this.state.map.getSource("route" + `${this.state.waypoints.length - 1}`)) {
                        this.state.map.removeSource("route" + `${this.state.waypoints.length - 1}`)
                    }

                    if (this.state.waypoints.length === 0) {
                        for (let i = 0; i < this.state.markers.length; i++) {
                            this.state.map.removeSource(`markers${i}`)
                            this.state.map.removeLayer(`markers${i}`)
                        }
                    }
                    this.state.map.addLayer({
                        id: "route" + `${this.state.waypoints.length - 1}`,
                        type: "line",
                        source: {
                            type: "geojson",
                            data: {
                                type: "Feature",
                                properties: {},
                                geometry: polyline2
                            }
                        },
                        layout: {
                            "line-join": "round",
                            "line-cap": "round"
                        },
                        paint: {
                            "line-color": "#888",
                            "line-width": 2
                        }

                    })
                })

        }

    }








        
    handleSubmit() {
        
        let destination = this.state.waypoints.pop()
        
        this.setState({
            destination: destination,
            close: "bingo"
        })


        let ride = {
            title: this.props.content.title,
            description: this.props.content.description,
            author_id: this.props.content.author_id,
            author_rating: this.props.content.author_rating,
            author_name: this.props.content.author_name,
            duration: this.props.content.duration,
            start_address: this.props.content.start_address,
            start_city: this.props.content.start_city,
            distance: parseFloat((this.state.distance / 1609.3).toFixed(1)),
            polyline: this.state.polyline,
            start: this.state.start,
            destination: destination,
            waypoints: this.state.waypoints,
            markers: this.state.markers
        }

        this.props.closeModal()
        createRide(ride)
            .then( () => this.props.fetchRides())

    }

    handleButtonDelete(e) {
        e.preventDefault();

        let idx = Number(e.currentTarget.value) + 1

        let marker = []
        for (let j = 0; j < this.state.markers.length; j++) {
            if (j !== idx - 1) {
                marker.push(this.state.markers[j])
            }
            this.state.map.removeLayer("markers" + `${j + 1}`)
        }


        let returned = []
        for (let i = 0; i < this.state.waypoints.length; i++) {
            if (i !== idx - 1) {
                returned.push(this.state.waypoints[i])
            }
            this.state.map.removeLayer("route" + `${i}`)
        }

        this.setState({
            waypoints: returned,
            markers: marker
        })

    }


    // handleMarker(e) {
    //     e.preventDefault();
    //     let idx = this.state.waypoints.length
    //     this.state.map.removeLayer("markers" + `${idx}`)
    //     this.state.map.removeLayer("route" + `${idx}`)
    //     let returned = []
    //     for (let i = 0; i < this.state.waypoints.length; i++) {
    //         if (i !== (idx - 1)) {
    //             returned.push(this.state.waypoints[i])
    //         }
    //     }
        
    //     this.setState({
    //         waypoints: returned
    //     })



    // }


    // shouldComponentUpdate(nextProps, nextState) {
        
    //     if (nextState.close === "bingo") {
    //         return false
    //     }else if (nextState.map.length === this.state.map.length){
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.waypoints.length !== this.state.waypoints.length) {
            return true
        }else{
            return false
        }
    }

    render() {

        let display;
        if (this.state.waypoints.length > 0) {
            display = (
                <div>
                    <ul className="ride-create-map-ul">
                        {this.state.waypoints.map((wp) => (

                            <li className="ride-create-map-li">
                                <div className="ride-create-map-waypoint">Waypoint: {this.state.waypoints.indexOf(wp) + 1}</div>
                                <button className="ride-create-map-remove-button" value={`${this.state.waypoints.indexOf(wp)}`} onClick={this.handleButtonDelete}>Remove</button>
                            </li>

                        ))}
                    </ul>
                    {/* <button onClick={this.handleMarker}>Delete</button> */}
                </div>
            )
        } else {
            display = null
        }



        return (
          <div className="ride-create-container">
            
            <div
              className="ride-create-map"
              id="map"
              ref={el => (this.mapContainer = el)}
            ></div>

            <div className="ride-create-waypoints-and-button">
            
              {display}
            
              <button
                className="ride-create-button"
                onClick={this.handleSubmit}>
                Create Ride!
              </button>

            </div>
          </div>
        );
    }
}

export default NewMap;
