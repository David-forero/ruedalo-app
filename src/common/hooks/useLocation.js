import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permiso de ubicación denegado');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);

        const place = await Location.reverseGeocodeAsync({ latitude: location.coords.latitude, longitude: location.coords.longitude });
        setPlace(place);
      } catch (error) {
        setError('Error al obtener la ubicación');
      }
    };

    getLocation();
  }, []);

  return { location, error, place };
};

export default useLocation;