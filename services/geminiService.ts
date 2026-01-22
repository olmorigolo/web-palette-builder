
import { GoogleGenAI, Type } from "@google/genai";
import { ColorInfo } from "../types";

export const generatePalette = async (seeds: string[]): Promise<{ colors: ColorInfo[], concept: string }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Act as a world-class UI/UX designer. Create a professional website color palette using these seed colors: ${seeds.join(', ')}. 
  The palette must contain exactly 6 colors with specific roles: 
  1. 'background' (usually light or dark neutral)
  2. 'text' (high contrast to background)
  3. 'primary' (the main brand color)
  4. 'secondary' (supporting brand color)
  5. 'accent-1' (for call-to-actions)
  6. 'accent-2' (for variety)

  Ensure the colors are modern, accessible, and harmonious.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          concept: {
            type: Type.STRING,
            description: "A brief professional description of the palette vibe."
          },
          colors: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                hex: { type: Type.STRING, description: "Hexadecimal color code with #" },
                name: { type: Type.STRING, description: "A creative name for the color" },
                role: { 
                  type: Type.STRING, 
                  enum: ['primary', 'secondary', 'accent-1', 'accent-2', 'background', 'text'] 
                },
                description: { type: Type.STRING, description: "Why this color was chosen for this role" }
              },
              required: ["hex", "name", "role", "description"]
            }
          }
        },
        required: ["colors", "concept"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text);
    return data;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Invalid response format from AI");
  }
};

export const generateHeroImage = async (colors: ColorInfo[], concept: string): Promise<string> => {
  const colorDesc = colors.map(c => `${c.name} (${c.hex})`).join(', ');
  
  const prompt = `Create a high-quality, abstract, modern website hero background image.
  Concept: ${concept}
  Colors to emphasize: ${colorDesc}.
  Style: Sleek, digital, gradient-heavy, geometric or fluid shapes. Minimalist interface background.
  No text in the image.`;

  // Azure Foundry Endpoint construction
  const baseUrl = "https://sales-tools-sponsored-resource.services.ai.azure.com/api/projects/sales-tools-sponsored";
  const endpoint = `${baseUrl}/images/generations`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.API_KEY || '',
      },
      body: JSON.stringify({
        model: "gpt-image",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json"
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Azure Service Error:", errorText);
      throw new Error(`Image generation failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.data?.[0]?.b64_json) {
      return `data:image/png;base64,${data.data[0].b64_json}`;
    }

    throw new Error("No image data received from Azure service");
  } catch (error) {
    console.error("Hero image generation error:", error);
    throw error;
  }
};
