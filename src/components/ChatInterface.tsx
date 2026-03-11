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

interface ChatInterfaceProps {
  orgName: string
  userName: string
}

// ── Session quotes ────────────────────────────────────────────────────────────
// One quote per session — picked randomly on mount, stays static.

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

// ── Message bubble ────────────────────────────────────────────────────────────

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
      {/* Ully avatar / thinking flower */}
      {!isUser && (
        <div style={{ flexShrink: 0, marginTop: 2 }}>
          {msg.thinking ? (
            <div className="ully-spin">
              <FlowerIcon size={22} glow />
            </div>
          ) : (
            <FlowerIcon size={22} glow />
          )}
        </div>
      )}

      <div style={{
        maxWidth: '72%',
        padding: msg.thinking ? '14px 18px' : '12px 16px',
        borderRadius: isUser ? '12px 12px 3px 12px' : '3px 12px 12px 12px',
        background: isUser
          ? 'rgba(200,146,60,0.10)'
          : '#1A1614',
        border: isUser
          ? '1px solid rgba(200,146,60,0.22)'
          : '1px solid #1E1A17',
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
                background: '#C8923C',
                opacity: 0.4,
                animation: `ully-spin 1.2s ease-in-out ${i * 0.2}s infinite alternate`,
              }} />
            ))}
          </div>
        ) : (
          msg.content || null
        )}
      </div>

      {/* User badge */}
      {isUser && (
        <div style={{
          flexShrink: 0,
          marginTop: 2,
          width: 22, height: 22,
          borderRadius: '50%',
          background: 'rgba(200,146,60,0.15)',
          border: '1px solid rgba(200,146,60,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          color: '#C8923C',
          letterSpacing: '0.05em',
          fontWeight: 700,
        }}>
          ME
        </div>
      )}
    </div>
  )
}

// ── Doc pill ──────────────────────────────────────────────────────────────────

function DocPill({ doc, onRemove }: { doc: UploadedDoc; onRemove: () => void }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: 'rgba(200,146,60,0.08)',
      border: '1px solid rgba(200,146,60,0.25)',
      borderRadius: 3,
      padding: '6px 12px',
      marginBottom: 8,
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
      <button
        onClick={onRemove}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B5E52', padding: 0, fontSize: 16, lineHeight: 1, marginLeft: 2 }}
      >
        ×
      </button>
    </div>
  )
}

// ── Input bar ────────────────────────────────────────────────────────────────
// Must be top-level (not nested inside ChatInterface) to preserve textarea focus across re-renders.

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

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.txt,.xlsx,.xls,.docx"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <div
        style={{
          display: 'flex',
          gap: 8,
          alignItems: 'flex-end',
          background: '#1A1614',
          border: '1px solid #1E1A17',
          borderRadius: 8,
          padding: '10px 12px',
          transition: 'border-color 0.15s',
        }}
      >
        {/* Attach */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          title="Attach spreadsheet or document"
          style={{
            background: 'none', border: 'none',
            cursor: uploading ? 'wait' : 'pointer',
            color: uploading ? '#C8923C' : '#4A4440',
            padding: '2px 4px', flexShrink: 0,
            display: 'flex', alignItems: 'center',
            transition: 'color 0.15s', marginBottom: 2,
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

        {/* Send */}
        <button
          onClick={sendMessage}
          disabled={!canSend}
          style={{
            background: canSend ? '#C8923C' : 'transparent',
            color: canSend ? '#0E0C0A' : '#4A4440',
            border: canSend ? 'none' : '1px solid #1E1A17',
            borderRadius: 6,
            width: 34, height: 34,
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
        fontFamily: 'var(--font-mono)', fontSize: 9, color: '#2A2218',
        letterSpacing: '0.1em', textAlign: 'center', marginTop: 7,
      }}>
        supports .csv · .xlsx · .xls · .docx · .txt
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

  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const quote = useSessionQuote()
  const firstName = userName?.split(' ')[0] ?? 'there'
  const hasMessages = messages.length > 0

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // ── File upload ─────────────────────────────────────────────────────────────

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

      if (!res.ok) {
        setUploadError(data.error ?? 'Upload failed')
        return
      }
      setUploadedDoc(data)
      textareaRef.current?.focus()
    } catch {
      setUploadError('Upload failed. Try again.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }, [])

  // ── Send message ────────────────────────────────────────────────────────────

  async function sendMessage() {
    const text = input.trim()
    if ((!text && !uploadedDoc) || loading) return

    let content = text
    if (uploadedDoc) {
      const docContext = `I'm sharing a ${uploadedDoc.fileType} called "${uploadedDoc.filename}" for you to analyze:\n\n${uploadedDoc.content}`
      content = text ? `${docContext}\n\n${text}` : docContext
    }

    // ⚠️ Capture history BEFORE adding current message — avoids duplicate in Claude API
    const historyForAPI = messages
      .filter(m => !m.thinking)
      .slice(-20)

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
        body: JSON.stringify({
          message: content,
          history: historyForAPI,
        }),
      })

      if (!res.ok || !res.body) {
        const err = await res.text().catch(() => 'Unknown error')
        setMessages(prev => [
          ...prev.slice(0, -1),
          { role: 'assistant', content: `Something went wrong. ${err}` },
        ])
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        fullText += decoder.decode(value, { stream: true })
        setMessages(prev => [
          ...prev.slice(0, -1),
          { role: 'assistant', content: fullText, thinking: false },
        ])
      }

      // Safety: if stream closes with no content
      if (!fullText) {
        setMessages(prev => [
          ...prev.slice(0, -1),
          { role: 'assistant', content: 'No response received. Please try again.' },
        ])
      }
    } catch {
      setMessages(prev => [
        ...prev.slice(0, -1),
        { role: 'assistant', content: 'Connection error. Check your network and try again.' },
      ])
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

  // ── Welcome state ───────────────────────────────────────────────────────────

  if (!hasMessages) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        height: '100vh', padding: '40px 24px',
        background: `radial-gradient(ellipse 50% 40% at 50% 45%, rgba(200,146,60,0.05) 0%, transparent 70%)`,
      }}>
        {/* Flower + wordmark */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <FlowerIcon size={52} glow />
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 31, fontWeight: 700,
            color: '#C8923C', letterSpacing: '0.24em',
            textShadow: '0 0 20px rgba(200,146,60,0.6), 0 0 48px rgba(200,146,60,0.25)',
          }}>
            ULLY
          </div>
        </div>

        {/* Session quote */}
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 13, color: '#8B7B6E',
          letterSpacing: '0.2em', textTransform: 'lowercase',
          marginBottom: 10,
        }}>
          {quote}
        </div>

        {/* Personalized greeting */}
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 14, color: '#6B5E52',
          letterSpacing: '0.14em', marginBottom: 36, textAlign: 'center',
        }}>
          how can I assist you today, {firstName}?
        </div>

        {/* Centered input */}
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

  // ── Chat view ───────────────────────────────────────────────────────────────

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <div style={{
        padding: '12px 24px', borderBottom: '1px solid #1E1A17',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0, background: 'rgba(8,6,4,0.95)', backdropFilter: 'blur(8px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <FlowerIcon size={20} glow />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C4B8AA' }}>
            Ully
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#3A3228', letterSpacing: '0.08em' }}>
            {orgName}
          </span>
        </div>
        <button
          onClick={() => setMessages([])}
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
        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} />
        ))}
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
