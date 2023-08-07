import { useContext, useEffect } from 'react';
import MapContext from './map/MapContext';
import OLTileLayer from 'ol/layer/Tile';

function TileLayer({ source, zIndex=0 }) {
    const { map } = useContext(MapContext);
    // initialize the lazyer and call addLayer on the map oobject to add layer to map
    useEffect(() => {
        if (!map) return;

        let tileLayer = new OLTileLayer({
            source,
            zIndex
        });
        map.addLayer(tileLayer);
        tileLayer.setZIndex(zIndex);
        return () => {
            if (map) {
                map.removeLayer(tileLayer);
            }
        };
    },[map]);

    return null;
};

export default TileLayer;