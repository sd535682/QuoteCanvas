# Quote Canvas 📜✨

_Craft Quotes, Keep Memories with QuoteCanvas!_

## 🌟 Overview

**QuoteCanvas** is a sleek Android application built with React Native CLI, designed to inspire users by creating, displaying and sharing beautifully crafted quotes. With a clean and intuitive interface, users can view random quotes, create and share them effortlessly. Perfect for spreading positivity and motivation on the go! 🚀

## 🎥 App in Action

![VN20250528_232107](https://github.com/user-attachments/assets/a80dba04-175e-433b-8c14-68338c28adc3)


## 🎨 Features

- **Personalized Accounts** 📜: Log in and sign up to access your personalized quotes.
- **Random Quote Display** 📜: Fetch and display inspiring quotes on the home screen.
- **Create Quotes** 🖌️: Create your own inspiring quotes.
- **Share Quotes** 📲: Share your favorite quotes directly to social media platforms.
- **Theme** 📱: Supports both dark and light themes.

## 🛠️ Tech Stack

- **React Native** ⚛️: For building a cross-platform mobile app.
- **TypeScript** 📜: Enhances the app's functionality with static typing and modern JavaScript features.
- **Reanimated** 🧭: For smooth animations.
- **Zustand** 🧭: For robust state management.
- **MMKV** 🧭: For fastest key value storage.

## 📋 Prerequisites

To run **QuoteCanvas** locally, ensure you have the following installed:

- **Node.js** (v16 or higher) 🟢
- **npm** or **yarn** 📦
- **JAVA 17** ( preferred )📦
- **ANDROID SDK** ( ignore if Android Studio is installed ) 📦
- **Android Studio** or **Xcode**: For running emulators/simulators (optional).
- A code editor like **VS Code** 🖥️.

## 🚀 Getting Started

Follow these steps to set up and run **QuoteCanvas** locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/sd535682/QuoteCanvas.git
   cd QuoteCanvas
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Start the Development Server**:

   ```bash
   npm start
   npm run android
   ```

4. **Build for Production**: To create a production build:

   ```bash
   cd android && ./gradlew assembleRelease
   ```

## 💾 Backend

To set up the backend, please visit - https://github.com/sd535682/QuoteCanvas_Backend

## 📂 Project Structure

Here’s the structure of the **QuoteCanvas** repository, with details on key files and their usage:

```
QuoteCanvas/
├── config/config.ts        # development and production configs
├── assets/                 # project assets
|
├── src/                    # main source directory
│   ├── components          # Reusable components
│   ├── constants           # Colors and Icon declarations
│   ├── context             # Auth Context
│   ├── navigations         # Multiple navigations [ Stack, Tab, etc ]
│   ├── screens/            # App and Auth screens
│   ├── services/           # API requests
│   ├── themes/             # Dark and Light theme properties
│   ├── utils/              # MMKV to store user session
|
├── App.tsx                 # Entry point of the application 🚀
├── app.json                # configuration file ⚙️
├── babel.config.js         # Babel configuration for transpiling JavaScript
├── package.json            # Project dependencies and scripts 📦
├── README.md               # This file! 📖
```

## ⚙️ Config setup

```
const config = {
  API_URL: __DEV__
    ? 'http://localhost' // Local Backend URL
    : 'https://Production URL',  // Production URL

  DEBUG_MODE: __DEV__,
  TIMEOUT: __DEV__ ? 10000 : 5000,
  ENABLE_LOGS: __DEV__,
};

if (__DEV__) {
  console.log('🔧 Config loaded:', config);
  console.log('🌍 Environment:', __DEV__ ? 'Development' : 'Production');
}

export const debugLog = (...args: unknown[]): void => {
  if (__DEV__) {
    console.log(...args);
  }
};

export const debugWarn = (...args: unknown[]): void => {
  if (__DEV__) {
    console.warn(...args);
  }
};

export const debugError = (...args: unknown[]): void => {
  if (__DEV__) {
    console.error(...args);
  }
};

export default config;

```

## 🖼️ Icon Themes

![Screenshot_20250528-232905_crDroid Home](https://github.com/user-attachments/assets/320a0971-929b-4ec9-8a56-20ac3ad11e36)
![Screenshot_20250528-232835_crDroid Home](https://github.com/user-attachments/assets/88593f69-3dc9-4d82-8e78-528249f27097)
![Screenshot_20250528-232815_crDroid Home](https://github.com/user-attachments/assets/0cdf51ac-faf0-4189-bc05-e96900f966b1)


## 📜 License

This project is licensed under the Apache License Version 2.0. See the LICENSE file for details (consider adding a `LICENSE` file to your repo).

## 🌐 Connect

- **Author**: Subhadeep Das (@sd535682) 👨‍💻
- **Email**: sd535682@gmail.com 📧
- **GitHub**: https://github.com/sd535682 ⭐
- **Project Link**: https://github.com/sd535682/QuoteCanvas.git 🔗

> **Star this repo** if you love spreading inspiration with **QuoteCanvas**! ⭐ Let’s make the world a more positive place! 😊
