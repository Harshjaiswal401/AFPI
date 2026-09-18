import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, X, Send, Sparkles, Terminal, Shield, FileText, 
  TrendingUp, AlertTriangle, CheckCircle2, ChevronRight, CornerDownLeft, RefreshCw
} from 'lucide-react';
import { INDIAN_ROUTES } from '../../data/indianRoutes';
import { askAeroBot } from '../../services/aiService';

const OFFICER_NAME = "Harsh Jaiswal";
const OFFICER_ROLE = "Senior Director & Chief Aviation Intelligence Officer";

const QUICK_PROMPTS = [
  "Analyze DEL-PAT Chhath Puja fare surge",
  "Generate DGCA compliance report for IndiGo",
  "Check cryptographic integrity of recent scrapers",
  "Simulate 15% ATF tax reduction impact",
  "Show dark pattern & drip pricing violations on OTAs"
];

export const AeroBot = ({ onOpenNotice, onNavigate, onSelectRoute }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Jai Hind, Officer **${OFFICER_NAME}**.\n\nAeroBot AI Governance Node (v4.2-DGCA) active, powered by OpenRouter AI. I am continuously monitoring **15 national corridors** across 6 domestic carriers.\n\nHow may I assist your surveillance operations today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (userText) => {
    const query = userText || input;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    if (!userText) setInput('');
    setIsTyping(true);

    try {
      const botResponseText = await askAeroBot(query, messages);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: botResponseText
        }
      ]);
    } catch (err) {
      console.error("AeroBot inference error:", err);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: "⚠️ Telemetry connection interrupted. Reverting to DGCA local protocol cache."
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 hover:from-blue-600 hover:to-indigo-800 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/20"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <Bot className="w-5 h-5 text-sky-200 group-hover:rotate-12 transition-transform" />
            <div className="text-left">
              <div className="text-[11px] font-bold tracking-wide uppercase font-mono">AeroBot AI</div>
              <div className="text-[9px] text-slate-300">DGCA Sentinel Node</div>
            </div>
          </button>
        )}
      </div>

      {/* Slide-out Intelligence Assistant Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200" style={{ height: '580px' }}>
          {/* Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-600/30 border border-blue-400/30 text-sky-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider font-mono">AeroBot DGCA Intelligence</h3>
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">v4.2</span>
                </div>
                <p className="text-[10px] text-slate-300">MoCA Surveillance &amp; Regulatory Command Node</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-[10px] text-slate-600 font-medium transition-all shadow-2xs shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    AB
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs shadow-2xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs'
                  }`}
                >
                  <div className="whitespace-pre-line">
                    {m.text.split('**').map((part, i) => (i % 2 === 1 ? <strong key={i} className="font-bold">{part}</strong> : part))}
                  </div>
                  <div className={`text-[9px] mt-1 text-right font-mono ${m.sender === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                    {m.time}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs pl-9">
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </span>
                <span className="text-[10px] font-mono">Analyzing national telemetry stream...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask AeroBot (e.g., 'Check DEL-BOM surge velocity')..."
                className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl shadow-xs transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between mt-2 px-1 text-[9px] text-slate-400 font-mono">
              <span className="flex items-center gap-1"><Shield className="w-2.5 h-2.5 text-emerald-600" /> Authorized Officer Mode</span>
              <span>Encrypted SHA-256 Session</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
