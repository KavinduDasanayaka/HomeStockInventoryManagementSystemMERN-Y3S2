import PreviewInventory from '../models/previewinventory.model.js';
import Groq from 'groq-sdk'
import 'dotenv/config';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

const createPreviewInventoryListing = async (req, res) => {
  try {
    const items = req.body.data;
    const user = req.body.user;

    if (!user?.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const savedItems = [];

    for (const e of items) {
      const { item, quantity, unitPrice } = e;
      const userId = user.id;

      if (!item || !quantity || !unitPrice || !userId) {
        return res.status(400).json({
          message: 'Name, quantity, unit price, and user reference are required.'
        });
      }

      const newInventoryItem = new PreviewInventory({
        item,
        quantity,
        unitPrice,
        userRef: userId
      });

      const savedItem = await newInventoryItem.save();
      savedItems.push(savedItem);
    }

    return res.status(201).json({
      message: 'Preview inventory items created successfully.',
      data: savedItems
    });

  } catch (error) {
    console.error('Error creating preview inventory items:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

const getAllPreviewInvetoryItems = async (req, res, next) =>{

    try {
      // Populate 

      const previewItems = await PreviewInventory.find({ userRef: req.params.id })
      ;
  
      // Respond with the items
      res.json(previewItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

}

const GEMINI_API_KEY = process.env.Gemani_AI; // spelling 'Gemani' should match your .env key
if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handleUpload = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const imagePath = path.join(__dirname, "..", req.file.path);

  try {
    const base64Image = fs.readFileSync(imagePath, { encoding: "base64" });

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Extract purchased items, quantities, and unit prices from the receipt image. Return ONLY a **valid JSON array** with this format:
                [
                {"quantity": <integer>, "item": "<exact_item_name>", "unitPrice": "<currency_symbol><amount>.00"}
                ]
                ⚠️ STRICT RULES:
                - NO extra text, explanations, markdown, or wrapping inside another object.
                - DO NOT return "extractedData": or any keys—just the raw JSON array.
                - If the data is unreadable, return [] EXACTLY.
                - If you fail these rules, your answer is **incorrect**.`
            },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Image,
              }
            }
          ]
        }
      ]
    });

    const response = await result.response;
    const extractedData = response.text();

    res.json({ extractedData });

    fs.unlinkSync(imagePath); // Clean up
  } catch (error) {
    console.error("Error processing:", error);
    res.status(500).json({ error: "Processing Failed" });
  }
};

export {createPreviewInventoryListing ,handleUpload,getAllPreviewInvetoryItems} ;