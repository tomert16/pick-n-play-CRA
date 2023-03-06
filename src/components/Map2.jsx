import Map from "./Map";
import Layers from './Layers';
import VectorLayer from "./VectorLayer";
import TileLayer from "./TileLayer";
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import osm from "../source/osm";
import vector from "../source/vector";
import { fromLonLat, get } from 'ol/proj'; 
import Controls from './Controls';
import FullScreenControl from "./FullScreenControl";
import { zoomByDelta } from "ol/interaction/Interaction";
import GeoJSON from "ol/format/GeoJSON";
import mapConfig from "../config.json";
let styles = { 
  'MultiPolygon': new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  }),
};

const geojsonObject = mapConfig.geojsonObject;
const geojsonObject2 = mapConfig.geojsonObject2;
const geojsonObject3 = mapConfig.geojsonObject3;
const geojsonObject4 = mapConfig.geojsonObject4;
// var geojsonObject = {
//   // if the next line is commented out you get: Unsupported GeoJSON type: undefined
//   type: "FeatureCollection",
//   features: [
//     {
//       // if the next line is commented out you get: Unsupported GeoJSON type: undefined
//       type: "Feature",
//       geometry: {
//         type: "Point",
//         coordinates: [-73.9613, 40.7223]
//       },
//       properties: {
//         Site: "ARMAGH"
//       }
//     }
//   ]
// };


function Map2({ center, setCenter, zoom, setZoom, showLayer1, setShowLayer1, showLayer2, setShowLayer2, showLayer3, showLayer4}) {
  return (
    <div>
        <Map center={fromLonLat(center)} zoom={zoom}>
            <Layers>
                <TileLayer 
                    source={osm()}
                    zIndex={0}
                />
                {showLayer1 && (
                    <VectorLayer 
                        source={vector({ features: new GeoJSON().readFeatures(geojsonObject, {featureProjection: "EPSG:3857"})})}
                        style={styles.Point}
                    />
                )}
                {showLayer2 && (
                    <VectorLayer 
                        source={vector({ features: new GeoJSON().readFeatures(geojsonObject2,{featureProjection: "EPSG:3857"})})}
                        style={styles.Point}
                    />
                )}
                {showLayer4 && (
                    <VectorLayer 
                        source={vector({ features: new GeoJSON().readFeatures(geojsonObject3,{featureProjection: "EPSG:3857"})})}
                        style={styles.Point}
                    />
                )}
                {showLayer4 && (
                    <VectorLayer 
                        source={vector({ features: new GeoJSON().readFeatures(geojsonObject4,{featureProjection: "EPSG:3857"})})}
                        style={styles.Point}
                    />
                )}
            </Layers>
            <Controls>
                <FullScreenControl />
            </Controls>
        </Map>
    </div>
  )
}

export default Map2;