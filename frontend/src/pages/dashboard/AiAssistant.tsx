import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, User, Send, Paperclip, FileText, Image as ImageIcon, 
  QrCode, Mail, Activity, CheckCircle2, Key, AlertTriangle, X
} from 'lucide-react';
import { FinGuardAgent } from '../../lib/gemini';

type Message = { id: string; role: 'user' | 'agent'; text: string };
type Trace = { id: string; title: string; desc: string; highlight?: boolean; status?: 'active' | 'done' | 'threat' };
type ChatSession = { id: string; title: string; date: string; messages: Message[] };

export const AiAssistant: React.FC = () => {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '');
  const [showKeyModal, setShowKeyModal] = useState(!import.meta.env.VITE_GEMINI_API_KEY);
  const [tempKey, setTempKey] = useState('');
  
  const [inputText, setInputText] = useState('');
  const [attachedFile, setAttachedFile] = useState<{file: File, base64: string, mimeType: string} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('finguard_ai_sessions');
    if (saved) return JSON.parse(saved);
    return [{ 
      id: Date.now().toString(), 
      title: 'New Chat', 
      date: 'Active', 
      messages: [{ id: '1', role: 'agent', text: 'Hello! I am FinGuard AI, powered by Google Gemini. How can I help you manage your finances today?' }] 
    }];
  });
  const [activeSessionId, setActiveSessionId] = useState<string>(sessions[0]?.id);
  
  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];
  const messages = activeSession.messages;

  const [traces, setTraces] = useState<Trace[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const chatRef = useRef<HTMLDivElement>(null);
  const agentRef = useRef<FinGuardAgent | null>(null);
  
  useEffect(() => {
    if (apiKey) {
      // Build history for SDK (excluding initial agent greeting if it's the first message, as API expects user to start)
      const apiHistory = messages.filter((m, i) => !(i === 0 && m.role === 'agent')).map(m => ({
        role: m.role === 'agent' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));
      
      agentRef.current = new FinGuardAgent(apiKey, (trace) => {
        setTraces(prev => {
          const existing = prev.find(t => t.id === trace.id);
          if (existing) {
            return prev.map(t => t.id === trace.id ? trace : t);
          }
          return [...prev, trace];
        });
      }, apiHistory);
    }
  }, [apiKey, activeSessionId]); // Re-init agent when switching sessions

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('finguard_ai_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, traces, isTyping]);

  const updateActiveSession = (newMessages: Message[], newTitle?: string) => {
    setSessions(prev => prev.map(s => {
      if (s.id === activeSessionId) {
        return { ...s, messages: newMessages, title: newTitle || s.title };
      }
      return s;
    }));
  };

  const handleSend = async () => {
    if (!inputText.trim() && !attachedFile) return;
    if (!apiKey) {
      setShowKeyModal(true);
      return;
    }
    
    const userMsg: Message = { 
      id: Date.now().toString(), 
      role: 'user', 
      text: inputText + (attachedFile ? `\n[Attached: ${attachedFile.file.name}]` : '')
    };
    const newMessages = [...messages, userMsg];
    
    // Auto-generate title for the session based on the first user message
    const newTitle = messages.length === 1 ? (inputText.slice(0, 20) || attachedFile?.file.name) + '...' : undefined;
    updateActiveSession(newMessages, newTitle);
    
    setInputText('');
    const fileToUpload = attachedFile ? { data: attachedFile.base64, mimeType: attachedFile.mimeType } : undefined;
    setAttachedFile(null);
    setIsTyping(true);
    setTraces([]);
    
    if (agentRef.current) {
      const responseText = await agentRef.current.sendMessage(userMsg.text, fileToUpload);
      updateActiveSession([...newMessages, { id: Date.now().toString(), role: 'agent', text: responseText }]);
    }
    
    setIsTyping(false);
  };

  const createNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      date: 'Active',
      messages: [{ id: '1', role: 'agent', text: 'Hello! I am FinGuard AI, powered by Google Gemini. How can I help you manage your finances today?' }]
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setTraces([]);
  };

  const handleAttachment = (type: string) => {
    if (fileInputRef.current) {
      if (type === 'PDF') fileInputRef.current.accept = 'application/pdf';
      else if (type === 'Image' || type === 'QR') fileInputRef.current.accept = 'image/*';
      else if (type === 'Email') fileInputRef.current.accept = '.eml,.txt,text/plain';
      else fileInputRef.current.accept = '*/*';
      
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        let mimeType = file.type;
        // Fallback for .eml or .txt if browser doesn't detect it
        if (!mimeType || file.name.endsWith('.eml') || file.name.endsWith('.txt')) {
          mimeType = 'text/plain';
        }
        setAttachedFile({ file, base64: base64String, mimeType });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveKey = () => {
    if (tempKey.trim()) {
      setApiKey(tempKey.trim());
      setShowKeyModal(false);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '24px', height: 'calc(100vh - 120px)' }}>
      
      {/* API Key Modal Overlay */}
      {showKeyModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card" style={{ width: '400px', padding: '24px', background: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Key color="var(--accent)" />
              <h2 style={{ margin: 0, fontSize: '18px' }}>Google Gemini API Key Required</h2>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--muted-dark)' }}>
              To connect the actual LLM engine, please provide your Gemini API key. This key is stored only in memory for this session.
            </p>
            <input 
              type="password" 
              placeholder="AIzaSy..." 
              value={tempKey}
              onChange={e => setTempKey(e.target.value)}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-raised)', outline: 'none' }}
            />
            <button 
              onClick={handleSaveKey}
              style={{ padding: '12px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
            >
              Connect LLM
            </button>
          </div>
        </div>
      )}

      {/* Left: Chat History */}
      <div className="card" style={{ width: '250px', display: 'flex', flexDirection: 'column', padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '14px', color: 'var(--muted-dark)', textTransform: 'uppercase', letterSpacing: '1px' }}>History</h3>
          <button onClick={createNewChat} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>+ New</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
          {sessions.map(s => (
            <HistoryItem 
              key={s.id} 
              title={s.title} 
              date={s.id === activeSessionId ? 'Active' : s.date} 
              active={s.id === activeSessionId} 
              onClick={() => setActiveSessionId(s.id)}
            />
          ))}
        </div>
      </div>

      {/* Middle: Chat Interface */}
      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        
        {/* Header */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface-raised)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--accent-dim))', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={18} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '16px', color: 'var(--text-dark)' }}>FinGuard Agent (Gemini)</h2>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--safe)', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={12} /> LLM Connected</p>
            </div>
          </div>
          <button onClick={() => setShowKeyModal(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-dark)' }}>
            <Key size={16} />
          </button>
        </div>

        {/* Chat Area */}
        <div ref={chatRef} style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {messages.map(msg => (
            <MessageBubble key={msg.id} role={msg.role} text={msg.text} />
          ))}

          {isTyping && <MessageBubble role="agent" text="Thinking... (Calling LLM)" isTyping />}

        </div>

        {/* Input Area */}
        <div style={{ padding: '16px', borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            style={{ display: 'none' }} 
            accept="image/*,application/pdf"
          />

          {attachedFile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'var(--surface-raised)', border: '1px solid var(--accent)', borderRadius: '8px', marginBottom: '12px', width: 'fit-content' }}>
              <FileText size={16} color="var(--accent)" />
              <span style={{ fontSize: '13px', color: 'var(--text-dark)' }}>{attachedFile.file.name}</span>
              <button onClick={() => setAttachedFile(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-dark)', display: 'flex' }}>
                <X size={14} />
              </button>
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <AttachmentBtn icon={<FileText size={16}/>} label="PDF" onClick={() => handleAttachment('PDF')} />
            <AttachmentBtn icon={<Mail size={16}/>} label="Email" onClick={() => handleAttachment('Email')} />
            <AttachmentBtn icon={<ImageIcon size={16}/>} label="Image" onClick={() => handleAttachment('Image')} />
            <AttachmentBtn icon={<QrCode size={16}/>} label="QR" onClick={() => handleAttachment('QR')} />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={() => handleAttachment('File')}
              style={{ padding: '12px', background: 'var(--surface-raised)', border: '1px solid var(--border-card)', borderRadius: '8px', color: 'var(--muted-dark)', cursor: 'pointer' }}
            >
              <Paperclip size={20} />
            </button>
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me to transfer money, analyze expenses, or scan a bill..." 
              style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-raised)', fontSize: '15px', color: 'var(--text-dark)', outline: 'none' }}
            />
            <button onClick={handleSend} style={{ padding: '0 20px', background: 'var(--accent)', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Right: Agent Activity */}
      <div className="card" style={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={18} color="var(--accent)" />
          <h3 style={{ margin: 0, fontSize: '14px', color: 'var(--text-dark)' }}>Live LLM Trace</h3>
        </div>
        
        <div style={{ flex: 1, padding: '24px 16px', overflowY: 'auto' }}>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {traces.length > 0 && <div style={{ position: 'absolute', left: '11px', top: '12px', bottom: '12px', width: '2px', background: 'var(--border)' }}></div>}
            
            {traces.map((trace, i) => (
              <TraceStep key={trace.id + i} title={trace.title} desc={trace.desc} highlight={trace.highlight} status={trace.status} />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

const MessageBubble = ({ role, text, isTyping }: { role: 'user' | 'agent', text: string, isTyping?: boolean }) => {
  const isUser = role === 'user';
  return (
    <div className="rise" style={{ display: 'flex', gap: '12px', flexDirection: isUser ? 'row-reverse' : 'row', alignItems: 'flex-start' }}>
      <div style={{ 
        width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
        background: isUser ? 'var(--surface-raised)' : 'linear-gradient(135deg, var(--accent), var(--accent-dim))', 
        color: isUser ? 'var(--text-dark)' : '#fff', 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: isUser ? '1px solid var(--border-card)' : 'none'
      }}>
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>
      <div style={{ 
        background: isUser ? 'var(--accent)' : 'var(--surface-raised)',
        color: isUser ? '#fff' : 'var(--text-dark)',
        padding: '12px 16px', borderRadius: '12px',
        borderTopRightRadius: isUser ? 0 : '12px',
        borderTopLeftRadius: isUser ? '12px' : 0,
        fontSize: '14px', lineHeight: 1.5, maxWidth: '80%',
        border: isUser ? 'none' : '1px solid var(--border-card)'
      }}>
        {isTyping ? <span style={{ opacity: 0.7 }}>{text}</span> : text}
      </div>
    </div>
  );
};

const HistoryItem = ({ title, date, active, onClick }: { title: string, date: string, active?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '12px', 
      background: active ? 'rgba(29, 78, 216, 0.08)' : 'transparent', border: 'none', 
      borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s', width: '100%',
      borderLeft: active ? '3px solid var(--accent)' : '3px solid transparent'
    }}>
    <span style={{ fontSize: '14px', fontWeight: 500, color: active ? 'var(--text-dark)' : 'var(--muted-dark)', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>{title}</span>
    <span style={{ fontSize: '11px', color: 'var(--muted-dark)', marginTop: '4px' }}>{date}</span>
  </button>
);

const AttachmentBtn = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    style={{ 
      display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', 
      background: 'var(--surface-raised)', border: '1px solid var(--border-card)', 
      borderRadius: '99px', fontSize: '12px', color: 'var(--text-dark)', cursor: 'pointer',
      transition: 'all 0.2s'
    }}>
    {icon} {label}
  </button>
);

const TraceStep = ({ title, desc, highlight, status }: { title: string, desc: string, highlight?: boolean, status?: 'active' | 'done' | 'threat' }) => {
  const getColor = () => {
    if (status === 'threat') return 'var(--threat)';
    if (highlight) return 'var(--safe)';
    if (status === 'active') return 'var(--accent)';
    return 'var(--muted-dark)';
  };
  
  const getBg = () => {
    if (status === 'threat') return 'var(--threat)';
    if (highlight) return 'var(--safe)';
    if (status === 'active') return 'var(--accent)';
    return 'var(--border-card)';
  };

  return (
    <div className="rise" style={{ position: 'relative', paddingLeft: '24px' }}>
      <div style={{ 
        position: 'absolute', left: '-1px', top: '4px', width: '12px', height: '12px', borderRadius: '50%',
        background: getBg(),
        transform: 'translateX(-50%)', zIndex: 1,
        boxShadow: (highlight || status === 'threat') ? `0 0 8px ${getBg()}` : 'none'
      }}></div>
      <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: getColor() }}>{title}</h4>
      <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--muted-dark)' }}>{desc}</p>
    </div>
  );
};
