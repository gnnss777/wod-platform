"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          fontFamily: "system-ui, sans-serif",
        }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#dc2626" }}>
            Erro crítico
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#71717a", marginTop: "0.5rem" }}>
            {error.message || `Erro inesperado (digest: ${error.digest || "N/A"})`}
          </p>
          <p style={{ fontSize: "0.75rem", color: "#a1a1aa", marginTop: "0.25rem" }}>
            {error.stack?.split("\n").slice(0, 3).join("\n")}
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: "1rem",
              padding: "0.75rem 2rem",
              background: "#18181b",
              color: "#fff",
              border: "none",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            Tentar novamente
          </button>
        </div>
      </body>
    </html>
  );
}