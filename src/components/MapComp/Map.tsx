import { RefObject, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapComp({
  ref,
  onReady,
}: {
  ref: RefObject<mapboxgl.Map | null>;
  onReady?: (map: mapboxgl.Map) => void;
}) {
  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/standard",
      center: [106.599296, 11.012365],
      zoom: 12,
    });
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    map.on("load", (e) => {
      onReady?.(e.target);
    });

    ref.current = map;

    return () => map.remove();
  }, []);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
}
