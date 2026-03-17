# AI SEO Copilot - Chrome Extension

A Chrome extension that analyzes web pages for SEO optimization and provides AI-powered recommendations to improve search rankings.

**Website:** https://ai-seo-copilot.webflow.io/

## Features

- **Real-time SEO Analysis** - Instant scoring for titles, meta descriptions, headings, images, and more
- **AI-Powered Recommendations** - OpenAI integration generates optimized content suggestions
- **Keyword Optimization** - Track keyword usage across all page elements
- **One-Click Copy** - Copy suggestions directly to your clipboard
- **Visual Score Breakdown** - See exactly where your page needs improvement

## Quick Start

See the detailed setup instructions in [`app/README.md`](./app/README.md).

**TL;DR:**
```bash
# Install Node.js from https://nodejs.org/ first, then:
npm install -g pnpm
cd app
pnpm install
pnpm build
# Load app/dist folder in Chrome as unpacked extension
```

## Project Structure

```
ai-seo-copilot-extension/
├── app/                    # Chrome extension source code
│   ├── src/                # React + TypeScript source
│   ├── dist/               # Built extension (load this in Chrome)
│   ├── icons/              # Extension icons
│   ├── manifest.json       # Chrome extension manifest
│   └── README.md           # Detailed setup instructions
├── .claude/                # Claude Code AI agent configuration
├── docs/                   # Additional documentation
└── README.md               # This file
```

## Development

```bash
cd app
pnpm install       # Install dependencies
pnpm dev           # Start development server
pnpm build         # Build for production
pnpm test          # Run test suite (283 tests)
```

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool and dev server
- **Zustand** - State management
- **OpenAI API** - AI-powered recommendations
- **Vitest** - Testing framework

## License

MIT

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests (`pnpm test`)
5. Submit a pull request
