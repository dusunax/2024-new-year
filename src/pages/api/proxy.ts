import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = req.query.url as string;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const response = await fetch(url);
    const imageBuffer = await response.buffer();

    res.setHeader("Content-Type", "image/png");
    res.send(imageBuffer);
  } catch (error) {
    res.status(500).json({ error: "Error fetching the image" });
  }
}
