import Groq from 'groq-sdk'
import 'dotenv/config';
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// import PreviewInventory from '../models/previewinventory';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is not defined in the environment variables.");
}
const groq = new Groq({ apiKey: GROQ_API_KEY });

async function getResponseRecipe(prompt) {
  if (!prompt || typeof prompt !== "object") {
    throw new Error("Invalid prompt. Please provide a valid object.");
  }


  const formattedPrompt = `Ingredients: ${prompt.ingredients}, Serving Size: ${prompt.servingSize}, Style: ${prompt.style}, Timing: ${prompt.timing}, Whether need to add additional ingredients or not(True - add || false - don't add additional ingrediants): ${prompt.additional}`;

  try {
    console.log("Formatted Prompt:", formattedPrompt); 
    const chatCompletion = await groq.chat.completions.create({
      model: "deepseek-r1-distill-llama-70b",             //deepseek-r1-distill-llama-70b //llama-3.3-70b-versatile //whisper-large-v3
      messages: [
        {
          role: "user",
          content: formattedPrompt, 
        },
        {
          role: "system",
          content: `Act as a professional chef and Suggest a simple and informative recipe using the provided details. Format the response in Markdown with three sections: \n\n**Name**\n**Ingredients (with clear measurements)**\n**Instructions (step-by-step but concise & as bullet points, under 50 words).`,
        },
      ],
    });

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error("Error in getResponseRecipe:", error);
    throw new Error("Failed to fetch recipe from AI service.");
  }
}


// In On PreviewInventory controller 

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export const handleUpload = async (req, res) => {
//   if (!req.file) return res.status(400).json({ error: "No file uploaded" });

//   const imagePath = path.join(__dirname, "..", req.file.path);

//   try {
//     const base64Image = fs.readFileSync(imagePath, { encoding: "base64" });

//     const chatCompletion = await groq.chat.completions.create({
//       model: "",
//       messages: [
//         {
//           role: "user",
//           content: [
//             {
//               type: "text",
//               text: `Extract purchased items, quantities, and unit prices from the receipt image. Return ONLY a **valid JSON array** with this format:
//         [
//           {"quantity": <integer>, "item": "<exact_item_name>", "unitPrice": "<currency_symbol><amount>.00"}
//         ]
//         ⚠️ STRICT RULES:
//         - NO extra text, explanations, markdown, or wrapping inside another object.
//         - DO NOT return "extractedData": or any keys—just the raw JSON array.
//         - If the data is unreadable, return [] EXACTLY.
//         - If you fail these rules, your answer is **incorrect**.`
//             },
//             {
//               type: "image_url",
//               image_url: { url: `data:image/jpeg;base64,${base64Image}` }
//             }
//           ]
//         }
//       ]
//     });

//     const extractedData = chatCompletion.choices[0].message.content;
//     res.json({ extractedData });

//     fs.unlinkSync(imagePath); // Clean up
//   } catch (error) {
//     console.error("Error processing:", error);
//     res.status(500).json({ error: "Processing Failed" });
//   }
// };


export  {getResponseRecipe};