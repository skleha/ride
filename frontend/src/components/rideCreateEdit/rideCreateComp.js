import React from 'react';
import axios from 'axios';

const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")
const polyline = require('@mapbox/polyline')

class NewMap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            zoom: 12,
            start: [],
            destination: [],
            // center: [this.props.content.user.location ? this.props.content.user.location : "San Francisco"],
            waypoints: [],
            destination: [],
            polyline: "",
            test: "",
            map: {},
            markers: [],
            start_marker: [],
            address: "2503 15th Street, San Francisco, CA",
            location: "San Francisco"


        }

        // this.handleMarker = this.handleMarker.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)

    }




    componentDidMount() {

        let location = this.state.location


        // axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoicHJvc2UwMDIxIiwiYSI6ImNrMzZoYWdidTAxcm8zaW82MW5jZmV6c2EifQ.PRbSpg500wqcoctnYFTIog&cachebuster=1574441136340&autocomplete=true&types=place&limit=1`)
        //     .then(res => {
        //         mapboxgl.accessToken = "pk.eyJ1IjoicHJvc2UwMDIxIiwiYSI6ImNrMzZoYWdidTAxcm8zaW82MW5jZmV6c2EifQ.PRbSpg500wqcoctnYFTIog"
        //         const map = new mapboxgl.Map({
        //             container: this.mapContainer,
        //             style: 'mapbox://styles/mapbox/streets-v11',
        //             center: [res.data.features[0].center[0], res.data.features[0].center[1]],
        //             zoom: this.state.zoom,
        //             waypoints: this.state.waypoints,

        //         })


        //     })

            axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoicHJvc2UwMDIxIiwiYSI6ImNrMzZoYWdidTAxcm8zaW82MW5jZmV6c2EifQ.PRbSpg500wqcoctnYFTIog&cachebuster=1574441136340&autocomplete=true&types=place&limit=1`)
                .then(res => {
                debugger
                this.setState({
                    start: res.data.features[0].center[0],
                    destination: res.data.features[0].center[1]
                    })
                })
                .then(() => {
                    mapboxgl.accessToken = "pk.eyJ1IjoicHJvc2UwMDIxIiwiYSI6ImNrMzZoYWdidTAxcm8zaW82MW5jZmV6c2EifQ.PRbSpg500wqcoctnYFTIog"
                    const map = new mapboxgl.Map({
                    container: this.mapContainer,
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [this.state.start, this.state.destination],
                    zoom: this.state.zoom
                    // waypoints: this.state.waypoints
    
                    })}
                )
    
                    // this.setState({
                    //     start_marker: [`${res.data.features[0].center[0]}, ${res.data.features[0].center[1]}`]
                    // )}

                    // let start = this.state.start
                    // let destination = this.state.waypoints.pop()
                    // let waypoints = this.state.waypoints

                    // map.on("load", () => {
                    //     map.loadImage("https://i.imgur.com/MK4NUzI.png", (error, image) => {
                    //         if (error) throw error;
                    //         map.addImage("custom-marker", image);
                    //         map.addLayer({
                    //             id: "start",
                    //             type: "symbol",

                    //             source: {
                    //                 type: "geojson",
                    //                 data: {
                    //                     type: 'FeatureCollection',
                    //                     features: [
                    //                         {
                    //                             type: 'Feature',
                    //                             properties: {},
                    //                             geometry: {
                    //                                 type: "Point",
                    //                                 coordinates: [this.state.start_marker[0], this.state.start_marker[1]]
                    //                             }
                    //                         }
                    //                     ]
                    //                 }
                    //             },
                    //             layout: {
                    //                 "icon-image": "custom-marker",
                    //             }

                    //         })
                    //     })
                    // })






                //     map.on('click', (e) => {
                //         e.preventDefault();
                //         debugger


                //         let marker = [e.lngLat["lng"], e.lngLat["lat"]]
                //         this.state.markers.push(marker)

                //         map.loadImage("https://i.imgur.com/MK4NUzI.png", (error, image) => {
                //             if (error) throw error;

                //             if (!map.hasImage("custom" + `${this.state.waypoints.length}`, image)) {
                //                 map.addImage("custom" + `${this.state.waypoints.length}`, image);

                //             }

                //             if (map.getSource("markers" + `${this.state.waypoints.length}`)) {
                //                 map.removeSource("markers" + `${this.state.waypoints.length}`)
                //             }

                //             map.addLayer({
                //                 id: "markers" + `${this.state.waypoints.length}`,
                //                 type: "symbol",
                //                 source: {
                //                     type: "geojson",
                //                     data: {
                //                         type: 'FeatureCollection',
                //                         features: [
                //                             {
                //                                 type: 'Feature',
                //                                 properties: {},
                //                                 geometry: {
                //                                     type: "Point",
                //                                     coordinates: [marker[0], marker[1]]
                //                                 }
                //                             }
                //                         ]
                //                     }
                //                 },
                //                 layout: {
                //                     "icon-image": "custom-marker",
                //                 }

                //             })
                //         })


                //         this.setState({
                //             waypoints: [...this.state.waypoints, `${e.lngLat["lng"] + "%2C%20" + e.lngLat["lat"]}`],
                //         })
                //         waypoints = this.state.waypoints;



                //         function assembleClickQueryURL(start, waypoints, destination) {
                //             const coordinates = [start, destination]
                //             debugger
                //             let wps = ""
                //             for (let i = 0; i < waypoints.length; i++) {
                //                 wps = wps.concat(waypoints[i])
                //                 console.log(wps)
                //                 if (waypoints[i] === undefined) {
                //                     continue
                //                 } else if (i < (waypoints.length - 1)) {
                //                     wps = wps.concat("%3B")
                //                 }
                //             }

                //             return (`https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates[0][0]}%2C%20${coordinates[0][1]}%3B${wps}.json?access_token=pk.eyJ1IjoiamJvbmFhIiwiYSI6ImNrMzZnaWdsdjAxaGozbm1wM254bnR5cGoifQ.zUuEvUSaf5GdH1zFqimOVw`)

                //         })





                //         axios.get(assembleClickQueryURL(start, waypoints, destination))
                //             .then((response) => {
                //                 console.log(response)
                //                 let polyline2 = polyline.toGeoJSON(`${response.data.routes[0].geometry}`)
                //                 this.setState({
                //                     polyline: `${polyline.encode()}`
                //                 })
                //                 map.poly = polyline2


                //                 if (map.getSource("route" + `${this.state.waypoints.length}`)) {
                //                     map.removeSource("route" + `${this.state.waypoints.length}`)
                //                 }
                //                 map.addLayer({
                //                     id: "route" + `${this.state.waypoints.length}`,
                //                     type: "line",
                //                     source: {
                //                         type: "geojson",
                //                         data: {
                //                             type: "Feature",
                //                             properties: {},
                //                             geometry: polyline2
                //                         }
                //                     },
                //                     layout: {
                //                         "line-join": "round",
                //                         "line-cap": "round"
                //                     },
                //                     paint: {
                //                         "line-color": "#888",
                //                         "line-width": 2
                //                     }

                //                 })
                //             })
                //         )
                        
                //     })
                // })
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
    //     debugger
    //     if (nextState.map.length === this.state.map.length) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }


    render() {
        debugger

        let display;
        if (this.state.waypoints.length > 0) {
            display = (
                <div>
                    <ul>
                        {this.state.waypoints.map((wp) => (

                            <li>
                                <p>Waypoint: {this.state.waypoints.indexOf(wp) + 1}</p>
                                {/* <button onClick={this.handleMarker}>Delete</button> */}
                            </li>

                        ))}
                    </ul>
                    <button onClick={this.handleMarker}>Delete</button>
                </div>
            )
        } else {
            display = null
        }



        return (
            <div>
                <div className="ride-create-edit-map" id="map" ref={el => this.mapContainer = el} style={{ height: "400px" }}></div>
                <div>
                    {display}
                </div>
                <button onClick={this.handleSubmit}>Create Ride!</button>
            </div>

        );
    }
}

export default NewMap;

