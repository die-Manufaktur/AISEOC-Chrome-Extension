import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-3">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[20px] font-semibold leading-[1.2] text-text-primary"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-[10px] border border-[#717171] bg-bg-500 p-[14px] text-[18px] leading-[1.3] text-text-primary shadow-[0px_1px_2px_0px_rgba(10,13,20,0.03)] placeholder:text-text-secondary outline-none focus:ring-1 focus:ring-accent-blue transition-shadow",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = "Input";
