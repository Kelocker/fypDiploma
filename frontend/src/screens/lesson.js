import axios from 'axios';
import { useEffect, useState } from 'react';

function MapComponent() {
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        axios.get('/api/lessons/')
            .then(response => {
                setLessons(response.data);
            })
            .catch(error => console.error('Error fetching lessons', error));
    }, []);

    // Map rendering logic goes here
}

import { MapContainer, TileLayer, Marker } from 'react-leaflet';

function RenderMap({ lessons }) {
    return (
        <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {lessons.map(lesson => (
                <Marker key={lesson.id} position={[lesson.latitude, lesson.longitude]}>
                    {/* You can add Popup or Tooltip here */}
                </Marker>
            ))}
        </MapContainer>
    );
}
