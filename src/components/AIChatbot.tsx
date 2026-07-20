"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

function getBotResponse(input: string): string {
  const lower = input.toLowerCase().trim();

  if (lower.match(/waterfall|waterfalls|wli|tagbo|falls/)) {
    return "🌊 The Volta Region is home to some of West Africa's most spectacular waterfalls! **Wli Waterfalls** (the highest in West Africa at ~80m) is a must-visit — located near Hohoe. **Tagbo Falls** near Liati Wote offers a beautiful hike through tropical forest. Other gems include **Aflaboa Falls** and **Kpalime Falls**. Best visited during the rainy season (April–October) for maximum flow!";
  }

  if (lower.match(/hotel|hotels|stay|accommodation|lodge|resort/)) {
    return "🏨 The Volta Region offers accommodation for every budget:\n\n• **Budget**: Guesthouses in Ho and Hohoe ($15–40/night)\n• **Mid-range**: Lake Volta hotels, Tafi Atome eco-lodges ($50–100/night)\n• **Premium**: Mountain View Lodge, Wli Falls Resort ($100–200/night)\n\nI recommend booking ahead during festival seasons. Would you like help with a specific area?";
  }

  if (lower.match(/budget|cost|money|cheap|afford|price/)) {
    return "💰 Great news — the Volta Region is very budget-friendly!\n\n• **Food**: Local meals $2–5, restaurant meals $5–15\n• **Transport**: Tro-tros $1–5 between towns, private car $30–60/day\n• **Activities**: Most waterfalls $2–5 entry, hikes $5–10 with guide\n• **Accommodation**: $15–40/night for clean guesthouses\n\nA comfortable 3-day trip can cost as little as $100–150 per person!";
  }

  if (lower.match(/festival|event|hogbetsotso|agbamevoza|celebration/)) {
    return "🎉 The Volta Region's festivals are incredible cultural experiences!\n\n• **Hogbetsotso Festival** (November, Anloga) — Celebrates the Ewe migration with colorful durbar, drumming, and dance\n• **Agbamevoza (Kpetei) Festival** (November, Keta) — Known for stunning Kente weaving displays\n• **Kpalikpakpa Festival** — Traditional purification ceremonies\n• **Yam Festival** (September) — Harvest celebrations across many communities\n\nPlan to visit in November for the best festival experience!";
  }

  if (lower.match(/beach|coast|coastal|keta|sea|ocean/)) {
    return "🏖️ The Volta Region's coastline along the Atlantic Ocean features beautiful, less-crowded beaches:\n\n• **Keta Beach** — Long sandy stretch perfect for relaxation\n• **Atorkor Beach** — Serene fishing village vibes\n• **Dzelukope Coast** — Great for sunset views\n\nThe Keta Lagoon Complex (Ghana's largest lagoon) is nearby and perfect for birdwatching. The coastal towns also offer fresh seafood and rich Ewe culture!";
  }

  if (lower.match(/food|eat|restaurant|cuisine|dish|meal/)) {
    return "🍽️ Volta Region cuisine is a delightful experience!\n\n• **Akple & Fetri Detsi** — Corn dough with okra soup (local staple)\n• **Agbeli Kaklo** — Cassava chips with coconut (perfect snack)\n• **Banku & Tilapia** — Fermented corn/cassava with grilled fish\n• **Akyeke** — Cassava couscous, a Volta specialty\n\nTry local restaurants in Ho's main market area for the most authentic experience. Fresh fish from the Volta River and Atlantic coast is a must-try!";
  }

  if (lower.match(/transport|get there|how to|travel|bus|car|road|tro-tro/)) {
    return "🚗 Getting to and around the Volta Region:\n\n**From Accra**:\n• By car: 2.5–3 hours via the Accra-Ho highway (well-paved)\n• By bus/VVIP: Regular services from Tema Station ($8–12)\n• By tro-tro: Budget option from Neoplan Station ($5–7)\n\n**Getting around**:\n• Tro-tros connect all major towns ($1–5)\n• Private taxis available in Ho and Hohoe\n• Car rental with driver: $30–60/day\n\nThe roads to most tourist sites are now paved or well-maintained!";
  }

  return "👋 Thanks for your question! The Volta Region has so much to offer — from the majestic Wli Waterfalls and Mount Afadjato to vibrant festivals and pristine beaches. I can help you with:\n\n• 🌊 Waterfalls & natural attractions\n• 🏨 Hotels & accommodation\n• 💰 Budget planning\n• 🎉 Festivals & events\n• 🏖️ Beaches & coastal areas\n• 🍽️ Local food & cuisine\n• 🚗 Transport & travel info\n\nWhat would you like to know more about?";
}

const quickActions = [
  "Best waterfalls?",
  "Hotel suggestions",
  "Budget tips",
  "How to get there",
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hello! I'm your Volta Region travel assistant. Ask me anything about destinations, hotels, festivals, or planning your trip!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate response delay
    setTimeout(() => {
      const response = getBotResponse(text);
      const botMsg: Message = {
        id: Date.now() + 1,
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleQuickAction = (action: string) => {
    sendMessage(action);
  };

  return (
    <div className="fixed bottom-24 right-6 z-40 flex flex-col items-end gap-3">
      {/* Expanded Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="w-96 max-w-[calc(100vw-2rem)] rounded-2xl bg-white shadow-2xl shadow-forest/10 overflow-hidden border border-border/50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-forest px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-warm-gold/20 flex items-center justify-center">
                  <MapPin className="w-4.5 h-4.5 text-warm-gold" />
                </div>
                <div>
                  <h3 className="text-white font-heading font-semibold text-sm leading-tight">
                    VTH Travel Assistant
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white/60 text-xs">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="h-80 overflow-y-auto px-4 py-4 space-y-4 bg-cream/50 no-scrollbar">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-warm-gold/10 text-charcoal rounded-br-md"
                        : "bg-forest/10 text-charcoal rounded-bl-md"
                    }`}
                  >
                    {msg.text.split(/(\*\*.*?\*\*)/).map((part, i) => {
                      if (part.startsWith("**") && part.endsWith("**")) {
                        return (
                          <strong key={i} className="font-semibold text-forest">
                            {part.slice(2, -2)}
                          </strong>
                        );
                      }
                      return <span key={i}>{part}</span>;
                    })}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-forest/10 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-forest/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-forest/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-forest/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Chips */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    onClick={() => handleQuickAction(action)}
                    className="text-xs px-3 py-1.5 rounded-full border border-forest/20 text-forest hover:bg-forest hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={handleSubmit}
              className="px-4 py-3 border-t border-border/50 bg-white flex items-center gap-2 shrink-0"
            >
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Volta Region..."
                className="flex-1 h-10 rounded-full border-border/80 bg-cream/50 text-sm focus-visible:ring-forest/30 focus-visible:border-forest/50"
                disabled={isTyping}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim() || isTyping}
                className="w-10 h-10 rounded-full bg-forest hover:bg-forest-light shrink-0 disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-white" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-14 h-14 rounded-full bg-forest hover:bg-forest-light shadow-lg shadow-forest/30 flex items-center justify-center transition-colors duration-200 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open travel assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle className="w-6 h-6 text-white" />
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-full bg-forest animate-ping opacity-20" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}