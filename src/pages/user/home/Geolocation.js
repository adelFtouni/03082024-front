import React, { useState } from 'react';

const GeoLocation = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState('');

  const getAddress = async () => {
    if (!latitude || !longitude) {
      setAddress('Please provide both latitude and longitude.');
      return;
    }

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.display_name) {
        setAddress(data.display_name);
      } else {
        setAddress('Address not found.');
      }
    } catch (error) {
      setAddress('Error fetching the address.');
    }
  };

  return (
    <div>
      <h2>Convert Coordinates to Address</h2>
      <div>
        <label>
          Latitude:
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Longitude:
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </label>
      </div>
      <button onClick={getAddress}>Get Address</button>
      <div>
        <h3>Address:</h3>
        <p>{address}</p>
      </div>
    </div>
  );
};

export default GeoLocation;
