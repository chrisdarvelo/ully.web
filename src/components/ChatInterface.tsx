'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import FlowerIcon from './FlowerIcon'

interface Message {
  role: 'user' | 'assistant'
  content: string
  thinking?: boolean
}

interface UploadedDoc {
  filename: string
  fileType: string
  content: string
}

interface SessionSummary {
  id: string
  title: string
  createdAt: number
  updatedAt: number
}

interface ChatInterfaceProps {
  orgName: string
  userName: string
}

const QUOTES = [
  "espresso o'clock.",
  'brewing with ully.',
  'your beans, your data.',
  'shots pulled. insights ready.',
  'from crop to report.',
  'dialing in the perfect shift.',
  'where coffee meets clarity.',
  'grind size: optimal.',
]

function useSessionQuote() {
  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)])
  return quote
}

function relativeTime(ts: number): string {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user'
  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      alignItems: 'flex-start',
      marginBottom: 20,
      gap: 10,
    }}>
      {!isUser && (
        <div style={{ flexShrink: 0, marginTop: 2 }}>
          {msg.thinking ? (
            <div className="ully-spin"><FlowerIcon size={22} glow /></div>
          ) : (
            <FlowerIcon size={22} glow />
          )}
        </div>
      )}
      <div style={{
        maxWidth: '72%',
        padding: msg.thinking ? '14px 18px' : '12px 16px',
        borderRadius: isUser ? '12px 12px 3px 12px' : '3px 12px 12px 12px',
        background: isUser ? 'rgba(200,146,60,0.10)' : '#1A1614',
        border: isUser ? '1px solid rgba(200,146,60,0.22)' : '1px solid #1E1A17',
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        lineHeight: 1.8,
        color: isUser ? '#E8D8C0' : '#C4B8AA',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}>
        {msg.thinking ? (
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 5, height: 5, borderRadius: '50%',
                background: '#C8923C', opacity: 0.4,
                animation: `ully-spin 1.2s ease-in-out ${i * 0.2}s infinite alternate`,
              }} />
            ))}
          </div>
        ) : (
          msg.content || null
        )}
      </div>
      {isUser && (
        <div style={{
          flexShrink: 0, marginTop: 2,
          width: 22, height: 22, borderRadius: '50%',
          background: 'rgba(200,146,60,0.15)',
          border: '1px solid rgba(200,146,60,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 9, color: '#C8923C',
          letterSpacing: '0.05em', fontWeight: 700,
        }}>
          ME
        </div>
      )}
    </div>
  )
}

function DocPill({ doc, onRemove }: { doc: UploadedDoc; onRemove: () => void }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: 'rgba(200,146,60,0.08)', border: '1px solid rgba(200,146,60,0.25)',
      borderRadius: 3, padding: '6px 12px', marginBottom: 8,
    }}>
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
        <rect x="2" y="1" width="8" height="11" rx="1" stroke="#C8923C" strokeWidth="1.2" opacity="0.7" />
        <path d="M4 4.5h6M4 7h4" stroke="#C8923C" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      </svg>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C8923C', letterSpacing: '0.08em' }}>
        {doc.filename}
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#6B5E52' }}>
        {doc.fileType}
      </span>
      <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B5E52', padding: 0, fontSize: 16, lineHeight: 1, marginLeft: 2 }}>×</button>
    </div>
  )
}

interface InputBarProps {
  input: string
  setInput: (v: string) => void
  loading: boolean
  uploading: boolean
  uploadError: string
  uploadedDoc: UploadedDoc | null
  setUploadedDoc: (v: UploadedDoc | null) => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  sendMessage: () => void
}

