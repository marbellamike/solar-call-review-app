# Solar Call Review - React App

AI-powered call review platform for Solar Claims. Built with React, Vite, and Tailwind CSS.

## Features

- 📝 Simple form for call submission (Agent, Client, Transcript)
- 🤖 AI-powered analysis via DeepSeek API
- 📊 Real-time score and feedback display
- 📧 Email confirmation sent to marbellamike@gmail.com
- 💾 Results saved to Notion database
- 🎨 Clean, modern UI with Tailwind CSS

## Quick Start (Local Development)

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup

```bash
cd solar-call-review-app

# Install dependencies
npm install

# Start dev server
npm run dev
```

App will open at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

Creates optimized build in `dist/` folder.

## Deploy to Netlify

### Option 1: Connect GitHub (Recommended)

1. Push this repo to GitHub
2. Log in to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your GitHub repo
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Click Deploy

Netlify will auto-deploy on every push.

### Option 2: Manual Deploy

```bash
npm run build
# Then drag the 'dist' folder to netlify.com
```

### Option 3: Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

## Configuration

The app calls this webhook:
```
https://springlead.oph.st/webhook/solar-call-review-v4
```

To change it, edit `src/App.jsx` line 30.

## Project Structure

```
src/
├── App.jsx              # Main app component
├── main.jsx             # Entry point
├── index.css            # Tailwind imports
└── components/
    ├── ReviewForm.jsx   # Input form
    ├── ReviewResult.jsx # Results display
    └── Loading.jsx      # Loading spinner
```

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool (fast dev experience)
- **Tailwind CSS** - Styling
- **PostCSS** - CSS processing

## Environment

No environment variables needed for basic usage. The webhook URL is hardcoded.

## Future Enhancements

- [ ] MP3 audio upload + auto-transcription
- [ ] Agent dashboard with historical reviews
- [ ] Slack integration for notifications
- [ ] User authentication
- [ ] Dark mode

## Support

For issues with the app, check:
1. Console errors (F12 → Console)
2. Network tab (F12 → Network) when submitting
3. That webhook URL is accessible

---

Built with ❤️ for Solar Claims coaching platform
