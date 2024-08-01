import fetch from "node-fetch";

import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  const url = "https://live.devnimble.com/api/v1/contacts?sort=created:desc";
  const token = process.env.REACT_APP_TOKEN;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
}
