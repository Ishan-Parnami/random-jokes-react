# 🎭 JokesHub - FreeAPI Jokes Viewer

A modern, responsive React application that displays Chuck Norris jokes using the FreeAPI Random Jokes API. Built with React 19, TypeScript, Tailwind CSS, and Axios.

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)

## ✨ Features

- **🔍 Smart Search**: Search jokes by keywords (science, computer, ninja, etc.)
- **🎲 Random Jokes**: Get random jokes with a single click
- **#️⃣ Fetch by ID**: Look up specific jokes by their ID
- **📄 Pagination**: Browse through jokes with customizable results per page
- **🎨 Modern UI**: Clean, responsive design with Tailwind CSS
- **🌙 Dark Mode Ready**: Prepared for dark mode implementation
- **⚡ Fast Performance**: Built with Vite for lightning-fast development
- **♿ Accessible**: Keyboard navigation and screen reader friendly
- **📱 Responsive**: Works seamlessly on desktop, tablet, and mobile

## 🚀 Technologies Used

- **React 19**: Latest React with functional components and hooks
- **TypeScript**: Type-safe code for better development experience
- **Vite**: Next-generation frontend tooling for faster builds
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Axios**: Promise-based HTTP client for API requests
- **Lucide React**: Beautiful, consistent icons
- **FreeAPI**: Public API for Chuck Norris jokes

## 📁 Project Structure

```
src/
├── api/
│   ├── axios.config.ts      # Axios instance with interceptors
│   └── jokesService.ts      # API service functions
├── components/
│   ├── ErrorMessage.tsx     # Error display component
│   ├── Header.tsx           # App header with branding
│   ├── JokeCard.tsx         # Individual joke card
│   ├── JokeList.tsx         # Container for joke cards
│   └── Loader.tsx           # Loading spinner
├── hooks/
│   └── useJokes.ts          # Custom hook for jokes state management
├── types/
│   └── joke.types.ts        # TypeScript type definitions
├── App.tsx                  # Main application component
├── main.tsx                 # React entry point
└── index.css                # Global styles with Tailwind
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher recommended)
- Bun or npm/yarn package manager

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd jokes-viewer
```

### Step 2: Install Dependencies

Using Bun (recommended):
```bash
bun install
```

Or using npm:
```bash
npm install
```

### Step 3: Run the Development Server

Using Bun:
```bash
bun run dev
```

Or using npm:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Step 4: Build for Production

Using Bun:
```bash
bun run build
```

Or using npm:
```bash
npm run build
```

### Step 5: Preview Production Build

Using Bun:
```bash
bun run preview
```

Or using npm:
```bash
npm run preview
```

## 📚 API Endpoints Used

The application integrates with three FreeAPI endpoints:

### 1. Get List of Jokes (with filters)
```
GET https://api.freeapi.app/api/v1/public/randomjokes
```
**Query Parameters:**
- `limit`: Number of results (default: 10)
- `query`: Search keyword (e.g., "science", "computer")
- `page`: Page number for pagination
- `inc`: Fields to include (categories, id, content)

### 2. Get Joke by ID
```
GET https://api.freeapi.app/api/v1/public/randomjokes/:id
```

### 3. Get Random Joke
```
GET https://api.freeapi.app/api/v1/public/randomjokes/joke/random
```

## 🎯 Key Learning Concepts

### 1. **Service Layer Pattern**
The app uses a dedicated service layer (`jokesService.ts`) to separate API logic from UI components:
```typescript
class JokesService {
  async getJokes(params?: JokesQueryParams): Promise<PaginatedJokesResponse>
  async getJokeById(id: number): Promise<SingleJokeResponse>
  async getRandomJoke(): Promise<SingleJokeResponse>
}
```

### 2. **Custom React Hooks**
The `useJokes` hook encapsulates all jokes-related state and logic:
- Manages loading, error, and data states
- Provides methods for fetching jokes
- Handles pagination state
- Implements refresh functionality

### 3. **TypeScript Integration**
Strongly typed interfaces ensure type safety:
```typescript
interface Joke {
  id: number;
  content: string;
  categories: string[];
}
```

### 4. **Error Handling**
Graceful error handling with user-friendly messages and retry functionality.

### 5. **Component Composition**
Modular components that can be easily reused and tested:
- `JokeCard`: Displays individual jokes
- `JokeList`: Container that maps over jokes
- `Loader`: Reusable loading state
- `ErrorMessage`: Reusable error display

## 🎨 Customization

### Changing the Theme
Edit `tailwind.config.js` to customize colors, fonts, and other design tokens.

### Adding New Features
1. Create new components in `src/components/`
2. Add new API methods in `src/api/jokesService.ts`
3. Extend types in `src/types/joke.types.ts`
4. Update the `useJokes` hook if needed

## 🐛 Troubleshooting

### Issue: Port already in use
If port 5173 is occupied, Vite will automatically try the next available port. Check your terminal output for the actual port.

### Issue: API requests failing
- Check your internet connection
- Verify the FreeAPI service is operational
- Check browser console for CORS errors

### Issue: Tailwind styles not applying
- Ensure `tailwind.config.js` includes all content paths
- Verify `@tailwind` directives are in `index.css`
- Restart the development server

## 📝 Best Practices Implemented

✅ **Separation of Concerns**: API logic, state management, and UI are separated  
✅ **Type Safety**: TypeScript ensures compile-time error catching  
✅ **Error Boundaries**: Graceful error handling at component level  
✅ **Loading States**: User feedback during async operations  
✅ **Accessibility**: Semantic HTML and ARIA labels  
✅ **Code Reusability**: Custom hooks and modular components  
✅ **Clean Code**: Consistent formatting and naming conventions  

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [FreeAPI](https://api.freeapi.app) for providing the jokes API
- [Lucide](https://lucide.dev) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com) for the styling framework

---

Built with by Ishan Parnami | [GitHub](https://github.com/Ishan-Parnami) 