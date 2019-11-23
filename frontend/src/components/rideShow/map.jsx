import axios from "axios";
import React from "react";
var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
var polyline = require("@mapbox/polyline");

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 37.7749, //this.props.start[1],
      lng: -122.4194, //this.props.start[0],
      zoom: 12,
      start: [-122.447427, 37.754011], //this.props.start,
      destination: [-122.401271, 37.798933] //this.props.destination,
      //   polyDisplay: polyline.toGeoJSON(this.props.poly)
    };
  }

  componentDidMount() {
 
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

      const markers = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: this.state.start
          },
          properties: {}
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: this.state.destination
          },
          properties: {}
        }
      ]
    };

    markers.features.forEach( marker => {
        let el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map)
    })

    
    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
    axios
      .get(
        "https://api.mapbox.com/directions/v5/mapbox/driving/-122.447427%2C37.754011%3B-122.401271%2C37.798933.json?access_token=pk.eyJ1IjoicHJvc2UwMDIxIiwiYSI6ImNrMzZoYWdidTAxcm8zaW82MW5jZmV6c2EifQ.PRbSpg500wqcoctnYFTIog"
      )
      .then(res => {
        map.on("style.load", () => {
          let poly = polyline.toGeoJSON(`${res.data.routes[0].geometry}`);
          map.addLayer({
            id: "route",
            type: "line",
            source: {
              type: "geojson",
              data: {
                type: "Feature",
                properties: {},
                geometry: poly
              }
            },
            layout: {
              "line-join": "round",
              "line-cap": "round"
            },
            paint: {
              "line-color": "#888",
              "line-width": 6
            }
          });
        });
      })
    
      
    //   .then(
    //     markers.features.forEach(marker => {
    //       let el = document.createElement("div");
    //       el.className = "marker";

    //       new mapboxgl.Marker(el)
    //         .setLngLat(marker.geometry.coordinates)
    //         .addTo(map);
    //     })
    //   );
    }

  render() {
    
    mapboxgl.accessToken =
      "pk.eyJ1IjoicHJvc2UwMDIxIiwiYSI6ImNrMzZoYWdidTAxcm8zaW82MW5jZmV6c2EifQ.PRbSpg500wqcoctnYFTIog";

    return (
      <div>
        <div
          className="ride-show-map"
          ref={el => (this.mapContainer = el)}
        ></div>
      </div>
    );
  }
}

export default Map;

