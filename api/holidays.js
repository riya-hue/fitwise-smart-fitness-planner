// api/holidays.js
import { readFileSync } from "fs";
import { join } from "path";

export default async function handler(req, res) {
  try {
    const filePath = join(process.cwd(), "data", "holidays.json");
    const rawData = readFileSync(filePath, "utf8");
    const data = JSON.parse(rawData);

    // Return first 20 holidays (or all if less)
    res.status(200).json(data.response.holidays.slice(0, 20));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load local holidays" });
  }
}
