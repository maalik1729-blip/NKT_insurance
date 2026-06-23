import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import { WhatsAppIcon, WA_NUMBER } from "./icons";

export function WhatsAppFab() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("Hi NKT, I'd like to get free insurance advice.");
  const [timeStr, setTimeStr] = useState("12:00 PM");
  const widgetRef = useRef<HTMLDivElement>(null);

  // Set the message timestamp on load
  useEffect(() => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    setTimeStr(`${hours}:${minutes} ${ampm}`);
  }, []);

  // Handle clicking outside to close the widget
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        widgetRef.current &&
        !widgetRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest(".fab")
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSend = () => {
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const presets = [
    { text: "Life Cover Query", msg: "Hi NKT, I'm interested in Life Insurance plans (LIC)." },
    {
      text: "Health Float Info",
      msg: "Hi NKT, I'd like details on Health Insurance family floaters.",
    },
    { text: "Motor Quote", msg: "Hi NKT, I need a quick quote for my vehicle insurance." },
  ];

  return (
    <>
      {/* Widget container */}
      <div
        ref={widgetRef}
        className={`wa-widget${isOpen ? " wa-widget--open" : ""}`}
        role="dialog"
        aria-label="WhatsApp Chat Widget"
      >
        {/* Header */}
        <div className="wa-widget-header">
          <div className="wa-widget-avatar" aria-hidden="true">
            NKT
          </div>
          <div className="wa-widget-info">
            <span className="wa-widget-name" style={{ color: "var(--color-white)" }}>
              NKT Insurance Advisor
            </span>
            <span className="wa-widget-status" style={{ color: "rgba(255, 255, 255, 0.95)" }}>
              <span className="wa-pulse-dot" />
              Online (Typically replies in 5 min)
            </span>
          </div>
          <button
            type="button"
            className="wa-widget-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat widget"
          >
            <X size={18} />
          </button>
        </div>

        {/* Chat bubble body */}
        <div className="wa-widget-body">
          <div className="wa-chat-bubble">
            <div className="wa-chat-text">
              Hi there! 👋 How can we help you secure your family today? Feel free to ask about
              Life, Health, or Motor insurance.
            </div>
            <span className="wa-chat-time">{timeStr}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="wa-widget-footer">
          {/* Quick Preset topic chips */}
          <div className="wa-preset-chips" role="group" aria-label="Quick topics">
            {presets.map((preset) => (
              <button
                key={preset.text}
                type="button"
                className="wa-preset-chip"
                onClick={() => setMessage(preset.msg)}
              >
                {preset.text}
              </button>
            ))}
          </div>

          {/* Text Input area */}
          <div className="wa-input-container">
            <textarea
              className="wa-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              aria-label="WhatsApp message text"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button
              type="button"
              className="wa-send-btn"
              onClick={handleSend}
              aria-label="Send WhatsApp message"
            >
              <Send size={15} style={{ marginLeft: "2px" }} />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        type="button"
        className={`fab${isOpen ? " fab-close-mode" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close WhatsApp chat widget" : "Open WhatsApp chat widget"}
        aria-expanded={isOpen}
        title={isOpen ? "Close chat widget" : "WhatsApp us now"}
      >
        {isOpen ? <X size={24} /> : <WhatsAppIcon size={26} />}
      </button>
    </>
  );
}