function InputBar({
  input, setInput, loading, uploading, uploadError,
  uploadedDoc, setUploadedDoc, fileInputRef, textareaRef,
  handleFileChange, handleKeyDown, sendMessage,
}: InputBarProps) {
  const canSend = (input.trim() || uploadedDoc) && !loading
  return (
    <div style={{ width: '100%' }}>
      {uploadedDoc && <DocPill doc={uploadedDoc} onRemove={() => setUploadedDoc(null)} />}
      {uploadError && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#E07070', marginBottom: 6 }}>
          {uploadError}
        </div>
      )}
      <input ref={fileInputRef} type="file" accept=".csv,.txt,.xlsx,.xls,.docx" onChange={handleFileChange} style={{ display: 'none' }} />
      <div style={{
        display: 'flex', gap: 8, alignItems: 'flex-end',
        background: '#1A1614', border: '1px solid #1E1A17',
        borderRadius: 8, padding: '10px 12px', transition: 'border-color 0.15s',
      }}>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          title="Attach spreadsheet or document"
          style={{
            background: 'none', border: 'none', cursor: uploading ? 'wait' : 'pointer',
            color: uploading ? '#C8923C' : '#4A4440', padding: '2px 4px', flexShrink: 0,
            display: 'flex', alignItems: 'center', transition: 'color 0.15s', marginBottom: 2,
          }}
          onMouseEnter={e => { if (!uploading) (e.currentTarget as HTMLElement).style.color = '#C8923C' }}
          onMouseLeave={e => { if (!uploading) (e.currentTarget as HTMLElement).style.color = '#4A4440' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13.5 9.5v2.5a1 1 0 01-1 1h-9a1 1 0 01-1-1V9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M8 2v8M5.5 4.5L8 2l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => {
            setInput(e.target.value)
            e.target.style.height = 'auto'
            e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px'
          }}
          onKeyDown={handleKeyDown}
          onFocus={e => (e.currentTarget.parentElement!.style.borderColor = '#C8923C')}
          onBlur={e => (e.currentTarget.parentElement!.style.borderColor = '#1E1A17')}
          placeholder={uploadedDoc ? 'Ask anything about this document…' : 'How can I help you?'}
          rows={1}
          disabled={loading}
          style={{
            flex: 1, background: 'none', border: 'none', outline: 'none',
            color: '#C4B8AA', fontSize: 13, lineHeight: 1.6,
            resize: 'none', maxHeight: 160, overflow: 'auto',
            fontFamily: 'var(--font-mono)',
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!canSend}
          style={{
            background: canSend ? '#C8923C' : 'transparent',
            color: canSend ? '#0E0C0A' : '#4A4440',
            border: canSend ? 'none' : '1px solid #1E1A17',
            borderRadius: 6, width: 34, height: 34,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: canSend ? 'pointer' : 'not-allowed',
            flexShrink: 0, transition: 'all 0.15s',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 13L13 7L1 1V5.5L9 7L1 8.5V13Z" fill="currentColor" />
          </svg>
        </button>
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6B5E52',
        letterSpacing: '0.1em', textAlign: 'center', marginTop: 7,
      }}>
        supports .csv · .xlsx · .xls · .docx · .txt
      </div>
    </div>
  )
}

// ── History sidebar ────────────────────────────────────────────────────────────

interface HistoryPanelProps {
  sessions: SessionSummary[]
  loading: boolean
  activeSessionId: string | null
  onLoad: (id: string) => void
  onDelete: (id: string) => void
  onClose: () => void
}

function HistoryPanel({ sessions, loading, activeSessionId, onLoad, onDelete, onClose }: HistoryPanelProps) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, bottom: 0,
      width: 280, background: '#0A0806',
      borderRight: '1px solid #1E1A17',
      display: 'flex', flexDirection: 'column',
      zIndex: 10,
    }}>
      <div style={{
        padding: '14px 16px', borderBottom: '1px solid #1E1A17',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0,
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C4B8AA', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
          Chat History
        </span>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4A4440', padding: 4, display: 'flex', alignItems: 'center' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C4B8AA')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#4A4440')}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {loading && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4A4440', textAlign: 'center', padding: '20px 0' }}>
            loading...
          </div>
        )}
        {!loading && sessions.length === 0 && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#3A3228', textAlign: 'center', padding: '20px 16px', lineHeight: 1.8 }}>
            no saved chats yet.<br />start a conversation and click<br />&ldquo;new chat&rdquo; to save it.
          </div>
        )}
        {sessions.map(s => (
          <div
            key={s.id}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 16px', cursor: 'pointer',
              background: activeSessionId === s.id ? 'rgba(200,146,60,0.06)' : 'transparent',
              borderLeft: activeSessionId === s.id ? '2px solid #C8923C' : '2px solid transparent',
              transition: 'background 0.1s',
            }}
            onMouseEnter={e => {
              if (activeSessionId !== s.id) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'
            }}
            onMouseLeave={e => {
              if (activeSessionId !== s.id) (e.currentTarget as HTMLElement).style.background = 'transparent'
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }} onClick={() => onLoad(s.id)}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 12, color: '#C4B8AA',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                lineHeight: 1.5,
              }}>
                {s.title}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#3A3228', marginTop: 2 }}>
                {relativeTime(s.updatedAt)}
              </div>
            </div>
            <button
              onClick={e => { e.stopPropagation(); onDelete(s.id) }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2A2218', padding: '2px 4px', flexShrink: 0, display: 'flex', alignItems: 'center', transition: 'color 0.15s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#E07070')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#2A2218')}
              title="Delete"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 3h8M5 3V2h2v1M4 3v6h4V3H4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ChatInterface({ orgName, userName }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploadedDoc, setUploadedDoc] = useState<UploadedDoc | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const [showHistory, setShowHistory] = useState(false)
  const [sessions, setSessions] = useState<SessionSummary[]>([])
  const [loadingHistory, setLoadingHistory] = useState(false)
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)

  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const quote = useSessionQuote()
  const firstName = userName?.split(' ')[0] ?? 'there'
  const hasMessages = messages.length > 0
  const storageKey = `ully_active_chat_${orgName}`

  // ── Restore active chat from sessionStorage on mount ─────────────────────

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.messages?.length > 0) {
          setMessages(parsed.messages)
          if (parsed.sessionId) setActiveSessionId(parsed.sessionId)
        }
      }
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Persist active chat to sessionStorage on change ──────────────────────

  useEffect(() => {
    const clean = messages.filter(m => !m.thinking)
    if (clean.length > 0) {
      try {
        sessionStorage.setItem(storageKey, JSON.stringify({ messages: clean, sessionId: activeSessionId }))
      } catch {}
    } else {
      sessionStorage.removeItem(storageKey)
    }
  }, [messages, activeSessionId, storageKey])

  // ── Debounced DB save for active session ─────────────────────────────────

  useEffect(() => {
    const clean = messages.filter(m => !m.thinking)
    if (!activeSessionId || clean.length < 2) return

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    saveTimeoutRef.current = setTimeout(() => {
      fetch(`/api/chat/sessions/${activeSessionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: clean.find(m => m.role === 'user')?.content.slice(0, 80) ?? 'Chat',
          messages: clean,
        }),
      }).catch(() => {})
    }, 2000)

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    }
  }, [messages, activeSessionId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // ── History ──────────────────────────────────────────────────────────────

  const loadHistory = useCallback(async () => {
    setLoadingHistory(true)
    try {
      const res = await fetch('/api/chat/sessions')
      if (res.ok) setSessions(await res.json())
    } catch {}
    finally { setLoadingHistory(false) }
  }, [])

  const handleToggleHistory = useCallback(() => {
    setShowHistory(prev => {
      if (!prev) loadHistory()
      return !prev
    })
  }, [loadHistory])

  const handleLoadSession = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/chat/sessions/${id}`)
      if (!res.ok) return
      const data = await res.json()
      setMessages(data.messages)
      setActiveSessionId(data.id)
      setShowHistory(false)
    } catch {}
  }, [])

  const handleDeleteSession = useCallback(async (id: string) => {
    await fetch('/api/chat/sessions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setSessions(prev => prev.filter(s => s.id !== id))
    if (activeSessionId === id) {
      setActiveSessionId(null)
    }
  }, [activeSessionId])

  // ── New chat ─────────────────────────────────────────────────────────────

  const handleNewChat = useCallback(async () => {
    const clean = messages.filter(m => !m.thinking)

    // Save if this is a new conversation with content (no activeSessionId yet)
    if (clean.length >= 2 && !activeSessionId) {
      const title = clean.find(m => m.role === 'user')?.content.slice(0, 80) ?? 'Chat'
      await fetch('/api/chat/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, messages: clean }),
      }).catch(() => {})
    }

    sessionStorage.removeItem(storageKey)
    setMessages([])
    setActiveSessionId(null)
    setInput('')
    setUploadedDoc(null)
  }, [messages, activeSessionId, storageKey])

  // ── File upload ──────────────────────────────────────────────────────────

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadError('')
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/chat/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) { setUploadError(data.error ?? 'Upload failed'); return }
      setUploadedDoc(data)
      textareaRef.current?.focus()
    } catch {
      setUploadError('Upload failed. Try again.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }, [])

  // ── Send message ─────────────────────────────────────────────────────────

  async function sendMessage() {
    const text = input.trim()
    if ((!text && !uploadedDoc) || loading) return

    let content = text
    if (uploadedDoc) {
      const docContext = `I'm sharing a ${uploadedDoc.fileType} called "${uploadedDoc.filename}" for you to analyze:\n\n${uploadedDoc.content}`
      content = text ? `${docContext}\n\n${text}` : docContext
    }

    const historyForAPI = messages.filter(m => !m.thinking).slice(-20)

    setMessages(prev => [
      ...prev,
      { role: 'user', content },
      { role: 'assistant', content: '', thinking: true },
    ])
    setInput('')
    setUploadedDoc(null)
    setLoading(true)
    if (textareaRef.current) textareaRef.current.style.height = 'auto'

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, history: historyForAPI }),
      })

      if (!res.ok || !res.body) {
        const err = await res.text().catch(() => 'Unknown error')
        setMessages(prev => [...prev.slice(0, -1), { role: 'assistant', content: `Something went wrong. ${err}` }])
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        fullText += decoder.decode(value, { stream: true })
        setMessages(prev => [...prev.slice(0, -1), { role: 'assistant', content: fullText, thinking: false }])
      }

      if (!fullText) {
        setMessages(prev => [...prev.slice(0, -1), { role: 'assistant', content: 'No response received. Please try again.' }])
      }
    } catch {
      setMessages(prev => [...prev.slice(0, -1), { role: 'assistant', content: 'Connection error. Check your network and try again.' }])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // ── Welcome state ────────────────────────────────────────────────────────

  if (!hasMessages) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        height: '100vh', padding: '40px 24px', position: 'relative',
        background: `radial-gradient(ellipse 50% 40% at 50% 45%, rgba(200,146,60,0.05) 0%, transparent 70%)`,
      }}>
        {/* History toggle */}
        <div style={{ position: 'absolute', top: 16, left: 16 }}>
          <button
            onClick={handleToggleHistory}
            title="Chat history"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#3A3228', padding: 8, display: 'flex', alignItems: 'center',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C8923C')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#3A3228')}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M9 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {showHistory && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 10 }} onClick={() => setShowHistory(false)}>
            <div onClick={e => e.stopPropagation()}>
              <HistoryPanel
                sessions={sessions}
                loading={loadingHistory}
                activeSessionId={activeSessionId}
                onLoad={handleLoadSession}
                onDelete={handleDeleteSession}
                onClose={() => setShowHistory(false)}
              />
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <FlowerIcon size={52} glow />
          <div style={{
            fontFamily: 'var(--font-pixel-family)', fontSize: 28, fontWeight: 700,
            color: '#C8923C', letterSpacing: '0.18em',
            textShadow: '0 0 20px rgba(200,146,60,0.6), 0 0 48px rgba(200,146,60,0.25)',
          }}>
            ULLY
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#8B7B6E', letterSpacing: '0.2em', textTransform: 'lowercase', marginBottom: 10 }}>
          {quote}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: '#6B5E52', letterSpacing: '0.14em', marginBottom: 36, textAlign: 'center' }}>
          how can I assist you today, {firstName}?
        </div>
        <div style={{ width: '100%', maxWidth: 640 }}>
          <InputBar
            input={input} setInput={setInput} loading={loading}
            uploading={uploading} uploadError={uploadError}
            uploadedDoc={uploadedDoc} setUploadedDoc={setUploadedDoc}
            fileInputRef={fileInputRef} textareaRef={textareaRef}
            handleFileChange={handleFileChange} handleKeyDown={handleKeyDown}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    )
  }

  // ── Chat view ────────────────────────────────────────────────────────────

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative' }}>
      {showHistory && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }} onClick={() => setShowHistory(false)}>
          <div onClick={e => e.stopPropagation()}>
            <HistoryPanel
              sessions={sessions}
              loading={loadingHistory}
              activeSessionId={activeSessionId}
              onLoad={handleLoadSession}
              onDelete={handleDeleteSession}
              onClose={() => setShowHistory(false)}
            />
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{
        padding: '12px 24px', borderBottom: '1px solid #1E1A17',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0, background: 'rgba(8,6,4,0.95)', backdropFilter: 'blur(8px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* History toggle */}
          <button
            onClick={handleToggleHistory}
            title="Chat history"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: showHistory ? '#C8923C' : '#3A3228',
              padding: '2px 4px', display: 'flex', alignItems: 'center',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C8923C')}
            onMouseLeave={e => { if (!showHistory) (e.currentTarget as HTMLElement).style.color = '#3A3228' }}
          >
            <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M9 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <FlowerIcon size={20} glow />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C4B8AA' }}>
            Ully
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#3A3228', letterSpacing: '0.08em' }}>
            {orgName}
          </span>
        </div>
        <button
          onClick={handleNewChat}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440',
            background: 'none', border: 'none', cursor: 'pointer',
            letterSpacing: '0.12em', textTransform: 'uppercase', transition: 'color 0.15s',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C4B8AA')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#4A4440')}
        >
          New chat
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 24px 12px' }}>
        {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '12px 20px 16px', borderTop: '1px solid #1E1A17', flexShrink: 0 }}>
        <InputBar
          input={input} setInput={setInput} loading={loading}
          uploading={uploading} uploadError={uploadError}
          uploadedDoc={uploadedDoc} setUploadedDoc={setUploadedDoc}
          fileInputRef={fileInputRef} textareaRef={textareaRef}
          handleFileChange={handleFileChange} handleKeyDown={handleKeyDown}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  )
}
