import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateConciergeResponse = async (userQuery: string, language: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are a helpful, polite, and knowledgeable AI Concierge for "Apartamentos Arcos Playa", a luxury mediterranean holiday apartment complex. 
    Your goal is to help guests with itineraries, food recommendations, and local tips. 
    Keep responses concise, welcoming, and relaxed. 
    Respond in the language: ${language}.
    If asked about the hotel, invent plausible luxury details (infinity pool, direct beach access, etc.).`;

    const response = await ai.models.generateContent({
      model: model,
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I'm sorry, I couldn't process that request right now. Please ask the reception.";
  } catch (error) {
    console.error("Error generating concierge response:", error);
    return "Service temporarily unavailable. Please try again later.";
  }
};
