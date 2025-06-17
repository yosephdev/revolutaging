
# RevolutAging - AI Companion for Seniors

A compassionate AI companion application designed specifically for seniors, featuring empathetic chat, health monitoring, caregiver alerts, and voice-first accessibility.

## 🌟 Features

- **🧠 Empathetic AI Companion**: Natural conversation with memory and emotional intelligence
- **📊 Health Dashboard**: Visual tracking of sleep, activity, mood, and vital signs
- **👩‍⚕️ Smart Caregiver Alerts**: Intelligent monitoring with severity-based notifications
- **🎙️ Voice-First Interface**: Large buttons, clear audio feedback, speech recognition
- **💡 Senior-Friendly Design**: High contrast, large text, accessible navigation
- **🔐 Privacy-First**: Secure data handling and optional offline functionality

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yosephdev/revolutaging.git
cd revolutaging

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🏗️ Architecture

### Frontend Stack
- **React 18** - Component-based UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server
- **Shadcn/UI** - Accessible component library
- **Recharts** - Data visualization

### Backend Integration Ready
The frontend is structured to easily integrate with a Python backend:

- **API Services** (`/src/services/api.ts`) - Organized API calls with mock data
- **Type Definitions** - Complete TypeScript interfaces for all data models
- **Error Handling** - Consistent error boundaries and user feedback
- **State Management** - React Query for server state, localStorage for client state

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/UI base components
│   ├── AICompanion.tsx # Main chat interface
│   ├── HealthDashboard.tsx # Health metrics visualization
│   ├── CaregiverAlertSystem.tsx # Alert management
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useVoiceCommands.ts # Speech recognition logic
│   └── use-toast.ts    # Toast notifications
├── services/           # API integration layer
│   └── api.ts          # Backend service calls (currently mocked)
├── pages/              # Route components
│   └── Index.tsx       # Main application page
└── types/              # TypeScript type definitions
    └── speech.d.ts     # Web Speech API types
```

## 🔧 Backend Integration

### Current State (Frontend Only)
All backend calls are currently **mocked** in `/src/services/api.ts`. The application works fully in demo mode with realistic fake data.

### Backend Integration Steps
1. **Replace Mock APIs**: Update functions in `/src/services/api.ts` with real endpoint URLs
2. **Environment Variables**: Add API base URLs and keys to your deployment environment
3. **Authentication**: Integrate with your Python backend's auth system
4. **Error Handling**: Update error messages and retry logic for your specific backend

### Expected Backend Endpoints

```
POST   /api/chat              # AI conversation
GET    /api/chat/history      # Chat message history
GET    /api/health/metrics    # Current health data
POST   /api/health/metrics    # Update health data
GET    /api/alerts            # Caregiver alerts
PUT    /api/alerts/:id/resolve # Mark alert as resolved
```

## 🎨 Customization

### Theming
- Colors defined in `tailwind.config.ts`
- Senior-friendly palette with high contrast
- Optional dark/light mode support

### Voice Commands
Supported voice commands (configurable in `useVoiceCommands.ts`):
- "Start chat" - Opens AI companion
- "Read health summary" - Shows health dashboard
- "Show alerts" - Opens caregiver alerts
- "Call for help" - Emergency contact

### Accessibility Features
- Large touch targets (minimum 44px)
- High contrast color scheme
- Screen reader support
- Keyboard navigation
- Voice feedback for all actions

## 🧪 Development

### Mock Data
All components use realistic mock data located in:
- `/src/services/api.ts` - API response mocks
- Component files - Local state mocks

### Testing Voice Features
- Chrome/Edge: Full speech recognition support
- Firefox: Limited support
- Safari: Basic support
- Mobile: Platform-dependent

### Adding New Features
1. Create focused components in `/src/components/`
2. Add API calls to `/src/services/api.ts`
3. Update TypeScript types as needed
4. Test with mock data first

## 🚀 Deployment

### Environment Variables
```env
VITE_API_BASE_URL=https://your-backend.com/api
VITE_APP_NAME=RevolutAging
```

### Supported Platforms
- **Vercel**: Zero-config deployment
- **Netlify**: Static site hosting
- **Custom**: Any static file server

## 🔮 Roadmap

- [ ] TensorFlow health analysis integration
- [ ] Advanced voice conversation
- [ ] Video calling for family
- [ ] Medication tracking with photos
- [ ] Emergency contact automation
- [ ] Multi-language support

## 🤝 Contributing

This project is designed for easy backend integration. Key integration points:

1. **API Layer**: Replace mocks in `/src/services/api.ts`
2. **Data Models**: Update TypeScript interfaces as needed
3. **Authentication**: Add login/logout flows
4. **Real-time**: WebSocket support for live alerts

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support

For technical questions about frontend integration, please refer to the component documentation and API service files.

---

**Note**: This frontend is fully functional with mock data and ready for Python backend integration. All API calls are clearly marked and organized for easy replacement with real endpoints.
