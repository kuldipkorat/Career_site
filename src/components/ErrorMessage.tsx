interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="mt-2 flex items-start gap-2 text-red-600 text-sm font-medium bg-red-50 border-2 border-red-300 rounded-lg px-3 py-2 animate-fade-in">
      <span className="text-red-600 font-bold text-base">⚠</span>
      <span>{message}</span>
    </div>
  );
}
