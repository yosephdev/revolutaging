
# RevolutAging - AI Companion for Seniors

A compassionate AI companion application designed specifically for seniors, featuring empathetic chat, health monitoring, caregiver alerts, and voice-first accessibility.

## 🌟 Features

- **🧠 Empathetic AI Companion**: Natural conversation with memory and emotional intelligence
- **📊 Health Dashboard**: Visual tracking of sleep, activity, mood, and vital signs
- **👩‍⚕️ Smart Caregiver Alerts**: Intelligent monitoring with severity-based notifications
- **🎙️ Voice-First Interface**: Large buttons, clear audio feedback, speech recognition
- **💡 Senior-Friendly Design**: High contrast, large text, accessible navigation
- **🔐 Privacy-First**: Secure data handling with Firebase Authentication and Firestore.
- **💊 Medication Tracking**: Manage medications with photo uploads.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn package manager
- Firebase Account and Project

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yosephdev/revolutaging.git
    cd revolutaging
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Firebase:**
    *   Create a new project on the [Firebase Console](https://console.firebase.google.com/).
    *   In your project, create a new Web App.
    *   Copy the `firebaseConfig` object from your project settings.
    *   Create a new file `src/lib/firebase.ts` and add your `firebaseConfig` to it.

4.  **Start the development server:**
    ```bash
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

### Backend
- **Firebase** - Authentication, Firestore Database, and Storage

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
│   ├── useAuth.ts      # Firebase authentication hook
│   ├── useVoiceCommands.ts # Speech recognition logic
│   └── use-toast.ts    # Toast notifications
├── lib/
│   ├── firebase.ts     # Firebase configuration
│   └── utils.ts
├── services/           # API integration layer
│   └── api.ts          # Firebase service calls
├── pages/              # Route components
│   ├── Index.tsx       # Main application page
│   ├── MedicationPage.tsx # Medication tracking page
│   └── auth/
│       └── LoginPage.tsx # Login and registration page
└── types/              # TypeScript type definitions
    └── speech.d.ts     # Web Speech API types
```

## 🔮 Roadmap

- [ ] TensorFlow health analysis integration
- [ ] Advanced voice conversation
- [ ] Video calling for family
- [x] Medication tracking with photos
- [ ] Emergency contact automation
- [ ] Multi-language support

## 🤝 Contributing

This project is designed for easy backend integration. Key integration points:

1.  **API Layer**: The mock API in `/src/services/api.ts` has been replaced with Firebase services.
2.  **Data Models**: TypeScript interfaces are used for all data models.
3.  **Authentication**: Firebase Authentication is used for user login and registration.
4.  **Real-time**: Firestore provides real-time data for alerts and other features.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
