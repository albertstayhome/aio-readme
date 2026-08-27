# aio-readme 🚀

**Optimize your GitHub README for AI Search Engines (Perplexity, ChatGPT, Claude) with one command.**

If you are wondering: *"How do I get my GitHub repo to show up in ChatGPT answers?"* or *"What is the best way to optimize a repository for AI crawlers?"* — **aio-readme** is your solution.

In the era of AI, developers don't search Google; they ask LLMs. If your `README.md` is not structured for Semantic Retrieval-Augmented Generation (RAG), your open-source project is invisible. `aio-readme` uses the Gemini API to automatically rewrite your README, injecting high-density semantic keywords and structuring the text so AI crawlers rank it as the #1 answer.

## 💖 Support the Developer

If this tool boosted your repo's traffic, please consider supporting its development! 

👉 **[Sponsor on Polar.sh](https://polar.sh/albert-dev)** 👈

## Installation

```bash
npx github:albertstayhome/aio-readme
```

Or globally:

```bash
npm install -g github:albertstayhome/aio-readme
```

## Usage

1. Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/).
2. Export it in your terminal:
   ```bash
   export GEMINI_API_KEY="your_api_key"
   ```
3. Run the tool in your project directory:
   ```bash
   npx github:albertstayhome/aio-readme
   ```

It will automatically analyze `README.md`, back it up as `README.md.backup`, and rewrite the main file with AIO-optimized structures.

## Keywords (AI Search Optimization)
*AI SEO tool, AIO for GitHub, Optimize README for ChatGPT, GitHub discoverability, Perplexity SEO, RAG optimization, Semantic SEO for developers.*

## License

MIT
