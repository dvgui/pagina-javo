# ChatGPT Clone

A functional ChatGPT-like interface built using modern web technologies. This project demonstrates React 19 with server components, TypeScript, Tailwind CSS, Radix UI, and TanStack Query (React Query). The AI backend uses the **Llama 3.2 API** (or Ollama) to handle natural language processing.
This project was built for fun to be trained by Libertarians to give replies with no leftism remarks.

---

## Features

- **Chat Interface**: ChatGPT-style layout with history on the left and a chat panel on the right.
- **AI Integration**: Powered by Llama 3.2 API for local AI inference.
- **React Query**: Efficient state and server data management.
- **Modern Design**: Styled using Tailwind CSS and Radix UI components.
- **TypeScript**: Strong typing for a robust development experience.

---

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

1. **Node.js** (>= 22.x)
2. **NPM** or **Yarn**
3. **Llama 3.2 API** running locally or a compatible API server
4. Basic knowledge of React and TypeScript

---

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chatgpt-clone.git
   cd chatgpt-clone
   ```
2. Install dependencies:
   npm install

3. Configure the API:

   - Edit the `src/api.ts` file to point to your Llama API endpoint:
     const API_URL = "http://localhost:11434/api/generate";

4. Start the development server:
   npm run dev

5. Open the app in your browser:
   http://localhost:3000

---

## Project Structure

```
src/
├── components/ # UI components (chat, history, etc.)
├── pages/ # Next.js routes and server-side rendering
├── styles/ # Tailwind CSS configuration and styles
├── hooks/ # React Query hooks and utilities
├── api.ts # API integration with Llama 3.2
├── App.tsx # Main React component
└── ...
```

---

## API Usage

### Llama 3.2 API

Ensure you have the Llama 3.2 API running locally or remotely. Update the endpoint URL in `src/api.ts` if necessary.

Example POST request to the `/generate` endpoint:
{
"model": "llama3.2",
"prompt": "What is the capital of France?"
}

Expected response:
{
"response": "The capital of France is Paris."
}

### Common Errors

- **CORS**: Ensure your API server is configured to allow requests from `http://localhost:3000`.
- **404 Not Found**: Verify the API endpoint and ensure the server is running.

---

## Tech Stack

- **React 19**: Latest React features with server components.
- **TypeScript**: Strongly-typed JavaScript for better reliability.
- **TanStack Query**: Data fetching and state management.
- **Tailwind CSS**: Utility-first styling framework.
- **Radix UI**: Accessible UI primitives.

---

## Future Plans

- **AWS Bedrock Integration**: Transition from Llama 3.2 to AWS Bedrock for v2.
- **Improved Prompt Engineering**: Fine-tune the prompts for better AI responses.
- **Deploy to Production**: Hosting on Vercel, AWS, or similar platforms.

---

## Contributing

Feel free to fork this repository and submit pull requests. Contributions and feedback are welcome!

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- [Llama 3.2 API](https://ollama.ai/)
- [React](https://reactjs.org/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)

---

Happy coding!
