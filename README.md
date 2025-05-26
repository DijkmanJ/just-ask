# JustAsk - Intelligent Question Management for Zoom

JustAsk is a Zoom plugin that enhances audience interaction in large video conferences by intelligently managing and clustering questions using AI. It helps speakers better understand and address audience concerns in real-time.

## Features

- Real-time question submission during video conferences
- AI-powered question clustering and analysis
- Question frequency and relevance tracking
- Speaker feedback and analytics
- Integration with Zoom SDK

## Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Zoom Developer Account
- OpenAI API Key

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/just-ask.git
cd just-ask
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_ZOOM_CLIENT_ID=your_client_id
VITE_ZOOM_CLIENT_SECRET=your_client_secret
VITE_ZOOM_REDIRECT_URL=your_redirect_url
VITE_ZOOM_SDK_KEY=your_sdk_key
VITE_ZOOM_SDK_SECRET=your_sdk_secret
VITE_OPENAI_API_KEY=your_openai_api_key
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
just-ask/
├── src/
│   ├── components/      # Vue components
│   ├── services/        # Business logic and API services
│   ├── stores/          # Pinia stores
│   ├── types/           # TypeScript type definitions
│   └── App.vue          # Root component
├── public/              # Static assets
└── package.json         # Project dependencies
```

## Development

The project uses:
- Vue 3 with Composition API
- TypeScript for type safety
- Tailwind CSS for styling
- Zoom Web SDK for video conferencing
- OpenAI API for question analysis

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Roadmap

- [ ] Speech-to-text question submission
- [ ] Enhanced analytics dashboard
- [ ] Custom clustering algorithms
- [ ] Real-time speaker feedback
- [ ] Meeting recording integration
- [ ] Multi-platform support 