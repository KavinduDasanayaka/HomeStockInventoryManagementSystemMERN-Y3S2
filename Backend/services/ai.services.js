import Groq from 'groq-sdk'
import 'dotenv/config';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is not defined in the environment variables.");
}
const groq = new Groq({ apiKey: GROQ_API_KEY });

async function getResponseRecipe(prompt) {
  if (!prompt || typeof prompt !== "object") {
    throw new Error("Invalid prompt. Please provide a valid object.");
  }


  const formattedPrompt = `Ingredients: ${prompt.ingredients}, Serving Size: ${prompt.servingSize}, Style: ${prompt.style}, Timing: ${prompt.timing}, Whether need to add additional ingredients or not: ${prompt.additional}`;

  try {
    console.log("Formatted Prompt:", formattedPrompt); 
    const chatCompletion = await groq.chat.completions.create({
      model: "deepseek-r1-distill-qwen-32b",
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

export  {getResponseRecipe};