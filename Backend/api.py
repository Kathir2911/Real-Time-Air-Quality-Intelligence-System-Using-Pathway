from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import requests
import csv
import json
from pydantic import BaseModel


class Location(BaseModel):
    lat: float
    lon: float
    city: str | None = None


app = FastAPI(
    title="AQI Intelligence API",
    description="Real-time AQI monitoring and alerts",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Welcome to the AQI Intelligence API"}


@app.get("/aqi/latest")
def latest_aqi():
    try:
        with open("output_aqi_live.csv", mode="r", newline="") as f:
            rows = list(csv.DictReader(f))
            if rows:
                return rows[-1]
    except FileNotFoundError:
        pass
    return {"error": "No data"}


@app.get("/aqi/history")
def aqi_history():
    try:
        with open("output_aqi_live.csv", mode="r", newline="") as file:
            return list(csv.DictReader(file))
    except FileNotFoundError:
        return []


@app.get("/alerts")
def alerts():
    try:
        with open("alerts.csv", newline="") as f:
            return list(csv.DictReader(f))
    except FileNotFoundError:
        return []


@app.get("/aqi/by-location")
def get_aqi(lat: float, lon: float):
    url = (
        "https://air-quality-api.open-meteo.com/v1/air-quality"
        f"?latitude={lat}&longitude={lon}&hourly=us_aqi"
    )

    res = requests.get(url, timeout=10)
    data = res.json()

    aqi = data["hourly"]["us_aqi"][-1]

    return {
        "lat": lat,
        "lon": lon,
        "aqi": aqi
    }


@app.get("/aqi/history/by-location")
def aqi_history_by_location(lat: float, lon: float):
    url = (
        "https://air-quality-api.open-meteo.com/v1/air-quality"
        f"?latitude={lat}&longitude={lon}&hourly=us_aqi"
    )

    res = requests.get(url, timeout=10)
    data = res.json()

    times = data["hourly"]["time"]
    aqi_values = data["hourly"]["us_aqi"]

    history = [
        {
            "time": int(datetime.fromisoformat(t).timestamp() * 1000),
            "aqi": aqi
        }
        for t, aqi in zip(times, aqi_values)
    ]
    return history


@app.post("/location")
def set_location(location: Location):
    data = {
        "lat": location.lat,
        "lon": location.lon,
        "city": location.city
    }

    with open("location.json", "w") as f:
        json.dump(data, f)

    return {"status": "saved", "location": data}
