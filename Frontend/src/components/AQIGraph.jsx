import { Line } from "react-chartjs-2";

function AQIGraph({ timeLabels, aqiData }){
    return (
        <Line
            data={{
                labels: timeLabels,
                datasets: [
                    {
                        label: "AQI Over Time",
                        data: aqiData,
                        borderColor: "red",
                        tension: 0.3,
                        fill: false
                    } 
                ]
            }}    
            options={{
                responsive: true,
                animation: {
                    duration: 500,        
                    easing: "easeOutQuart"
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }   
            }}  
        />           
   );
}

export default AQIGraph;