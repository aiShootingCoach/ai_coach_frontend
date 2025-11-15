# AI Coach Frontend

A modern React-based frontend application for an AI-powered coaching platform. This application provides an interactive interface for users to receive personalized coaching and guidance.

## 🚀 Features

- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Interactive Tutorials**: Step-by-step guides and tutorials
- **Modern UI**: Built with Framer Motion for smooth animations and transitions
- **Routing**: Multi-page navigation using React Router
- **Component-Based Architecture**: Organized and maintainable codebase

## 🛠️ Technologies Used

- **React 19** - Frontend library
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **Lottie** - For lightweight, scalable animations
- **AJV** - JSON schema validation

## 📦 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or Yarn

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd ai_coach_frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Available Scripts

In the project directory, you can run:

- `npm start` - Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
- `npm test` - Launches the test runner in interactive watch mode.
- `npm run build` - Builds the app for production to the `build` folder.
- `npm run eject` - **Note: this is a one-way operation.** Ejects from Create React App configuration.

## 🏗️ Project Structure

```
src/
├── assets/           # Static assets (images, fonts, etc.)
├── components/       # Reusable UI components
│   ├── Navbar/       # Navigation bar component
│   ├── Home/         # Home page component
│   ├── Tutorial/     # Tutorial component
│   └── ...
├── styles/           # Global styles and CSS modules
├── App.js            # Main application component
└── index.js          # Application entry point
```

## 🌐 Deployment

### Building for Production

```bash
npm run build
```

This will create a production-ready build in the `build` folder.

### Docker Support

A `Dockerfile` is included for containerized deployment:

```bash
docker build -t ai-coach-frontend .
docker run -p 3000:80 ai-coach-frontend
```

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

For any questions or feedback, please contact [your-email@example.com](mailto:your-email@example.com)

