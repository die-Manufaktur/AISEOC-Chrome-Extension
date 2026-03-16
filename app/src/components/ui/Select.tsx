import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  options,
  className,
  id,
  ...props
}: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-3">
      {label && (
        <label
          htmlFor={selectId}
          className="text-[20px] font-semibold leading-[1.2] text-text-primary"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={cn(
            "w-full appearance-none rounded-[10px] border border-[#717171] bg-bg-500 p-[14px] pr-10 text-[18px] leading-[1.3] text-text-primary shadow-[0px_1px_2px_0px_rgba(10,13,20,0.03)] outline-none focus:ring-1 focus:ring-accent-blue transition-shadow",
            className,
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
      </div>
    </div>
  );
}
