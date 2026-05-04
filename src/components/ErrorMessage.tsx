import { AlertCircle } from "lucide-react";

type ErrorMessageProps = {
  message?: string;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 mt-3 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
      <AlertCircle className="h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
