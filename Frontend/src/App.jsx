import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`)
  const [review, setReview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)
  const [language, setLanguage] = useState('javascript')

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    if (!code.trim()) {
      setError('Please enter some code to review')
      setTimeout(() => setError(null), 3000)
      return
    }

    setLoading(true)
    setError(null)
    setReview('')

    try {
      const response = await axios.post(`${API_URL}/ai/get-review`, { code })
      setReview(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to review code. Please try again.')
      console.error('Review error:', err)
    } finally {
      setLoading(false)
    }
  }

  function clearCode() {
    setCode('')
    setReview('')
    setError(null)
  }

  function copyReview() {
    navigator.clipboard.writeText(review)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleKeyPress(e) {
    if (e.ctrlKey && e.key === 'Enter') {
      reviewCode()
    }
  }

  const exampleSnippets = {
    javascript: `function sum() {
  return 1 + 1
}`,
    react: `function Counter() {
  let count = 0
  return <button onClick={() => count++}>
    {count}
  </button>
}`,
    async: `async function fetchData() {
  const data = fetch('/api/users')
  return data
}`
  }

  function loadExample(type) {
    setCode(exampleSnippets[type])
    setReview('')
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <h1>Code Reviewer AI</h1>
          </div>
          <div className="header-actions">
            <span className="status-badge">
              <span className="pulse"></span>
              AI Ready
            </span>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="editor-panel">
          <div className="panel-header">
            <div className="panel-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M8 3L4 7L8 11M16 3L20 7L16 11M12 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Code Editor
            </div>
            <div className="editor-controls">
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="language-select"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>
              <button onClick={clearCode} className="icon-btn" title="Clear code">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="example-chips">
            <button onClick={() => loadExample('javascript')} className="chip">Basic Function</button>
            <button onClick={() => loadExample('react')} className="chip">React Component</button>
            <button onClick={() => loadExample('async')} className="chip">Async Code</button>
          </div>

          <div className="code-editor" onKeyDown={handleKeyPress}>
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={code => prism.highlight(code, prism.languages[language] || prism.languages.javascript, language)}
              padding={20}
              className="editor-textarea"
              style={{
                fontFamily: '"Fira Code", "JetBrains Mono", "Cascadia Code", monospace',
                fontSize: 15,
                lineHeight: 1.6,
                caretColor: '#fff'
              }}
            />
          </div>

          <div className="action-bar">
            <button 
              onClick={reviewCode} 
              className="review-btn"
              disabled={loading || !code.trim()}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Analyzing...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor"/>
                  </svg>
                  Review Code
                </>
              )}
            </button>
            <span className="shortcut-hint">Ctrl + Enter</span>
          </div>
        </div>

        <div className="review-panel">
          <div className="panel-header">
            <div className="panel-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              AI Review
            </div>
            {review && (
              <button onClick={copyReview} className="icon-btn" title="Copy review">
                {copied ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
              </button>
            )}
          </div>

          <div className="review-content">
            {error && (
              <div className="error-message">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                {error}
              </div>
            )}

            {loading && (
              <div className="loading-state">
                <div className="loading-animation">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                <p>Analyzing your code with AI...</p>
              </div>
            )}

            {!loading && !error && !review && (
              <div className="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <h3>Ready to review your code</h3>
                <p>Write or paste your code in the editor and click Review to get instant AI-powered feedback</p>
              </div>
            )}

            {review && !loading && (
              <div className="markdown-content">
                <Markdown rehypePlugins={[rehypeHighlight]}>
                  {review}
                </Markdown>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
