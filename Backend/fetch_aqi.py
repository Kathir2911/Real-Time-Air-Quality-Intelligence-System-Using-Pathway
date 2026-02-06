import json
import requests
import csv
import time
import os
from datetime import datetime

AQI_FILE = "aqi_data.csv"


def init_aqi_file():
    with open(AQI_FILE, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["timestamp", "city", "aqi", "alert"])
    print("📝 aqi_data.csv initialized with header")


def clear_aqi_file():
    with open(AQI_FILE, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["timestamp", "city", "aqi", "alert"])
    print("🧹 aqi_data.csv cleared and header restored")


def reset_location():
    data = {
        "lat": None,
        "lon": None,
        "city": None
    }
    with open("location.json", "w") as f:
        json.dump(data, f)
    print("📍 Location reset to None")


def load_location():
    if not os.path.exists("location.json"):
        return None

    with open("location.json") as f:
        loc = json.load(f)

    if loc.get("lat") is None or loc.get("lon") is None:
        return None

    return (
        float(loc["lat"]),
        float(loc["lon"]),
        loc.get("city", "Unknown")
    )


def detect_location_from_ip():
    try:
        loc_res = requests.get("https://ipinfo.io/json", timeout=5)
        data = loc_res.json()
        lat, lon = data["loc"].split(",")
        return float(lat), float(lon), data.get("city", "Unknown")
    except Exception:
        return None


def get_city_from_coords(lat, lon):
    try:
        res = requests.get(
            "https://nominatim.openstreetmap.org/reverse",
            params={
                "lat": lat,
                "lon": lon,
                "format": "json"
            },
            headers={"User-Agent": "aqi-app"},
            timeout=5
        )
        data = res.json()
        address = data.get("address", {})
        return (
            address.get("city")
            or address.get("town")
            or address.get("village")
            or "Unknown"
        )
    except Exception:
        return "Unknown"


current_location = None
URL = None
CITY = "Unknown"
previous = None
ip_location = None
init_aqi_file()
print("🚀 AQI Fetcher started")
try:
    while True:
        try:
            json_location = load_location()
            if json_location:
                new_location = json_location
            else:
                if ip_location is None:
                    ip_location = detect_location_from_ip()
                new_location = ip_location

            if new_location is None:
                print("📍 No location available, waiting...")
                time.sleep(5)
                continue

            if new_location != current_location:
                LAT, LON, CITY = new_location
                if CITY is None:
                    CITY = get_city_from_coords(LAT, LON)
                URL = (
                    f"https://air-quality-api.open-meteo.com/v1/air-quality?"
                    f"latitude={LAT}&longitude={LON}&hourly=us_aqi"
                )

                current_location = new_location
                previous = None
                print(f"📍 Location set to {CITY} ({LAT}, {LON})")
            response = requests.get(URL, timeout=10)
            data = response.json()

            aqi_list = data["hourly"]["us_aqi"]
            latest_aqi = next(aqi for aqi in reversed(aqi_list)
                              if aqi is not None)

            time_now = datetime.now().strftime("%H:%M:%S")
            changed = (latest_aqi != previous)

            with open(AQI_FILE, mode="a", newline="") as file:
                csv.writer(file).writerow([
                    time_now,
                    CITY,
                    latest_aqi,
                    "YES" if changed else "NO"
                ])

            print("Fetched AQI =", latest_aqi if changed else "AQI No Change")
            previous = latest_aqi
        except Exception as e:
            print("Error fetching AQI:", e)

        time.sleep(60)
except KeyboardInterrupt:
    print("\n🛑 AQI fetcher stopped by user")

finally:
    reset_location()
    clear_aqi_file()
