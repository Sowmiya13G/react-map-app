import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.markercluster';
import './styles.css';

const MarkerClusterGroup = ({ children }) => {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());

  useEffect(() => {
    const handleZoomEnd = () => {
      setZoom(map.getZoom());
    };

    map.on('zoomend', handleZoomEnd);

    const iconCreateFunction = (cluster) => {
      const count = cluster.getChildCount();
      let color = '#3c99dc';

      if (count < 10) {
        color = '#3c99dc';
      } else if (count < 50) {
        color = '#0f5298';
      } else {
        color = '#2565ae';
      }

      // Adjust size based on zoom level
      const size = Math.max(30, 40 - (18 - zoom));

      return L.divIcon({
        html: `<div class="custom-cluster" style="background-color: ${color}; width: ${size}px; height: ${size}px;"><span>${count}</span></div>`,
        className: 'custom-cluster-icon',
        iconSize: L.point(size, size, true),
      });
    };

    const markerClusterGroup = L.markerClusterGroup({
      iconCreateFunction,
    });

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
      map.off('zoomend', handleZoomEnd);
    };
  }, [map, children, zoom]);

  return null;
};

export default MarkerClusterGroup;
