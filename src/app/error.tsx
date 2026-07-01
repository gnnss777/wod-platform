"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold text-red-600">Erro no servidor</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {error.message || `Erro inesperado (digest: ${error.digest || "N/A"})`}
        </p>
        <button
          onClick={reset}
          className="rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}