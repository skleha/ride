import React from 'react';
import axios from 'axios';
import { updateRide, fetchRides } from '../../util/ride_api_util';

const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")
const polyline = require('@mapbox/polyline')

class RideEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            zoom: 12,
            start: [],
            destination: [],
            waypoints: this.props.content.waypoints.concat([this.props.content.destination.split("%2C%20")]),
            polyline: "",
            test: "",
            map: {},
            markers: [],
            start_marker: [],
            center: [],
            close: "",
            distance: ""
        }



        this.handleButtonDelete = this.handleButtonDelete.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        mapboxgl.accessToken = "pk.eyJ1IjoicHJvc2UwMDIxIiwiYSI6ImNrMzZoYWdidTAxcm8zaW82MW5jZmV6c2EifQ.PRbSpg500wqcoctnYFTIog"
        var map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.props.content.start[0], this.props.content.start[1]],
            zoom: this.state.zoom,
            waypoints: this.state.waypoints,
        })

        this.state.map = map
        this.state.start_marker = this.props.content.start
        this.state.markers = this.props.content.markers

        let marks = []

        for (let i = 0; i < this.state.markers.length; i++) {
            if (typeof this.state.markers[i] === 'string') {
                marks.push(this.state.markers[i].split("%2C%20"))
            }else{
                marks.push(this.state.markers[i])
            }
        }

        this.setState({
            markers: marks
        })

        let res = []
        for (let j = 0; j < this.state.markers.length; j++) {
                res.push(this.state.markers[j])
            
        }

        map.on("load", () => {
            map.loadImage("https://i.imgur.com/MK4NUzI.png", (error, image) => {
                if (error) throw error;

                map.addImage("custom-marker", image);
                map.addLayer({
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
                                        coordinates: this.props.content.start
                                    }
                                }
                            ]
                        }
                    },
                    layout: {
                        "icon-image": "custom-marker",
                    }

                })


                for (let i = 0; i < this.state.markers.length; i++) {


                    map.addImage(`custom-marker${i}`, image);
                    map.addLayer({
                        id: "markers" + `${i}`,
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
                                            coordinates: [this.state.markers[i][0], this.state.markers[i][1]]
                                        }
                                    }
                                ]
                            }
                        },
                        layout: {
                            "icon-image": "custom-marker",
                        }

                    })
                }
            })
        })


        function assembleClickQueryURL(start, waypoints, destination) {
            const coordinates = [start, destination]

            let wps = ""
            for (let i = 0; i < waypoints.length; i++) {
                wps = wps.concat(waypoints[i])
                if (waypoints[i] === undefined) {
                    continue
                } else if (i < (waypoints.length - 1)) {
                    wps = wps.concat("%3B")
                }
            }
            return (`https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates[0][0]}%2C%20${coordinates[0][1]}%3B${wps}.json?access_token=pk.eyJ1IjoiamJvbmFhIiwiYSI6ImNrMzZnaWdsdjAxaGozbm1wM254bnR5cGoifQ.zUuEvUSaf5GdH1zFqimOVw`)
        }


        let destination = this.props.content.destination
        let start = this.state.start_marker
        let waypoints = this.state.waypoints


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


                if (this.state.map.getSource("route" + `${this.state.waypoints.length}`)) {
                    this.state.map.removeSource("route" + `${this.state.waypoints.length}`)
                }

                if (this.state.waypoints.length === 0) {
                    for (let i = 0; i < this.state.markers.length; i++) {
                        if (this.state.map.removeSource(`marker${i}`)) {
                            this.state.map.removeLayer(`marker${i}`)
                        }
                    }
                }
                this.state.map.addLayer({
                    id: "routestart",
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
            .then(() => {
                this.state.map.on("click", (e) => {
                    e.preventDefault();

                    if (this.state.map.getSource("routestart")) {
                        this.state.map.removeLayer("routestart")
                        this.state.map.removeSource("routestart")
                    }

                    this.setState({
                        waypoints: [...this.state.waypoints, `${e.lngLat["lng"] + "%2C%20" + e.lngLat["lat"]}`],
                        destination: [e.lngLat["lng"], e.lngLat["lat"]],
                    })
                    let marker = [e.lngLat["lng"], e.lngLat["lat"]]
                    this.state.markers.push(marker)

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
                const coordinates = start

                let wps = ""
                for (let i = 0; i < waypoints.length; i++) {
                    wps = wps.concat(waypoints[i])
                    if (waypoints[i] === undefined) {
                        continue
                    } else if (i < (waypoints.length - 1)) {
                        wps = wps.concat("%3B")
                    }
                }
                return (`https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates[0]}%2C%20${coordinates[1]}%3B${wps}.json?access_token=pk.eyJ1IjoiamJvbmFhIiwiYSI6ImNrMzZnaWdsdjAxaGozbm1wM254bnR5cGoifQ.zUuEvUSaf5GdH1zFqimOVw`)
            }
            let destination = this.state.destination
            let start = this.props.content.start
            let waypoints = this.state.waypoints
            this.state.markers.forEach((el) => {

                this.state.map.loadImage("https://i.imgur.com/MK4NUzI.png", (error, image) => {
                    if (error) throw error;

                    if (!this.state.map.hasImage("custom" + `${(this.state.markers.indexOf(el))}`, image)) {
                        this.state.map.addImage("custom" + `${(this.state.markers.indexOf(el))}`, image);

                    }

                    if (this.state.map.getSource("marker" + `${(this.state.markers.indexOf(el))}`)) {
                        this.state.map.removeSource("marker" + `${(this.state.markers.indexOf(el))}`)
                    }

                    if (this.state.map.getSource("markers" + `${(this.state.markers.indexOf(el))}`)) {
                        this.state.map.removeSource("markers" + `${(this.state.markers.indexOf(el))}`)
                    }

                    this.state.map.addLayer({
                        id: "markers" + `${(this.state.markers.indexOf(el))}`,
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
                            this.state.map.removeSource(`marker${i}`)
                            this.state.map.removeLayer(`marker${i}`)
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

    handleButtonDelete(e) {
        e.preventDefault();

        let idx = Number(e.currentTarget.value) + 1

        if (this.state.map.getSource("routestart")) {
            this.state.map.removeLayer("routestart")
            this.state.map.removeSource("routestart")
        }

        let marker = []
        for (let j = 0; j < this.state.markers.length; j++) {
            if (j !== idx - 1) {
                marker.push(this.state.markers[j])
            }

            if (this.state.map.getSource("markers" + `${j}`)) {
                this.state.map.removeLayer("markers" + `${j}`)
                this.state.map.removeSource("markers" + `${j}`)
            }
        }
        this.state.map.removeLayer("markers" + `${idx}`)


        let returned = []
        for (let i = 0; i < this.state.waypoints.length; i++) {
            if (i !== idx - 1) {
                returned.push(this.state.waypoints[i])
            }
            if (this.state.map.getLayer("route" + `${i}`)) {
                this.state.map.removeLayer("route" + `${i}`)
            }
        }

        if (this.state.map.getLayer("route" + `${idx}`)) {
            this.state.map.removeLayer("route" + `${idx}`)
        }


        if (this.state.map.getLayer("route" + `${this.state.waypoints.length + 1}`)) {
            this.state.map.removeLayer("route" + `${this.state.waypoints.length + 1}`)
        }

        this.setState({
            waypoints: returned,
            markers: marker
        })

    }

    handleSubmit() {
        let destination = this.state.waypoints.pop()

        this.setState({
            destination: destination
        })

        let returnedMarks = []

        this.state.markers.map((el) => {
            returnedMarks.push(el.join("%2C%20"))
        })


        let ride = {
            title: this.props.content.title,
            description: this.props.content.description,
            author_id: this.props.content.author_id,
            author_rating: this.props.content.author_rating,
            _id: this.props.content._id,
            author_name: this.props.content.author_name,
            duration: this.props.content.duration,
            start_address: this.props.content.start_address,
            start_city: this.props.content.start_city,
            distance: parseFloat((this.state.distance / 1609.3).toFixed(1)),
            polyline: this.state.polyline,
            start: this.props.content.start,
            destination: destination,
            waypoints: this.state.waypoints,
            markers: this.state.markers
        }


        this.props.closeModal()
        updateRide(ride)
            .then(() => fetchRides())
            .then(window.location.reload(true))
    }


    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.waypoints.length !== this.state.waypoints.length) {
            return true
        } else {
            return false
        }
    }

    render() {
        
        let display;
        if (this.state.waypoints.length > 0) {
            display = (
                    <ul>
                        {this.state.waypoints.map((wp) => (

                            <li className="ride-create-map-li">
                                <p>Waypoint: {this.state.waypoints.indexOf(wp) + 1}</p>
                                <button value={`${this.state.waypoints.indexOf(wp)}`} onClick={this.handleButtonDelete}>Remove</button>
                            </li>

                        ))}
                    </ul>
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
                Update Ride!
              </button>

            </div>
          </div>
        );
    }


}

export default RideEdit
