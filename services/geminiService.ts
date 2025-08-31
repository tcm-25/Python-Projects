
import { GoogleGenAI, Type } from "@google/genai";
import type { CalculationResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = "gemini-2.5-flash";

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    pythonCode: {
      type: Type.STRING,
      description: "A single line of Python code that evaluates the expression."
    },
    result: {
      type: Type.STRING,
      description: "The numerical or string result of the Python code evaluation."
    }
  },
  required: ["pythonCode", "result"],
};

export const getPythonCalculation = async (expression: string): Promise<CalculationResult> => {
  try {
    const prompt = `Given the mathematical expression: "${expression}", provide the Python code to solve it and the numerical result. Ensure the result is precise. Your response must be a JSON object with two keys: "pythonCode" (a string containing the Python code) and "result" (a number or string representing the answer).`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0,
      },
    });
    
    const jsonString = response.text.trim();
    const parsedResult = JSON.parse(jsonString);

    if (typeof parsedResult.pythonCode === 'string' && typeof parsedResult.result !== 'undefined') {
       return {
         pythonCode: parsedResult.pythonCode,
         result: String(parsedResult.result)
       };
    } else {
      throw new Error("Invalid JSON structure in API response.");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get calculation: ${error.message}`);
    }
    throw new Error("An unknown error occurred during calculation.");
  }
};
