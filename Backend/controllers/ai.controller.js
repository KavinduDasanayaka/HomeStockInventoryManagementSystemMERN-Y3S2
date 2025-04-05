import {getResponseRecipe} from "../services/ai.services.js";

const getAiData = async (req, res) => {
    const prompt = req.body.Instruction;

    if (!prompt) {
        res.status(400).send("Prompt is required");
        return;
    }   
    const response = await getResponseRecipe(prompt);

    res.send(response);

}

export {getAiData};