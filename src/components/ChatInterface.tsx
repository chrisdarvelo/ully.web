'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatInterfaceProps {
  orgName: string
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user'
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 16,
      }}
    >
      {!isUser && (
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            fontWeight: 700,
            color: '#C8923C',
            letterSpacing: '0.16em',
            marginRight: 10,
            marginTop: 4,
            flexShrink: 0,
          }}
        >
          U
        </div>
      )}
      <div
        style={{
          maxWidth: '72%',
          padding: '12px 16px',
          borderRadius: isUser ? '8px 8px 2px 8px' : '8px 8px 8px 2px',
          background: isUser ? 'rgba(200,146,60,0.12)' : '#1A1614',
          border: isUser ? '1px solid rgba(200,146,60,0.25)' : '1px solid #1E1A17',
          fontSize: 14,
          lineHeight: 1.7,
          color: isUser ? '#E8D8C0' : '#C4B8AA',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {msg.content || (
          <span style={{ color: '#4A4440', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
            ▊
          </span>
        )}
      </div>
    </div>
  )
}

export default function ChatInterface({ orgName }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage() {
    const content = input.trim()
    if (!content || loading) return

    const newMessages: Message[] = [...messages, { role: 'user', content }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    // Add empty assistant message for streaming
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          history: newMessages.slice(-20), // last 20 messages for context
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

  function clearChat() {
    setMessages([])
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Toolbar */}
      <div style={{ padding: '12px 24px', borderBottom: '1px solid #1E1A17', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C4B8AA' }}>
            Ully AI
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4A4440', marginLeft: 12, letterSpacing: '0.08em' }}>
            {orgName}
          </span>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4A4440', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.12em', textTransform: 'uppercase' }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 24px 8px' }}>
        {messages.length === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 24 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 700, color: '#C8923C', letterSpacing: '0.2em', textShadow: '0 0 12px rgba(200,146,60,0.5)' }}>
              ULLY
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              your coffee business assistant
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 500 }}>
              {[
                'How do I reduce espresso channeling?',
                'What should I check after 500 shots on an espresso machine?',
                'Help me build a barista training checklist',
                'How do I calculate my coffee cost per cup?',
              ].map(prompt => (
                <button
                  key={prompt}
                  onClick={() => { setInput(prompt); textareaRef.current?.focus() }}
                  style={{
                    background: '#1A1614',
                    border: '1px solid #1E1A17',
                    borderRadius: 3,
                    padding: '8px 12px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    color: '#6B5E52',
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'border-color 0.15s, color 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C8923C'; (e.currentTarget as HTMLElement).style.color = '#C4B8AA' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#1E1A17'; (e.currentTarget as HTMLElement).style.color = '#6B5E52' }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: 16, borderTop: '1px solid #1E1A17', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 6, padding: '10px 12px', transition: 'border-color 0.15s' }}
          onFocus={() => {}} // handled below
        >
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
            placeholder="Ask Ully about your equipment, team, inventory, or any coffee business question..."
            rows={1}
            disabled={loading}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#C4B8AA',
              fontSize: 14,
              lineHeight: 1.6,
              resize: 'none',
              maxHeight: 160,
              overflow: 'auto',
            }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            style={{
              background: loading || !input.trim() ? 'transparent' : '#C8923C',
              color: loading || !input.trim() ? '#4A4440' : '#0E0C0A',
              border: loading || !input.trim() ? '1px solid #1E1A17' : 'none',
              borderRadius: 4,
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              flexShrink: 0,
              transition: 'all 0.15s',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 13L13 7L1 1V5.5L9 7L1 8.5V13Z" fill="currentColor" />
            </svg>
          </button>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#2A2218', letterSpacing: '0.1em', textAlign: 'center', marginTop: 8 }}>
          Enter to send · Shift+Enter for new line
        </div>
      </div>
    </div>
  )
}
