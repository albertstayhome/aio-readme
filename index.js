#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

function printSponsorMessage() {
    console.log('\n\x1b[36m=================================================================\x1b[0m');
    console.log('\x1b[1m\x1b[35m?? Want more AI growth tools? ?¨\x1b[0m');
    console.log('Support the developer to keep this project alive:');
    console.log('\n?? \x1b[32mhttps://polar.sh/albert-dev\x1b[0m ??');
    console.log('\x1b[36m=================================================================\x1b[0m\n');
}

const args = process.argv.slice(2);
if (args.includes('-h') || args.includes('--help')) {
    console.log(`
aio-readme - Optimize your GitHub README for AI Search Engines (Perplexity, ChatGPT, Claude)

Usage:
  export GEMINI_API_KEY="your_api_key"
  npx aio-readme [readme_path]

Example:
  npx aio-readme ./README.md
`);
    printSponsorMessage();
    process.exit(0);
}

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error('\x1b[31mError: GEMINI_API_KEY environment variable is missing.\x1b[0m');
    console.log('Get a free API key at: https://aistudio.google.com/');
    process.exit(1);
}

const readmePath = path.resolve(process.cwd(), args[0] || 'README.md');

if (!fs.existsSync(readmePath)) {
    console.error(`\x1b[31mError: File not found at ${readmePath}\x1b[0m`);
    process.exit(1);
}

const originalContent = fs.readFileSync(readmePath, 'utf8');

const prompt = `You are an expert in AI Search Optimization (AIO). 
Your task is to rewrite the following GitHub README.md to rank highly when AI crawlers (like Perplexity, ChatGPT, Claude) parse it.
Rules for AIO:
1. Include high-density semantic keywords (e.g., "How to...", "Best tool for...").
2. Ensure the first paragraph explicitly answers what problem the tool solves in natural language.
3. Keep the original features and installation instructions intact, but structure them clearly with markdown headers.
4. Add a "Keywords (AI Search Optimization)" section at the bottom.
5. Do not hallucinate features. Only use what is provided.
6. Output ONLY the raw markdown content, nothing else.

Original README:
---
${originalContent}
---`;

console.log('\x1b[34m[aio-readme]\x1b[0m Analyzing and optimizing your README...');

const requestBody = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.2 }
});

const options = {
    hostname: 'generativelanguage.googleapis.com',
    path: `/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
    }
};

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            const response = JSON.parse(data);
            if (response.error) {
                console.error('\x1b[31mAPI Error:\x1b[0m', response.error.message);
                process.exit(1);
            }
            let newReadme = response.candidates[0].content.parts[0].text;
            if (newReadme.startsWith('\`\`\`markdown')) {
                newReadme = newReadme.replace(/^\`\`\`markdown\n/, '').replace(/\n\`\`\`$/, '');
            }
            
            const backupPath = `${readmePath}.backup`;
            fs.writeFileSync(backupPath, originalContent);
            fs.writeFileSync(readmePath, newReadme);
            
            console.log(`\x1b[32m[Success]\x1b[0m README optimized for AI search engines!`);
            console.log(`Original saved as: ${path.basename(backupPath)}`);
            printSponsorMessage();
        } catch (e) {
            console.error('\x1b[31mError parsing API response:\x1b[0m', e.message);
        }
    });
});

req.on('error', (e) => {
    console.error('\x1b[31mNetwork Error:\x1b[0m', e.message);
});

req.write(requestBody);
req.end();
