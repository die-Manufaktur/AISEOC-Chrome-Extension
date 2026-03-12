import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, visible, onClose, duration = 3000 }: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  if (!visible && !show) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 left-1/2 z-50 -translate-x-1/2 flex items-center gap-2 rounded-full bg-bg-700 px-4 py-2 shadow-lg transition-all duration-300",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
      )}
    >
      <Check className="h-4 w-4 text-green" />
      <span className="text-body-12 text-text-primary">{message}</span>
      <button onClick={onClose} className="text-text-secondary hover:text-white">
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}
