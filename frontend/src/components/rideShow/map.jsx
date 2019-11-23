import axios from "axios";
import React from "react";
var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
var polyline = require("@mapbox/polyline");

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.start[1],
      lng: this.props.start[0],
      zoom: 12,
      start: this.props.start,
      destination: this.props.destination.split("%2C%20").map( el => Number(el) ),
      polyboy: this.props.poly
    };
    
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    
    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    map.on('style.load', () => {

       map.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: this.state.polyboy
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
        })

        let coords = this.state.polyboy.coordinates;
        let bounds = coords.reduce( (bounds, coord) => {
            return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(coords[0], coords[0]))
        map.fitBounds(bounds, {
          padding: 40
        });

      
        map.loadImage("https://i.imgur.com/MK4NUzI.png", (error, image) => {
                if (error) throw error;
                map.addImage("custom-marker", image)
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
                                        coordinates: this.state.start
                                    }
                                }
                            ]
                        }
                    },
                    layout: {
                        "icon-image": "custom-marker",
                    }
                })
                map.addImage("custom-marker2", image)

                map.addLayer({
                    id: "destination",
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
                                        coordinates: this.state.destination
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
}
    
      

    


  render() {
    
    mapboxgl.accessToken =
      "pk.eyJ1IjoicHJvc2UwMDIxIiwiYSI6ImNrMzZoYWdidTAxcm8zaW82MW5jZmV6c2EifQ.PRbSpg500wqcoctnYFTIog";
    // if (!this.state.polyboy) return null;
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

