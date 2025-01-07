interface DeepseekResponse {
  text: string;
}

export const callDeepseekApi = async (
  prompt: string,
  apiKey: string,
  baseUrl: string = "https://api.deepseek.com/v1/chat/completions"
): Promise<string> => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    const data: DeepseekResponse = await response.json();
    return data.text;
  } catch (error) {
    console.error("Error calling Deepseek API:", error);
    throw error;
  }
};