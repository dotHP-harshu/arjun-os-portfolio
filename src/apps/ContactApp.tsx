import React from "react";
import { Github, Linkedin, MessageCircle, Send } from "lucide-react";
import userData from "../data/data.json";

function ContactApp() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [status, setStatus] = React.useState<
    | { state: "idle" }
    | { state: "error"; message: string }
    | { state: "success"; message: string }
  >({ state: "idle" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ state: "idle" });

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedUsername) {
      setStatus({ state: "error", message: "Username required." });
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setStatus({ state: "error", message: "Valid email required." });
      return;
    }
    if (!trimmedMessage) {
      setStatus({ state: "error", message: "Message required." });
      return;
    }

    const subject = `ArjunOS Transmission from ${trimmedUsername}`;
    const body = `Username: ${trimmedUsername}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`;

    // Using mailto keeps this project static (no backend required).
    window.location.href = `mailto:${encodeURIComponent(
      userData.profile.social.email,
    )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setStatus({ state: "success", message: "Transmission queued in your mail client." });
  };

  return (
    <div className="space-y-6">
      <p className="text-sm font-medium">
        Initialize secure communication protocol:
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="space-y-1">
            <span className="text-[10px] font-bold uppercase opacity-70">
              Username
            </span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border-2 text-xs font-mono outline-none"
              style={{
                backgroundColor: "var(--window-bg)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
              placeholder="your name"
              autoComplete="name"
            />
          </label>

          <label className="space-y-1">
            <span className="text-[10px] font-bold uppercase opacity-70">
              Email
            </span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border-2 text-xs font-mono outline-none"
              style={{
                backgroundColor: "var(--window-bg)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
              placeholder="you@example.com"
              autoComplete="email"
              inputMode="email"
            />
          </label>
        </div>

        <label className="space-y-1 block">
          <span className="text-[10px] font-bold uppercase opacity-70">
            Message
          </span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="w-full p-2 border-2 text-xs font-mono outline-none resize-none"
            style={{
              backgroundColor: "var(--window-bg)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
            placeholder="type your message…"
          />
        </label>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 p-3 border-2 font-bold uppercase text-xs transition-all active:translate-y-[2px]"
          style={{
            backgroundColor: "var(--accent)",
            borderColor: "var(--border)",
            color: "#000",
            boxShadow: "2px 2px 0px 0px var(--border)",
          }}
        >
          <Send size={16} strokeWidth={1.5} />
          Transmit
        </button>
      </form>

      {status.state !== "idle" && (
        <div
          className="p-3 font-mono text-[10px] border-2"
          style={{
            backgroundColor: "var(--window-bg)",
            borderColor: "var(--border)",
            color: status.state === "error" ? "#b91c1c" : "var(--text)",
          }}
        >
          &gt; {status.state === "error" ? "error" : "ok"}: {status.message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-3">
        <a
          href={`mailto:${userData.profile.social.email}`}
          className="flex items-center gap-3 p-3 border-2 hover:opacity-80 transition-colors"
          style={{ backgroundColor: "var(--window-bg)", borderColor: "var(--border)" }}
        >
          <MessageCircle size={18} strokeWidth={1.5} />
          <span className="text-xs font-bold uppercase">
            {userData.profile.social.email}
          </span>
        </a>
        <div className="flex gap-3">
          <a
            className="flex-1 flex items-center justify-center gap-2 p-3 border-2 hover:opacity-80 transition-colors"
            style={{ backgroundColor: "var(--window-bg)", borderColor: "var(--border)" }}
            href={userData.profile.social.github}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={18} strokeWidth={1.5} />
            <span className="text-xs font-bold uppercase">GitHub</span>
          </a>
          <a
            className="flex-1 flex items-center justify-center gap-2 p-3 border-2 hover:opacity-80 transition-colors"
            style={{ backgroundColor: "var(--window-bg)", borderColor: "var(--border)" }}
            href={userData.profile.social.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={18} strokeWidth={1.5} />
            <span className="text-xs font-bold uppercase">LinkedIn</span>
          </a>
        </div>
      </div>

      <div
        className="p-3 font-mono text-[10px]"
        style={{ backgroundColor: "var(--border)", color: "var(--accent)" }}
      >
        &gt; connection status: stable
        <br />
        &gt; encryption: aes-256
        <br />
        &gt; ready to transmit...
      </div>
    </div>
  )
}

export default ContactApp