const API_URL = 'http://localhost:11434/api/chat';

export async function generateAIResponse(
  messages: { role: string; content: string }[],
  onChunk: (chunk: string) => void,
): Promise<void> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3.2',
        messages: messages,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate AI response');
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Failed to read response');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.trim() === '') continue;
        try {
          const json = JSON.parse(line);
          if (json.message && json.message.content) {
            onChunk(json.message.content);
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
    }
  } catch (e) {
    console.error('API Call failed with ', e);
  }
}
