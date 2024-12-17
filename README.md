
---

# **HealthCare AI: Medical Translation and Transcription App**

This project is a BE App that allows users to transcribe speech, translate it into a target language. The application consists **backend** (Node.js (Nest)). The backend is responsible for handling audio processing, transcription, translation, and text-to-speech (TTS).

## **Table of Contents**
1. [Code Documentation](#code-documentation)
   - [Backend Structure](#backend-structure)
   - [AI Tools](#ai-tools)
   - [Security Considerations](#security-considerations)
2. [User Guide](#user-guide)
   - [Running the Application](#running-the-application)

---

## **Code Documentation**

### **Backend Structure**
The backend is built using **Nest.JS**, a nodejs framework, and handles the following operations:

- **Audio Transcription** using **OpenAI’s Whisper API**.
- **Text Translation** using **OpenAI GPT-4 or GPT-3.5 models**.
- **Text-to-Speech (TTS)** conversion using **gTTS (Google Text-to-Speech)**.

#### **Backend Routes**
- **POST /transcribe-and-translate**: Receives the audio recording, performs transcription via OpenAI Whisper, translates the transcribed text using OpenAI, and returns the translation.
- **POST /text-to-speech**: Accepts the translated text and returns an audio file (Buffer) of the translated text using **OpenAI (tts-1) model**.

### **AI Tools**
- **OpenAI Whisper API**: Used to transcribe the recorded speech into text. This is done via OpenAI's powerful automatic speech recognition (ASR) model, Whisper.
- **OpenAI GPT-4 or GPT-3.5 Models**: Used to translate the transcribed text into the target language. The translation can be customized based on the target language selected by the user.
- **OpenAI Text-To-Speech **: Converts the translated text into speech. This audio is returned to the frontend and played on the user's device.

### **Security Considerations**
- **Audio File Handling**: Securely handle the audio files processed by the backend to avoid memory issues or security vulnerabilities.
- **Rate Limiting**: Consider applying rate limiting to API endpoints to prevent abuse or excessive usage of the services (e.g., OpenAI).
- **CORS**: Properly configure CORS (Cross-Origin Resource Sharing) for API requests from the frontend to the backend.

---

## **User Guide**

### **Running the Application**

#### **Set Up the Backend**
1. **Install Dependencies**:
   You’ll need to install Node.JS and its dependencies:
   ```bash
   npm run install 
   ```

2. **Set Up OpenAI API**:
   - You need an OpenAI account and API key. Set up the OpenAI account and create an API Key:
   - Make sure your environment variables for OpenAI API credentials are properly configured.

3. **Run the NodeJS Backend**:
   To start the backend server, run:
   ```bash
   npm run start:dev
   ```
   The BE app will run on `http://127.0.0.1:3000`, and you’ll be able to interact with the frontend from this address.
