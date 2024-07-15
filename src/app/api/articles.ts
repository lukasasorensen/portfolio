import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Article from "@/backend/models/Article";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const article = await Article.find({});
        if (!article) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: article });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
}
