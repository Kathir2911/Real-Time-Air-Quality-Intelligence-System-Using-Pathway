import time
import csv
from plyer import notification
from datetime import datetime, timedelta

alert_file = "alerts.csv"
last_alert_time = {}


def reset_alerts_file():
    with open(alert_file, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["city", "aqi", "alert_message"])
    print("🧹 alerts.csv reset")


cooldown = timedelta(hours=1)
TTL = timedelta(hours=6)
print("🔔 Notification service started")
try:
    while True:
        for city in list(last_alert_time.keys()):
            if datetime.now() - last_alert_time[city] > TTL:
                del last_alert_time[city]
        try:
            with open(alert_file, mode="r") as file:
                reader = csv.DictReader(file)
                for row in reader:
                    city = row["city"]
                    message = row["alert_message"]
                    aqi = row["aqi"]
                    now = datetime.now()
                    last_time = last_alert_time.get(city)
                    if last_time is None or (now - last_time) > cooldown:
                        notification.notify(
                            title="🚨 Air Quality Alert",
                            message=f"{city} (AQI {aqi}): {message}",
                            timeout=10,
                        )

                        print(f"🔔 Alert pushed for {city}")
                        last_alert_time[city] = now
        except FileNotFoundError:
            pass
        time.sleep(5)
except KeyboardInterrupt:
    print("\n🛑 Notification service stopped by user")

finally:
    reset_alerts_file()
