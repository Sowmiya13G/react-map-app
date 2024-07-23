// import { useEffect } from 'react';
// import { useMap } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet.markercluster';

// const MarkerClusterGroup = ({ children }) => {
//   const map = useMap();

//   useEffect(() => {
//     const markerClusterGroup = L.markerClusterGroup();
//     map.addLayer(markerClusterGroup);

//     const markers = L.layerGroup();
//     markerClusterGroup.addLayer(markers);

//     return () => {
//       map.removeLayer(markerClusterGroup);
//     };
//   }, [map]);

//   return children;
// };

// export default MarkerClusterGroup;
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.markercluster';

const MarkerClusterGroup = ({ children }) => {
  const map = useMap();
  
  useEffect(() => {
    const markerClusterGroup = L.markerClusterGroup();
    map.addLayer(markerClusterGroup);

    React.Children.forEach(children, (child) => {
      if (child) {
        const { position, icon, eventHandlers, children: tooltip } = child.props;
        const marker = L.marker(position, { icon });

        if (tooltip) {
          const leafletTooltip = L.tooltip({
            direction: tooltip.props.direction,
            offset: tooltip.props.offset,
            opacity: tooltip.props.opacity,
            permanent: tooltip.props.permanent,
          }).setContent(tooltip.props.children);
          marker.bindTooltip(leafletTooltip);
        }

        if (eventHandlers) {
          Object.keys(eventHandlers).forEach((event) => {
            marker.on(event, eventHandlers[event]);
          });
        }

        markerClusterGroup.addLayer(marker);
      }
    });

    return () => {
      map.removeLayer(markerClusterGroup);
    };
  }, [map, children]);

  return null;
};

export default MarkerClusterGroup;
