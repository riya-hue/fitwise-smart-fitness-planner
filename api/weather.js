// api/weather.js
import { readFileSync } from "fs";
import { join } from "path";

export default async function handler(req, res) {
  const location = req.query.q || "Delhi";

  try {
    // Use local JSON
    const filePath = join(process.cwd(), "data", "weather.json");
    const rawData = readFileSync(filePath, "utf8");
    const data = JSON.parse(rawData);

    // Optional: filter by location if your JSON has multiple cities
    // For now we return the first object
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load local weather" });
  }
}
