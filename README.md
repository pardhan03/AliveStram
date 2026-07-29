# 🟢 AliveStream

A **live-streaming social platform** built with React Native, featuring real-time streamer discovery, Google authentication, and an engaging community experience across iOS and Android.

---

## ✨ Features

- **🎥 Live Stream Discovery** — Browse live streamers with country-based filtering (Global, India, Philippines, Brazil, Vietnam) and real-time search
- **🔐 Google Sign-In** — Seamless authentication via Firebase Auth with Google Sign-In
- **🎉 Party Mode** — Join and host virtual party rooms
- **💬 Chats** — In-app messaging and communication
- **📡 Go Live** — Start your own live broadcast
- **👤 User Profile** — View stats (followers, following, gems earned), manage wallet, VIP membership, and account settings
- **🔔 Notifications & Shopping** — Integrated notification and shopping features
- **🛡️ Persistent Auth** — Stay signed in across app restarts with Redux Persist

---

## 🛠 Tech Stack

| Layer            | Technology                                                   |
| ---------------- | ------------------------------------------------------------ |
| **Framework**    | React Native 0.86 · React 19                                |
| **Language**     | TypeScript                                                   |
| **Navigation**   | React Navigation 8 (Native Stack + Bottom Tabs)              |
| **State**        | Redux Toolkit + Redux Persist + Async Storage                |
| **Auth**         | Firebase Auth + Google Sign-In                               |
| **Networking**   | Axios                                                        |
| **Animations**   | React Native Reanimated 4 · React Native Worklets            |
| **UI**           | React Native SVG · React Native Gesture Handler · Liquid Glass |
| **Config**       | react-native-config (`.env` based)                           |

---

## 📁 Project Structure

```
AliveStram/
├── App.tsx                        # Root component (Redux Provider + Navigation)
├── index.js                       # App entry point
├── src/
│   ├── assets/                    # Static assets (images, fonts, etc.)
│   ├── components/
│   │   └── Icons.tsx              # Reusable SVG icon components
│   ├── config/                    # App-level configuration
│   ├── navigation/
│   │   ├── Route.tsx              # Root NavigationContainer
│   │   ├── AuthenticationRoute.tsx # Auth flow stack (Splash → Sign-In → Main)
│   │   ├── BottomTabNavigator.tsx # Main tab navigator (5 tabs)
│   │   ├── CustomTabBar.tsx       # Custom styled bottom tab bar
│   │   └── types/                 # Navigation type definitions
│   ├── screens/
│   │   ├── SplashScreen/          # Animated splash / launch screen
│   │   ├── auth/
│   │   │   └── GoogleSignInScreen.tsx  # Google Sign-In flow
│   │   ├── Home/                  # Live streamer grid with filters & search
│   │   ├── Party/                 # Party rooms
│   │   ├── GoLive/                # Broadcast / go-live screen
│   │   ├── Chats/                 # Messaging screen
│   │   └── Profile/              # User profile, wallet, settings, logout
│   ├── services/
│   │   ├── api/
│   │   │   └── endpoints.ts      # API endpoint constants
│   │   ├── auth/                  # Auth service (sign-in, sign-out)
│   │   ├── streamService.ts      # Streamer data fetching & filtering
│   │   └── index.ts              # Service barrel exports
│   ├── store/
│   │   ├── configureStore.tsx     # Redux store + persist config
│   │   ├── hooks.ts              # Typed useAppDispatch / useAppSelector
│   │   └── features/
│   │       └── user/
│   │           └── authSlice.tsx  # Auth state (profile, isAuthenticated)
│   └── utils/                    # Utility functions
├── android/                       # Android native project
├── ios/                           # iOS native project
└── __tests__/                     # Test suite
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 22.11.0
- **React Native CLI** environment set up ([official guide](https://reactnative.dev/docs/set-up-your-environment))
- **Android Studio** (for Android) / **Xcode** (for iOS)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/pardhan03/AliveStram.git
   cd AliveStram
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your credentials:

   ```env
   ENV=development
   API_BASE_URL=https://dev-api.alivestream.com/v1
   AUTH_API_URL=https://dev-auth.alivestream.com/v1
   STREAM_API_URL=https://dev-stream.alivestream.com/v1
   TIMEOUT=15000
   PEXELS_API_KEY=your_pexels_api_key_here
   ```

4. **iOS only — install CocoaPods**

   ```bash
   cd ios && pod install && cd ..
   ```

### Running the App

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run linter
npm run lint
```

---

## 🗺 Navigation Flow

```
SplashScreen
  └─→ GoogleSignInScreen (if not authenticated)
        └─→ MainTabs (after successful sign-in)
              ├── Home      — Live streamer discovery
              ├── Party     — Virtual party rooms
              ├── GoLive    — Start broadcasting
              ├── Chats     — Messaging
              └── Profile   — Account & settings
```

Authenticated users are automatically redirected past the sign-in screen via persisted Redux state.

---

## 🔑 Environment Variables

| Variable         | Description                        |
| ---------------- | ---------------------------------- |
| `ENV`            | Environment (`development` / `production`) |
| `API_BASE_URL`   | Base URL for the main API          |
| `AUTH_API_URL`    | Authentication service URL         |
| `STREAM_API_URL`  | Streaming service URL              |
| `TIMEOUT`        | API request timeout (ms)           |
| `PEXELS_API_KEY` | Pexels API key for streamer images |

---

## 📄 License

This project is private and proprietary.
