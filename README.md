# 🔍 Code Reviewer AI

A modern, AI-powered code review tool built with React and Express that provides instant, professional feedback on your code using Google's Gemini AI.

![Code Reviewer AI](https://img.shields.io/badge/AI-Powered-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)

## ✨ Features

- 🤖 **AI-Powered Reviews** - Leverages Google Gemini 2.5 Flash for intelligent code analysis
- 💻 **Live Code Editor** - Syntax highlighting with Prism.js
- 🎨 **Modern UI** - Beautiful dark theme with smooth animations
- 📝 **Multiple Languages** - Support for JavaScript, TypeScript, Python, Java
- ⚡ **Real-time Feedback** - Get instant suggestions and improvements
- 📋 **Copy Review** - One-click copy of AI-generated reviews
- ⌨️ **Keyboard Shortcuts** - Ctrl + Enter to review code
- 🎯 **Example Snippets** - Quick-load common code patterns

## 🚀 Tech Stack

### Frontend
- React with Vite
- React Simple Code Editor
- Prism.js for syntax highlighting
- React Markdown with syntax highlighting
- Axios for API calls
- Modern CSS with animations

### Backend
- Node.js & Express
- Google Generative AI (Gemini)
- CORS enabled
- RESTful API architecture

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### Backend Setup

```bash
cd BackEnd
npm install
```

Create a `.env` file in the BackEnd directory:
```env
GOOGLE_GEMINI_KEY=your_api_key_here
PORT=3000
```

Start the server:
```bash
npm start
# or with nodemon
npx nodemon server.js
```

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

## 🎯 Usage

1. Write or paste your code in the editor
2. Select your programming language
3. Click "Review Code" or press `Ctrl + Enter`
4. Get instant AI-powered feedback with:
   - Issues identified
   - Recommended fixes
   - Best practices
   - Performance optimizations

## 🌟 Features in Detail

### AI Review Engine
The AI is trained to review code like a senior developer with 7+ years of experience, focusing on:
- Code quality and maintainability
- Security vulnerabilities
- Performance optimizations
- Best practices and design patterns
- DRY and SOLID principles

### UI/UX Features
- **Loading States** - Beautiful animations while AI processes
- **Error Handling** - Clear error messages with retry suggestions
- **Empty States** - Helpful guides when starting
- **Responsive Design** - Works on desktop and tablets
- **Custom Scrollbars** - Polished look throughout
- **Status Indicators** - Live AI availability badge

## 🛠️ API Endpoints

### POST `/ai/get-review`
Review code with AI

**Request Body:**
```json
{
  "code": "function example() { return 1 + 1; }"
}
```

**Response:**
```json
"AI-generated markdown review with issues, fixes, and improvements"
```

## 📝 Project Structure

```
code-reviewer/
├── BackEnd/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── ai.controller.js
│   │   ├── routes/
│   │   │   └── ai.routes.js
│   │   ├── services/
│   │   │   └── ai.service.js
│   │   └── app.js
│   ├── server.js
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    └── package.json
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

Apache License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

Built by Aashish Jha

## 🙏 Acknowledgments

- Google Gemini AI for powering the code reviews
- React team for the amazing framework
- Prism.js for syntax highlighting
- The open-source community

---

⭐ Star this repo if you find it helpful!
