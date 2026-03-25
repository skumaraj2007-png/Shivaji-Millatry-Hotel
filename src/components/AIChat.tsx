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
            
            Official Restaurant Data:
            {
              "name": "Shivaji Military Hotel",
              "established_year": 1924,
              "description": "One of the oldest and most iconic military hotels in Bangalore, famous for authentic Donne Biryani and traditional non-vegetarian Karnataka cuisine.",
              "location": {
                "address": "No.718, 1st C Main Road, 45th Cross, Jayanagar 8th Block",
                "landmark": "Near Banashankari Bus Stop",
                "city": "Bangalore",
                "pincode": "560070"
              },
              "contact": { "phone": "+91-9845149217", "online_ordering": ["Zomato", "Swiggy"] },
              "timings": "Daily 08:30 AM - 03:30 PM",
              "pricing": { "average_cost_for_two": 500 },
              "menu_highlights": {
                "breakfast": ["Dosa (₹40)"],
                "main_course": [
                  "Mutton Biryani (Donne) (₹185) - Popular",
                  "Chicken Biryani (₹160)",
                  "Ghee Rice (₹90)",
                  "Mutton Chops (₹160)",
                  "Mutton Dry (₹160) - Recommended",
                  "Mutton Liver (₹130)",
                  "Kheema (₹160)"
                ],
                "soups": ["Leg Soup (₹140)"],
                "specials": ["Natty Chicken Biryani (₹185) - Thursday only"]
              },
              "features": { "parking": "Limited", "seating": "Compact", "air_conditioning": false },
              "speciality": "Served in banana leaf bowls (Donne), Spicy, ghee-rich, authentic Karnataka flavor",
              "history": "Military hotels were originally run by families linked to army communities. Shivaji Military Hotel is one of the oldest in Bangalore.",
              "faq": [
                { "q": "What are the timings?", "a": "Daily 8:30 AM to 3:30 PM." },
                { "q": "Is veg food available?", "a": "Limited veg options like dosa and ghee rice are available." }
              ]
            }

            User Question: ${userText}` }]
          }
        ],
        config: {
          systemInstruction: "You are a helpful, friendly, and knowledgeable digital assistant for Shivaji Military Hotel. Use the provided official data to answer questions accurately. Keep responses concise, heritage-focused, and use a bit of local flavor (like 'Namaskara'). If asked about something not in the data, politely say you don't have that information yet."
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
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="relative w-16 h-16 flex items-center justify-center group"
        >
          {/* Glowing Rings */}
          <div className="absolute inset-0 bg-red-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse" />
          <div className="absolute -inset-1 bg-gradient-to-tr from-red-600 to-orange-500 rounded-full opacity-20 group-hover:opacity-40 animate-spin-slow" />
          
          {/* Main Button */}
          <div className="relative w-full h-full bg-stone-950 rounded-full border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <MessageSquare className="text-white group-hover:scale-110 transition-transform duration-500 z-10" size={24} />
            <Sparkles className="absolute top-3 right-3 text-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100" size={12} />
          </div>
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
              className="relative bg-stone-950/90 backdrop-blur-xl rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-lg overflow-hidden flex flex-col h-[600px] max-h-[85vh] border border-white/10"
            >
              {/* Atmospheric Background Decor */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/30 blur-[80px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/20 blur-[80px] rounded-full animate-pulse [animation-delay:1s]" />
              </div>

              {/* Header */}
              <div className="relative z-10 bg-stone-900/50 backdrop-blur-md p-6 flex justify-between items-center border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-600 blur-md opacity-50 animate-pulse rounded-full" />
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center text-white border border-white/20 shadow-lg">
                      <Flame size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-heritage font-bold text-2xl leading-tight tracking-tight">Shivaji Guide</h3>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <p className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.2em]">Legacy Assistant</p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-stone-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Chat Area */}
              <div className="relative z-10 flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: msg.role === 'ai' ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-black shadow-lg border ${
                      msg.role === 'ai' 
                        ? 'bg-red-600/20 text-red-500 border-red-500/30' 
                        : 'bg-stone-800 text-stone-400 border-stone-700'
                    }`}>
                      {msg.role === 'ai' ? 'SH' : 'ME'}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed max-w-[85%] shadow-xl backdrop-blur-md border ${
                      msg.role === 'ai' 
                        ? 'bg-white/5 border-white/10 text-stone-100 rounded-tl-none' 
                        : 'bg-red-600/10 border-red-500/20 text-red-50 rounded-tr-none'
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-600/20 flex-shrink-0 flex items-center justify-center text-red-500 text-[10px] font-black border border-red-500/30 shadow-lg">SH</div>
                    <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none shadow-xl border border-white/10 text-stone-500 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="relative z-10 p-6 bg-stone-900/50 backdrop-blur-md border-t border-white/5">
                <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
                  {quickPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setQuery(prompt);
                        setTimeout(() => handleSend(), 0);
                      }}
                      className="whitespace-nowrap px-4 py-2 bg-white/5 hover:bg-red-600/20 hover:text-red-400 text-stone-400 font-bold tracking-wider text-[9px] uppercase rounded-full border border-white/10 transition-all active:scale-95"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
                <form onSubmit={handleSend} className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={isTyping}
                    className="w-full bg-stone-800/50 text-white placeholder-stone-500 border border-white/10 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all text-sm font-medium shadow-inner"
                    placeholder="Ask about our legacy..."
                  />
                  <button
                    type="submit"
                    disabled={isTyping || !query.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl flex items-center justify-center transition-all shadow-lg disabled:opacity-30 disabled:grayscale active:scale-90"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
