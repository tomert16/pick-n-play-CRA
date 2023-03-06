import { useContext, useEffect } from 'react';
import MapContext from './MapContext';
import OLVectorLayer from 'ol/layer/Vector';

function VectorLayer({ source, style, zIndex=0 }) {
    const { map } = useContext(MapContext);
    // initialize the lazyer and call addLayer on the map oobject to add layer to map
    useEffect(() => {
        if (!map) return;
        let vectorLayer = new OLVectorLayer({
            source,
            style
        });
        map.addLayer(vectorLayer);
        return () => {
            if (map) {
                map.removeLayer(vectorLayer);
            }
        };
    }, [map])
  return null;
}

export default VectorLayer;