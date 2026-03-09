'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
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

const QUOTES = [
  'espresso o\'clock.',
  'brewing with ully.',
  'your beans, your data.',
  'shots pulled. insights ready.',
  'from crop to report.',
  'dialing in the perfect shift.',
  'where coffee meets clarity.',
  'grind size: optimal.',
]

function useRotatingQuote() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % QUOTES.length)
        setVisible(true)
      }, 400)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return { quote: QUOTES[idx], visible }
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user'
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: 16 }}>
      {!isUser && (
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          fontWeight: 700,
          color: '#C8923C',
          letterSpacing: '0.16em',
          marginRight: 10,
          marginTop: 4,
          flexShrink: 0,
        }}>
          U
        </div>
      )}
      <div style={{
        maxWidth: '72%',
        padding: '12px 16px',
        borderRadius: isUser ? '8px 8px 2px 8px' : '8px 8px 8px 2px',
        background: isUser ? 'rgba(200,146,60,0.10)' : '#1A1614',
        border: isUser ? '1px solid rgba(200,146,60,0.22)' : '1px solid #1E1A17',
        fontSize: 15,
        lineHeight: 1.75,
        color: isUser ? '#E8D8C0' : '#C4B8AA',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}>
        {msg.content || (
          <span style={{ color: '#4A4440', fontFamily: 'var(--font-mono)', fontSize: 12 }}>▊</span>
        )}
      </div>
    </div>
  )
}

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
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#6B5E52', letterSpacing: '0.06em' }}>
        {doc.fileType}
      </span>
      <button
        onClick={onRemove}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B5E52', padding: 0, lineHeight: 1, fontSize: 14, marginLeft: 2 }}
        title="Remove file"
      >
        ×
      </button>
    </div>
  )
}

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

  const { quote, visible } = useRotatingQuote()
  const firstName = userName.split(' ')[0]
  const hasMessages = messages.length > 0

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

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
      // Reset file input so same file can be re-uploaded
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }, [])

  async function sendMessage() {
    const text = input.trim()
    if ((!text && !uploadedDoc) || loading) return

    let content = text

    // Prepend document content to the message
    if (uploadedDoc) {
      const docContext = `I'm sharing a ${uploadedDoc.fileType} called "${uploadedDoc.filename}" for you to analyze:\n\n${uploadedDoc.content}`
      content = text ? `${docContext}\n\n${text}` : docContext
    }

    const newMessages: Message[] = [...messages, { role: 'user', content }]
    setMessages(newMessages)
    setInput('')
    setUploadedDoc(null)
    setLoading(true)

    // Resize textarea back
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          history: newMessages.slice(-20),
        }),
      })

      if (!res.ok || !res.body) {
        setMessages(prev => [
          ...prev.slice(0, -1),
          { role: 'assistant', content: 'Something went wrong. Please try again.' },
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
          { role: 'assistant', content: fullText },
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

  // ── Input bar (shared between welcome + chat mode) ──────────────────────────
  const inputBar = (
    <div style={{ width: '100%' }}>
      {/* Uploaded doc pill */}
      {uploadedDoc && (
        <DocPill doc={uploadedDoc} onRemove={() => setUploadedDoc(null)} />
      )}

      {/* Upload error */}
      {uploadError && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#E07070', letterSpacing: '0.08em', marginBottom: 6 }}>
          {uploadError}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.txt,.xlsx,.xls,.docx"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Input row */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          alignItems: 'flex-end',
          background: '#1A1614',
          border: '1px solid #1E1A17',
          borderRadius: 6,
          padding: '10px 12px',
          transition: 'border-color 0.15s',
        }}
        onFocus={() => {}}
      >
        {/* Attach button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          title="Attach spreadsheet or document (.csv, .xlsx, .docx, .txt)"
          style={{
            background: 'none',
            border: 'none',
            cursor: uploading ? 'wait' : 'pointer',
            color: uploading ? '#C8923C' : '#4A4440',
            padding: '2px 4px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            transition: 'color 0.15s',
            marginBottom: 2,
          }}
          onMouseEnter={e => { if (!uploading) (e.currentTarget as HTMLElement).style.color = '#C8923C' }}
          onMouseLeave={e => { if (!uploading) (e.currentTarget as HTMLElement).style.color = '#4A4440' }}
        >
          {uploading ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="28" strokeDashoffset="10" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.5 9.5v2.5a1 1 0 01-1 1h-9a1 1 0 01-1-1V9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M8 2v8M5.5 4.5L8 2l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
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
            flex: 1,
            background: 'none',
            border: 'none',
            outline: 'none',
            color: '#C4B8AA',
            fontSize: 15,
            lineHeight: 1.6,
            resize: 'none',
            maxHeight: 160,
            overflow: 'auto',
            fontFamily: 'inherit',
          }}
        />

        {/* Send button */}
        <button
          onClick={sendMessage}
          disabled={loading || (!input.trim() && !uploadedDoc)}
          style={{
            background: (loading || (!input.trim() && !uploadedDoc)) ? 'transparent' : '#C8923C',
            color: (loading || (!input.trim() && !uploadedDoc)) ? '#4A4440' : '#0E0C0A',
            border: (loading || (!input.trim() && !uploadedDoc)) ? '1px solid #1E1A17' : 'none',
            borderRadius: 4,
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: (loading || (!input.trim() && !uploadedDoc)) ? 'not-allowed' : 'pointer',
            flexShrink: 0,
            transition: 'all 0.15s',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 13L13 7L1 1V5.5L9 7L1 8.5V13Z" fill="currentColor" />
          </svg>
        </button>
      </div>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#2E2A26', letterSpacing: '0.1em', textAlign: 'center', marginTop: 8 }}>
        supports .csv · .xlsx · .xls · .docx · .txt
      </div>
    </div>
  )

  // ── Welcome state ───────────────────────────────────────────────────────────
  if (!hasMessages) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '40px 24px',
        background: `radial-gradient(ellipse 50% 40% at 50% 45%, rgba(200,146,60,0.05) 0%, transparent 70%)`,
      }}>
        {/* Wordmark */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 32,
          fontWeight: 700,
          color: '#C8923C',
          letterSpacing: '0.22em',
          textShadow: '0 0 16px rgba(200,146,60,0.5), 0 0 40px rgba(200,146,60,0.2)',
          marginBottom: 14,
        }}>
          ULLY
        </div>

        {/* Rotating quote */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: '#6B5E52',
          letterSpacing: '0.2em',
          textTransform: 'lowercase',
          marginBottom: 32,
          height: 18,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}>
          {quote}
        </div>

        {/* Personalized greeting */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          color: '#4A4440',
          letterSpacing: '0.14em',
          marginBottom: 28,
          textAlign: 'center',
        }}>
          how can I assist you today, {firstName}?
        </div>

        {/* Input bar — centered, constrained width */}
        <div style={{ width: '100%', maxWidth: 640 }}>
          {inputBar}
        </div>
      </div>
    )
  }

  // ── Chat mode ───────────────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Toolbar */}
      <div style={{ padding: '12px 24px', borderBottom: '1px solid #1E1A17', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C4B8AA' }}>
            Ully AI
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4A4440', marginLeft: 12, letterSpacing: '0.08em' }}>
            {orgName}
          </span>
        </div>
        <button
          onClick={() => setMessages([])}
          style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.12em', textTransform: 'uppercase', transition: 'color 0.15s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C4B8AA')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#4A4440')}
        >
          New chat
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 24px 8px' }}>
        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '12px 20px 16px', borderTop: '1px solid #1E1A17', flexShrink: 0 }}>
        {inputBar}
      </div>
    </div>
  )
}
