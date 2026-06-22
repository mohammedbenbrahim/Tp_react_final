TP React Hooks - Blog Application
Project Overview

This project is a blog application built with React.
It demonstrates the use of modern React concepts including Hooks, Custom Hooks, Context API, and performance optimization techniques.

The application uses the DummyJSON API to manage and display posts with features such as:

Post listing
Search functionality
Tag filtering
Infinite scroll
Post details view
Theme (light/dark) support
Installation and Setup
1. Clone the repository
git clone https://github.com/pr-daaif/tp-react-hooks-blog.git
cd tp-react-hooks-blog
2. Install dependencies
npm install
3. Run the application
npm start

The application will be available at:
http://localhost:3000

Project Structure
src/
│
├── components/
│   ├── PostList.js
│   ├── PostSearch.js
│   ├── PostDetails.js
│   ├── ThemeToggle.js
│   ├── LoadingSpinner.js
│
├── hooks/
│   ├── usePosts.js
│   ├── useDebounce.js
│   ├── useLocalStorage.js
│   ├── useIntersectionObserver.js
│
├── context/
│   ├── ThemeContext.js
│
├── App.js
├── App.css
└── index.js
Exercise 1: State and Effects
Implementation
Created a custom hook usePosts to fetch posts from the API
Implemented post listing using PostList
Added search functionality using PostSearch
Implemented API-based filtering
Concepts Used
useState
useEffect
API fetching
Exercise 2: Custom Hooks
Implementation
Created useDebounce to optimize search input
Created useLocalStorage to persist user preferences
Concepts Used
Custom Hooks
useEffect cleanup
localStorage
Exercise 3: Context and Optimization
Implementation
Created ThemeContext for global theme management
Implemented ThemeToggle component
Used useCallback and useMemo for performance optimization
Wrapped application with ThemeProvider
Concepts Used
Context API
useMemo
useCallback
React.memo
Exercise 4: Advanced Features
Implementation
Infinite scrolling using useIntersectionObserver
Post details view with PostDetails
Tag filtering functionality
Loading states for better UX
Concepts Used
IntersectionObserver API
Conditional rendering
Component communication
Features Summary
Fetch posts from API
Search posts by title or content
Filter posts by tags
Infinite scroll loading
Post details view
Light and dark theme
Persistent settings with localStorage
Performance optimization with memoization
Technologies Used
React
JavaScript (ES6+)
CSS / Bootstrap
DummyJSON API
React Hooks
Context API
API Reference

Base URL:
https://dummyjson.com/posts

Endpoints:

GET /posts
GET /posts/search?q=
GET /posts/tag/{tag}
GET /posts/{id}
Difficulties and Solutions
Handling API data structure

Solved by correctly accessing nested fields such as reactions.likes.

Infinite scroll performance

Solved using IntersectionObserver.

Search optimization

Solved using useDebounce to reduce unnecessary API calls.

Theme management

Solved using Context API combined with localStorage.

Git Workflow

Each exercise was committed separately:

git commit -m "Exercice 1 completed"
git commit -m "Exercice 2 completed"
git commit -m "Exercice 3 completed"
git commit -m "Exercice 4 completed"
Conclusion

This project demonstrates a complete React application using modern practices including hooks, context, API integration, and performance optimization.
