import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, X, Sparkles, Flame, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Namaskara! Welcome to Shivaji Military Hotel. Ask me anything about our menu, timings, or location. Want to know what to order? 🍖" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim() || isTyping) return;

    const userText = query.trim();
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setQuery('');
    setIsTyping(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: `You are the digital guide for Shivaji Military Hotel in Bengaluru. 
            Context:
            - Established: 1935 by S. Mannaji Rao.
            - Cuisine: Karnataka-style non-vegetarian (Maratha influence).
            - Famous for: Mutton Donne Biryani (Seeraga Samba rice), Leg Soup (Paya), Mutton Chops, Liver Fry, Chicken Kebab.
            - Timings: Tue-Sun, 8:30 AM - 3:30 PM. CLOSED ON MONDAYS.
            - Location: Jayanagar 8th Block, Bengaluru.
            - Vibe: No-frills, rustic, heritage, token system, busy.
            - Parking: Difficult for cars, better for bikes.
            
            User Question: ${userText}` }]
          }
        ],
        config: {
          systemInstruction: "You are a helpful, friendly, and knowledgeable digital assistant for Shivaji Military Hotel. Keep responses concise, heritage-focused, and use a bit of local flavor (like 'Namaskara')."
        }
      });

      const aiText = response.text || "I'm sorry, I couldn't process that. Please try asking about our menu or timings!";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "I'm having a bit of trouble connecting right now. Please try again later!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickPrompts = [
    "What are your timings?",
    "What is your best dish?",
    "Do you have veg food?",
    "Is there parking?"
  ];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-red-700 hover:bg-red-800 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform group border-[3px] border-orange-400"
        >
          <MessageSquare className="group-hover:animate-pulse" size={28} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center px-4 pb-4 sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-stone-950/70 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh] border border-stone-200"
            >
              {/* Header */}
              <div className="bg-red-800 p-6 flex justify-between items-center border-b-[4px] border-orange-500">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20 shadow-inner">
                    <Flame size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-heritage font-bold text-2xl leading-tight">Shivaji Guide</h3>
                    <p className="text-red-200 text-xs font-medium tracking-wide">Digital Assistant</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-red-200 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-[#f8f8f8] min-h-[350px]">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold shadow-sm ${
                      msg.role === 'ai' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-stone-200 text-stone-700'
                    }`}>
                      {msg.role === 'ai' ? 'AI' : 'You'}
                    </div>
                    <div className={`p-4.5 rounded-2xl shadow-sm border text-sm leading-relaxed max-w-[85%] font-medium ${
                      msg.role === 'ai' 
                        ? 'bg-white border-stone-200 text-stone-700 rounded-tl-none' 
                        : 'bg-red-700 border-red-800 text-white rounded-tr-none'
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center text-red-800 text-xs font-bold border border-red-200 shadow-sm">AI</div>
                    <div className="bg-white p-4.5 rounded-2xl rounded-tl-none shadow-sm border border-stone-200 text-stone-500 text-sm max-w-[85%] flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-5 bg-white border-t border-stone-200">
                <form onSubmit={handleSend} className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={isTyping}
                    className="w-full bg-stone-50 text-stone-900 placeholder-stone-400 border border-stone-200 rounded-full py-4 pl-6 pr-14 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-sm font-medium shadow-inner"
                    placeholder="e.g. What are your timings?"
                  />
                  <button
                    type="submit"
                    disabled={isTyping || !query.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-red-700 hover:bg-red-800 text-white rounded-full flex items-center justify-center transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={16} />
                  </button>
                </form>
                <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-1">
                  {quickPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setQuery(prompt);
                        // We need a small delay to ensure the state is updated before sending
                        setTimeout(() => handleSend(), 0);
                      }}
                      className="whitespace-nowrap px-4 py-2 bg-stone-50 hover:bg-red-50 hover:text-red-800 text-stone-600 font-bold tracking-wide text-[11px] uppercase rounded-full border border-stone-200 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
