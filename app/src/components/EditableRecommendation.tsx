import { useState, useCallback, useEffect, useRef } from "react";
import { Copy, RefreshCw, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditableRecommendationProps {
  label: string;
  initialValue: string;
  onRegenerate: () => Promise<string>;
  onToast: (message: string) => void;
  className?: string;
}

export function EditableRecommendation({
  label,
  initialValue,
  onRegenerate,
  onToast,
  className,
}: EditableRecommendationProps) {
  const [text, setText] = useState(initialValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync state when initialValue changes (e.g., when AI suggestions complete)
  useEffect(() => {
    setText(initialValue);
  }, [initialValue]);

  // Auto-resize textarea to fit content
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [text, adjustHeight]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    onToast("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  }, [text, onToast]);

  const handleRegenerate = useCallback(async () => {
    setLoading(true);
    try {
      const newText = await onRegenerate();
      setText(newText);
      onToast("Recommendation regenerated");
    } catch {
      onToast("Failed to regenerate");
    } finally {
      setLoading(false);
    }
  }, [onRegenerate, onToast]);

  return (
    <div className={cn("rounded-card bg-bg-500 p-3", className)}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-body-12 uppercase tracking-wider text-text-secondary">
          {label}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className={cn(
              "rounded-full p-1.5 transition-colors",
              copied
                ? "bg-green/20 text-green"
                : "text-text-secondary hover:bg-bg-300 hover:text-white",
            )}
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
          <button
            onClick={handleRegenerate}
            disabled={loading}
            className="rounded-full p-1.5 text-text-secondary hover:bg-bg-300 hover:text-white transition-colors disabled:opacity-50"
            title="Regenerate"
          >
            <RefreshCw
              className={cn("h-3.5 w-3.5", loading && "animate-spin")}
            />
          </button>
        </div>
      </div>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          adjustHeight();
        }}
        rows={1}
        className="w-full rounded-input bg-bg-700 px-3 py-2 text-body-16 text-text-primary placeholder:text-bg-300 outline-none focus:ring-1 focus:ring-accent-blue transition-shadow resize-none overflow-hidden"
      />
    </div>
  );
}
