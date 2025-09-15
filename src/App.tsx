// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import BackToTop from './components/BackToTop'
import ErrorBoundary from './components/ErrorBoundary'
import HomePage from './pages/HomePage'
import ProjectDetailPage from './pages/ProjectDetailPage'

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="scroll-container bg-gray-900">
          <Header />
          {/* Header 占位元素，防止内容被遮挡 */}
          <div className="h-16 sm:h-20"></div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:id" element={<ProjectDetailPage />} />
          </Routes>
          <BackToTop />
        </div>
      </Router>
    </ErrorBoundary>
  )
}