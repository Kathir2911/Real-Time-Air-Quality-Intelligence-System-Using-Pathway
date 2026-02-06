import pathway as pw


class AQISchema(pw.Schema):
    timestamp: str
    city: str
    aqi: int


aqi_table = pw.io.csv.read(
    "aqi_data.csv",
    schema=AQISchema,
    mode="streaming"
)


result = aqi_table.select(
    city=aqi_table.city,
    aqi=aqi_table.aqi,

    category=pw.if_else(
        aqi_table.aqi <= 50, "Good",
        pw.if_else(
            aqi_table.aqi <= 100, "Moderate",
            pw.if_else(
                aqi_table.aqi <= 200, "Poor",
                "Very Poor"
            )
        )
    ),

    alert=pw.if_else(
        aqi_table.aqi > 150,
        "YES",
        "NO"
    ),

    health_advice=pw.if_else(
        aqi_table.aqi <= 50, "Air quality is good. No health risks.",
        pw.if_else(
            aqi_table.aqi <= 100, (
                "Air quality is acceptable."
                "Sensitive individuals should be cautious."
            ),
            pw.if_else(
                aqi_table.aqi <= 200, (
                    "Unhealthy for sensitive groups."
                    "Reduce prolonged outdoor activity."
                ),
                (
                    "Very unhealthy air."
                    "Avoid outdoor activities and wear protection."
                )
            )
        )
    ),
    alert_message=pw.if_else(
        aqi_table.aqi > 200, (
            "Air Quality Emergency: AQI is extremely high."
            "Residents are advised to wear masks and avoid outdoor activities."
        ), ""
    )
)

alerts = result.filter(
    result.alert_message != ""
)

alerts = alerts.select(
    city=alerts.city,
    aqi=alerts.aqi,
    alert_message=alerts.alert_message
)


pw.io.csv.write(alerts, "alerts.csv")

pw.io.csv.write(result, "output_aqi_live.csv")

pw.run()
