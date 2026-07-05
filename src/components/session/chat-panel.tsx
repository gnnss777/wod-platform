"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { sendMessage } from "@/app/actions/session";

type Message = {
  id: string;
  content: string;
  createdAt: Date;
  user: { name: string; role: string };
};

export function ChatPanel({
  sessionId,
  messages: initialMessages,
  isNarrator,
}: {
  sessionId: string;
  messages: Message[];
  isNarrator: boolean;
}) {
  const router = useRouter();
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    intervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/session/${sessionId}/messages`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch {}
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [sessionId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setInput("");
    await sendMessage(sessionId, input);
    router.refresh();
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 space-y-3 flex flex-col h-[400px]">
      <h3 className="text-sm font-semibold">Chat</h3>

      <div className="flex-1 overflow-y-auto space-y-1.5">
        {messages.length === 0 && (
          <p className="text-xs text-zinc-500 text-center pt-8">
            Nenhuma mensagem ainda.
          </p>
        )}
        {messages.map((m) => (
          <div key={m.id} className="text-sm">
            <span
              className={`font-semibold text-xs ${
                m.user.role === "MESTRE" || m.user.role === "NARRADOR"
                  ? "text-red-500 dark:text-red-400"
                  : "text-zinc-900 dark:text-zinc-100"
              }`}
            >
              {m.user.name}
            </span>
            <span className="text-xs text-zinc-400 ml-1">
              {new Date(m.createdAt).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              {m.content}
            </p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          placeholder={isNarrator ? "Narrar..." : "Falar no chat..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-lg bg-zinc-900 px-3 py-2 text-xs text-white dark:bg-white dark:text-zinc-900"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
