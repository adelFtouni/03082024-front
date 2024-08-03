import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FaBell, FaLocationCrosshairs, FaPlus } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';
import { BsBell } from 'react-icons/bs';
import Notify from './Notify';
import "./home.scss";
import HomePage from './HomePage';

function Home() {
  const [latitude, setLatitude] = useState(0); // Default latitude (e.g., NYC)
  const [longitude, setLongitude] = useState(0);
  const [address, setAddress] = useState('');
  const loc = useLocation();
  const getAddress = async (lang, lat) => {

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lang}&lon=${lat}`
    );
    const data = await response.json();
    if (data && data.display_name) {
      setAddress(data.display_name);
      localStorage.setItem('address',data.display_name)
      if(popupVisible)
      setPopupVisible(false);
    } else {
      setAddress('Address not found');
    }
  };
  const [popupVisible, setPopupVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const handleButtonClick = () => {
    setPopupVisible(true);
  };

  const handlePopupClick = (e) => {
    if (e.target === e.currentTarget) {
      setPopupVisible(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
          //reverseGeocode(latitude, longitude);
          getAddress(latitude, longitude);
          setLatitude(null);
          setLongitude(null);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };
  const reverseGeocode = async (latitude, longitude) => {
    const apiKey = 'AIzaSyDQmSpcxl9rJE6pyr84nG6nK2X5_eIOek0'; // Replace with your Google Maps API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'OK') {
        const addressComponents = data.results[0].address_components;
        const city = addressComponents.find((comp) =>
          comp.types.includes('locality')
        )?.long_name;
        const country = addressComponents.find((comp) =>
          comp.types.includes('country')
        )?.long_name;
        console.log('City:', city);
        console.log('Country:', country);
        setLocation({ city, country });
        getAddress();
      } else {
        console.error('Geocode was not successful for the following reason:', data.status);
      }
    } catch (error) {
      console.error('Error fetching reverse geocode data:', error);
    }
  };

  // console.log(loc.pathname)

  return (
    <div>
  
      <div className="header justify-content-between">
        <div className="location" onClick={handleButtonClick}>
          <IoLocationOutline />
          <span>{address}</span>
        </div>
        <div className="notification">
          <BsBell />
        </div>
      </div>
      <div className="flex-1">
      {!address && (
        <Notify/>
      )}
      {address && (
        <HomePage/>
      )}
        <div>

        </div>
      </div>
      <div>
        {popupVisible && (
          <div className="popup-overlay" onClick={handlePopupClick}>
            <div className="popup-content">
              <div className="popup-header">
                <h1>Where should we deliver to?</h1>
              </div>
              <div className="popup-body">
                <button className='d-flex align-items-center gap-3 mb-3 btn-transparent' onClick={getCurrentLocation}>
                  <FaLocationCrosshairs className='text-primary' />
                  <span>Deliver to my current location</span>
                </button>
                <button className='d-flex align-items-center gap-3 btn-transparent'>
                  <FaPlus className='text-primary' />
                  <span>Deliver somewhere else...</span>
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default Home;



