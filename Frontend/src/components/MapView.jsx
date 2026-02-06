import {MapContainer, TileLayer, Marker, useMapEvents} from 'react-leaflet'
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';

function LocationMarker({ onSelect }) {
    const [position, setPosition] = useState(null);
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            onSelect(e.latlng); 
            console.log("Map clicked:", e.latlng);
        }
    });
    return position ? <Marker position={position} /> : null;
}   

const MapView = ({ onLocationChange }) => {
    return (
        <MapContainer center={[13.0827, 80.2707]} zoom={11} style={{ height: "300px" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker onSelect={onLocationChange} />
        </MapContainer>
    );
}
export default MapView;