import { cn } from "@/lib/utils";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
}

export function Toggle({ checked, onChange, label, id }: ToggleProps) {
  const toggleId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <label htmlFor={toggleId} className="inline-flex items-center gap-3 cursor-pointer">
      <div className="relative">
        <input
          id={toggleId}
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={cn(
            "h-6 w-11 rounded-[27px] border border-white/40 transition-colors shadow-[0px_2px_6.6px_0px_rgba(72,201,175,0.3)]",
            checked ? "bg-green" : "bg-bg-300",
          )}
        />
        <div
          className={cn(
            "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
            checked && "translate-x-5",
          )}
        />
      </div>
      {label && <span className="text-[16px] text-text-primary">{label}</span>}
    </label>
  );
}
