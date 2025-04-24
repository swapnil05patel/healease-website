
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, User, Bot, Loader2, X } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    text: "Hello! I'm your AI health assistant. How can I help you today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const botMessage: Message = {
        id: messages.length + 2,
        text: aiResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const generateAIResponse = (userInput: string): string => {
    // This is a simple mock response generator
    // In a real app, this would call an API to get responses from a real AI model
    
    const userInputLower = userInput.toLowerCase();
    
    if (userInputLower.includes("headache") || userInputLower.includes("head ache")) {
      return "Headaches can have many causes including stress, dehydration, eye strain, or lack of sleep. For occasional headaches, over-the-counter pain relievers and rest may help. If your headaches are severe, persistent or accompanied by other symptoms, please consult a healthcare provider.";
    } else if (userInputLower.includes("fever") || userInputLower.includes("temperature")) {
      return "A fever is often a sign that your body is fighting an infection. Rest, stay hydrated, and take acetaminophen or ibuprofen to reduce the fever. If your temperature exceeds 103°F (39.4°C) or lasts more than three days, please seek medical attention.";
    } else if (userInputLower.includes("cough")) {
      return "Coughs can be caused by viruses, allergies, or irritants. Stay hydrated, use honey (if over 1 year old), and consider over-the-counter cough medicine. If your cough is severe, produces colored phlegm, or is accompanied by shortness of breath, please consult a doctor.";
    } else if (userInputLower.includes("thank")) {
      return "You're welcome! I'm here to help with any health questions you might have. Is there anything else I can assist you with?";
    } else if (userInputLower.includes("hello") || userInputLower.includes("hi")) {
      return "Hello! I'm your AI health assistant. How can I help you with your health concerns today?";
    } else if (userInputLower.includes("appointment") || userInputLower.includes("doctor")) {
      return "To schedule an appointment with a doctor, you can use our Hospital Finder feature to locate healthcare providers near you. Would you like me to guide you through that process?";
    } else {
      return "Thank you for sharing that information. To provide more specific guidance, I may need additional details about your symptoms. Could you tell me more about what you're experiencing, including when it started and any other symptoms?";
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating chat button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg flex items-center justify-center ${
          isOpen ? "bg-medical-red hover:bg-red-600" : "bg-medical-blue hover:bg-medical-darkblue"
        }`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-6 w-80 sm:w-96 transition-all duration-300 transform origin-bottom-right ${
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
        }`}
      >
        <Card className="shadow-xl border-medical-blue">
          <CardHeader className="bg-medical-blue text-white py-3 px-4">
            <CardTitle className="text-base font-medium flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              AI Health Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 h-80 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === "user"
                        ? "bg-medical-blue text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center mb-1 text-xs text-gray-500">
                      {msg.sender === "user" ? (
                        <>
                          <span className="ml-1 text-white">You</span>
                          <span className="ml-auto text-white">{formatTime(msg.timestamp)}</span>
                        </>
                      ) : (
                        <>
                          <Bot className="h-3 w-3 mr-1" />
                          <span>Health Assistant</span>
                          <span className="ml-auto">{formatTime(msg.timestamp)}</span>
                        </>
                      )}
                    </div>
                    <div className={msg.sender === "user" ? "text-white" : "text-gray-800"}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-gray-100">
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 mr-2 animate-spin text-medical-blue" />
                      <span className="text-sm text-gray-500">Typing a response...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="p-2 border-t">
            <form onSubmit={handleSendMessage} className="w-full flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your health question..."
                className="flex-grow"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={inputValue.trim() === "" || isTyping}
                className="bg-medical-blue hover:bg-medical-darkblue"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default AIChatbot;
