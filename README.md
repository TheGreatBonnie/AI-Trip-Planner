
## Getting Started
First, install the dependencies using the command below:

```
npm install
```

Then, create a file called .env.local in the root directory. Then add the environment variables below in the file that hold your ChatGPT and Tavily Search API keys.

```
OPENAI_API_KEY="Your ChatGPT API key"
TAVILY_API_KEY="Your Tavily Search API key"
OPENAI_MODEL=gpt-4-1106-preview
```
To get the ChatGPT API key, navigate to https://platform.openai.com/api-keys. 

To get the Tavily Search API key, navigate to https://app.tavily.com/home

Finally, run the development server:

```bash
npm run dev
```
