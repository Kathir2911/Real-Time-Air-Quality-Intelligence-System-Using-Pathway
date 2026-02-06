# Real-Time Air Quality Intelligence System Using Pathway

## 📌 Problem Statement

Air pollution is a major environmental and public health concern. Most air quality monitoring systems provide static or delayed insights, which limits timely decision-making. There is a need for a system that can continuously monitor air quality data, detect unsafe conditions in real time, and provide immediate health guidance.

---

## 💡 Solution Overview

This project implements a **real-time air quality intelligence system** using the **Pathway framework**. The system continuously ingests live (simulated) AQI data, categorizes pollution levels, triggers alerts when unsafe thresholds are crossed, and generates health explanations — all without restarting the system.

---

## ⚙️ Key Features

- 📡 **Real-time data ingestion** using Pathway streaming CSV
- 🌫️ **Automatic AQI categorization** (Good, Moderate, Poor, Very Poor)
- 🚨 **Live pollution alerts** when AQI exceeds safe limits
- 🔄 **Continuous updates** without manual re-execution

---

## 🧠 How Pathway is Used

Pathway acts as the **real-time processing and reasoning layer**:

- Monitors continuously updating AQI data
- Performs dynamic stream processing
- Automatically updates outputs on new data arrival

---

## 🏗️ Architecture

```
┌────────────────────────────┐
│   Open AQI Data Sources    │
│   (Open-Meteo API)         │
└──────────────┬─────────────┘
               │
               ▼
┌────────────────────────────┐
│   AQI Fetcher Service      │
│   (fetch_aqi.py)           │
│   - Location detection     │
│   - Periodic AQI fetch     │
│   - CSV stream writer      │
└──────────────┬─────────────┘
               │
               ▼
┌────────────────────────────┐
│   Pathway Streaming Engine │
│   (aqi_live.py)            │
│   - Streaming ingestion    │
│   - AQI classification     │
│   - Alert detection        │
│   - Health advice logic    │
└──────────────┬─────────────┘
               │
               ▼
┌────────────────────────────┐
│   Processed Output Files   │
│   - output_aqi_live.csv    │
│   - alerts.csv             │
└──────────────┬─────────────┘
               │
               ▼
┌────────────────────────────┐
│   FastAPI Backend          │
│   (api.py)                 │
│   - AQI & alert APIs       │
│   - Location endpoints     │
└──────────────┬─────────────┘
               │
               ▼
┌────────────────────────────┐
│   React Frontend           │
│   - AQI trend graphs       │
│   - Interactive map        │
│   - Live AQI display       │
└────────────────────────────┘

```

---

## 📊 Sample Output

```csv
city,aqi,category,alert,health_advice
Chennai,170,Poor,YES 🚨,Unhealthy for sensitive groups. Reduce outdoor activity.
```

---

## ⏱️ Note on `time` and `diff` Columns

Pathway automatically adds `time` and `diff` fields to support **incremental real-time stream processing**.

- `diff = 1` → record insertion
- `diff = -1` → state update/removal

These fields are **system metadata** and not part of the air quality data model.

---

## 🧪 How to Run

### Installation

```bash
pip install pathway
```

### Execute the System

```bash
python aqi_live.py
python fetch_aqi.py
python aqi.py
python notify.py
```

### Simulate Live Updates

Append new rows to `aqi_data.csv` to see live updates in real-time.

**Example:**
```bash
echo "Mumbai,185,2026-02-04 15:30:00" >> aqi_data.csv
```

The system will automatically detect the change and update the output.

---

## 📂 Project Structure

```
.
├── Backend/
│   ├── aqi_live.py           # Main Pathway application
│   ├── fetch_aqi.py          # Open-Meteo API integration
│   ├── notify.py             # Alert notification system
│   ├── location.json         # Location configuration
│   ├── aqi_data.csv          # Cached AQI data
│   ├── alerts.csv            # Generated alerts
│   └── output_aqi_live.csv   # Real-time output
├── Frontend/
│   ├── src/                  # React application source
│   ├── public/               # Static assets
│   ├── index.html            # Entry point
│   ├── package.json          # Dependencies
│   └── vite.config.js        # Build configuration
└── readme.md                 # Project documentation
```

---

## 🌍 Track Climate & Environment

This system can be extended to:

- Monitor multiple environmental parameters (PM2.5, PM10, CO2, NO2)
- Integrate with IoT sensors for real-world data
- Send SMS/email alerts to affected populations
- Visualize trends on dashboards
- Predict pollution spikes using ML models

---

## 🚀 Future Enhancements

- ☁️ Integration with cloud platforms (AWS, Azure, GCP)
- 🤖 Machine learning models for AQI forecasting
- 🗺️ Geospatial visualization with interactive maps
- 📊 Historical data analytics and trend detection
- 🔗 API endpoints for third-party integrations
- 🧠 **AI-style health advice** generated dynamically
---

## 📖 Technical Details

### AQI Categories

| AQI Range | Category | Health Impact |
|-----------|----------|---------------|
| 0-50 | Good | Minimal impact |
| 51-100 | Moderate | Acceptable for most people |
| 101-200 | Poor | Unhealthy for sensitive groups |
| 201-300 | Very Poor | Unhealthy for all groups |
| 301+ | Severe | Health alert, everyone may experience serious effects |

### Alert Logic

The system triggers alerts when:
- AQI > 200 (Poor or worse conditions)
- Rapid AQI increases are detected
- City-specific thresholds are exceeded

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👤 Author

**Your Name**
- Project for environmental monitoring and public health awareness
- Built with ❤️ using Pathway
---

## 🙏 Acknowledgments

This project uses the following open-source APIs, frameworks and services. Sincere thanks to the teams and communities behind them for making this work possible:

- [Pathway](https://pathway.com/) for the powerful stream processing framework
- [Open-Meteo](https://open-meteo.com/) – Free and open air quality data
- [OpenStreetMap](https://www.openstreetmap.org/) – Open geographic data and map tiles
- [Nominatim (OpenStreetMap)](https://nominatim.org/) – Reverse geocoding service
- [IPinfo](https://ipinfo.io/) – IP-based location detection
- [Pathway](https://pathway.com/) – Real-time stream processing framework
- Environmental protection agencies for AQI standards
- Open-source community for continuous support

All data is used in accordance with the respective providers' terms of service.

---

## 📞 Contact

For questions, suggestions, or collaboration opportunities, please reach out:

- **Email:** kathirganesan11@gmail.com
- **GitHub:** [@Kathir2911](https://github.com/Kathir2911)
- **LinkedIn:** [Kathir G](https://www.linkedin.com/in/kathir-ganesan/)

---

## 🏁 Conclusion

This project demonstrates how **Pathway** can be used to build **real-time, intelligent environmental monitoring systems** that react instantly to changing data and provide actionable insights. By leveraging stream processing capabilities, the system ensures that communities receive timely information to protect their health and make informed decisions about outdoor activities.

**Together, we can build smarter systems for a healthier planet.** 🌍💚

---

*Last Updated: February 2026*