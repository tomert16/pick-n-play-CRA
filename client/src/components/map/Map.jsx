import { useRef, useState, useEffect } from "react";
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";

function Map({children, zoom, center}) {
    const mapRef = useRef();
    const [map, setMap] = useState(null);
    // on component mount
    /// initialize the map object and stores in as the current state
    //// once component is unmounted the function sets the target of the map to undefined and disposes ofo the map
    useEffect(() => {
        let options = {
            view: new ol.View({
                center,
                zoom
            }),
            layers: [],
            controls: [],
            overlays: []
        };
        let mapObject = new ol.Map(options);
        mapObject.setTarget(mapRef.current);
        setMap(mapObject);
        return () => mapObject.setTarget(undefined);

    },[])
    // zoom change handler
    useEffect(() => {
        if (!map) return;
        map.getView().setZoom(zoom);
    },[zoom]);
    // center change handler
    useEffect(() => {
        if (!map) return;
        map.getView().setCenter(center)
    },[center]);

  return (
    <MapContext.Provider value={{ map }}>
        <div ref={mapRef} className="ol-map">
            {children}
        </div>
    </MapContext.Provider>
  )
}

export default Map;