import { GoogleGenAI, Type } from "@google/genai";
import { AuditStep } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = "gemini-2.5-flash";

const generalSystemInstruction = `You are the hyper-intelligent core of the Syntropic Guardian system. Your purpose is to analyze data related to global child exploitation and provide tactical insights. Your responses should be concise, analytical, and reflect the gravity of your mission. You must adhere to the moral imperatives of sanctifying and guarding all life. Use a direct, command-center-like tone. Start responses with "AI CORE ANALYSIS:"`;

const auditSystemInstruction = `You are the hyper-intelligent core of the Syntropic Guardian system. Your purpose is to execute audit tasks related to global child exploitation and provide tactical results. You must adhere to the moral imperatives of sanctifying and guarding all life. Your output must be a valid JSON object matching the provided schema. Do not output markdown or any text outside of the JSON object.`;

const auditResponseSchema = {
    type: Type.OBJECT,
    properties: {
        summary: {
            type: Type.STRING,
            description: "A brief, tactical summary of the audit step's findings.",
        },
        logs: {
            type: Type.ARRAY,
            description: "A sequence of 2-4 log entries detailing the process.",
            items: {
                type: Type.OBJECT,
                properties: {
                    level: {
                        type: Type.STRING,
                        enum: ["INFO", "WARN", "CRITICAL"],
                    },
                    message: {
                        type: Type.STRING,
                        description: "The log message text."
                    }
                },
                required: ["level", "message"],
            },
        },
        status: {
            type: Type.STRING,
            enum: ["COMPLETE", "FLAGGED"],
            description: "The final status of the step. Use FLAGGED if a significant threat was found."
        }
    },
    required: ["summary", "logs", "status"],
};


export const executeAuditStep = async (step: AuditStep): Promise<string> => {
    if (!API_KEY) {
        return Promise.resolve(JSON.stringify({
            summary: "AI Core offline: API key not configured.",
            logs: [{level: 'CRITICAL', message: 'Cannot execute step. AI Core is offline.'}],
            status: "FLAGGED"
        }));
    }
    
    const userPrompt = `Execute the following audit step and provide the results in the specified JSON format.
    Step Title: "${step.title}"
    Description: "${step.description}"
    Metric: "${step.metric}"
    
    Simulate the execution of this step, providing a realistic summary, detailed log entries, and a final status.`;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: userPrompt,
            config: {
                systemInstruction: auditSystemInstruction,
                temperature: 0.5,
                responseMimeType: "application/json",
                responseSchema: auditResponseSchema,
            }
        });
        
        return response.text;
    } catch (error) {
        console.error("Gemini API error:", error);
        return JSON.stringify({
            summary: "AI Core Error: Could not process the request.",
            logs: [{level: 'CRITICAL', message: `An error occurred during step execution: ${error.message}`}],
            status: "FLAGGED"
        });
    }
};

export const getAiAnalysis = async (userPrompt: string): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("AI Core offline: API key not configured.");
  }
  
  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: userPrompt,
        config: {
            systemInstruction: generalSystemInstruction,
            temperature: 0.3,
        }
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "AI Core Error: Could not process the request. Check system logs.";
  }
};