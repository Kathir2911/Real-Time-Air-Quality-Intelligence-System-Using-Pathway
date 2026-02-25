import { Line } from "react-chartjs-2";

function AQIGraph({ timeLabels, aqiData, locationName }){
    // Use a unique key based on data length or content to force recreation if needed, 
    // though chartjs-react usually handles this, the "already in use" error suggests otherwise.
    return (
        <Line
            key={`chart-${aqiData.length}-${locationName}`}
            data={{
                labels: timeLabels,
                datasets: [
                    {
                        label: `AQI Level ${locationName ? `- ${locationName}` : ''}`,
                        data: aqiData,
                        borderColor: "#22d3ee", // cyan-400
                        borderWidth: 3,
                        pointBackgroundColor: "#22d3ee",
                        pointBorderColor: "#0f172a",
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        hoverRadius: 6,
                        tension: 0.4,
                        fill: true,
                        backgroundColor: (context) => {
                            const chart = context.chart;
                            const {ctx, chartArea} = chart;
                            if (!chartArea) return null;
                            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                            gradient.addColorStop(0, "rgba(34, 211, 238, 0.2)");
                            gradient.addColorStop(1, "rgba(34, 211, 238, 0)");
                            return gradient;
                        },
                    } 
                ]
            }}    
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        padding: 12,
                        titleColor: '#94a3b8',
                        bodyColor: '#fff',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1,
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: '#64748b', font: { size: 10 } }
                    },
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#64748b', font: { size: 10 } }
                    }
                }   
            }}  
        />           
   );
}

export default AQIGraph;