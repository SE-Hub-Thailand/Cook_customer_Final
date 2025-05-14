import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';  // Import Leaflet CSS
import { useEffect, useState } from 'react';
import { getAllOilMachines } from '../api/strapi/oilMachineApi';
import * as L from "leaflet";
import LoadingSpinner from '../components/LoadingSpinner';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 13.7563,
  lng: 100.5018
};

const markerIcon = new L.Icon({
  iconUrl:
	"https://cdn.pixabay.com/photo/2014/04/03/10/03/google-309740_1280.png",
  iconSize: [35, 35],
});

const OilMachineLocations = () => {
  const [oilMachines, setOilMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const token = import.meta.env.VITE_TOKEN_TEST ;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOilMachines = async () => {
      try {
        setLoading(true);
        const oilMachinesData = await getAllOilMachines(token);
        setOilMachines(oilMachinesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Oil Machines:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchOilMachines();
  }, [token]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <MapContainer style={containerStyle} center={center} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"  // Free OpenStreetMap tile
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {oilMachines.map((location) => (
          <>
            <Marker key={location.id} position={[location.latitude, location.longitude]} icon={markerIcon}>
              <Popup>
                {location.location}
                <br />
                <a
                  href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  เปิดใน Google Maps
                </a>
              </Popup>
            </Marker>
          </>
        ))}
      </MapContainer>
    </>
    );
};

export default OilMachineLocations;
