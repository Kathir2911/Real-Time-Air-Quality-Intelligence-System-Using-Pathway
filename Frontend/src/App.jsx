import {useEffect, useState} from 'react'
import AQIGraph from './components/AQIGraph.jsx'
import MapView from "./components/MapView.jsx";

const App = () => {
    const [timeLabels, setTimeLabels] = useState([]);
    const [aqiData, setAqiData] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [currentAqi, setCurrentAqi] = useState(null);
    const [liveMode, setLiveMode] = useState(true);
    useEffect(() => {
        if (!liveMode) return;
        const fetchData = () => {
            fetch("http://127.0.0.1:8000/aqi/history")
            .then(res => res.json())
            .then(data => {
                setTimeLabels(
                  data.map(r => {
                    const date = new Date(Number(r.time));
                    return date.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                    });
                  })
                );
                setAqiData(data.map(r => Number(r.aqi)));
            });
        };
        fetchData();
        const interval = setInterval(fetchData, 60000); 
        return () => clearInterval(interval);
    }, [liveMode]);

    const handleLocationChange = async ({ lat, lng }) => {
        setLiveMode(false);
        setTimeLabels([]);
        setAqiData([]);
        setSelectedLocation({ lat, lng });
            await fetch("http://127.0.0.1:8000/location", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({lat,lon: lng,city: null})
            });
        const currentRes = await fetch(`http://127.0.0.1:8000/aqi/by-location?lat=${lat}&lon=${lng}`);
        const currentData = await currentRes.json();
        setCurrentAqi(currentData.aqi);
        const historyRes = await fetch(`http://127.0.0.1:8000/aqi/history/by-location?lat=${lat}&lon=${lng}`);
        const history = await historyRes.json();
        setTimeLabels(
            history.map(r =>
              new Date(r.time).toLocaleTimeString([], {hour: "2-digit",minute: "2-digit"}))
        );
        setAqiData(history.map(r => Number(r.aqi)));
    };


    return (
    <>
      <h2>🌍 Select Location</h2>
      <MapView onLocationChange={handleLocationChange} />

      {selectedLocation && (
        <p>
          📍 Selected: {selectedLocation.lat.toFixed(4)},{" "}
          {selectedLocation.lng.toFixed(4)}
        </p>
      )}

      {currentAqi !== null && (
        <h3>🌫️ Current AQI: {currentAqi}</h3>
      )}

      <hr />

      <h2>📈 AQI Trend</h2>
      <AQIGraph timeLabels={timeLabels} aqiData={aqiData} />
    </>
  );
};


export default App;

