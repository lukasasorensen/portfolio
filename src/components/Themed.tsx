import { useThemeContext } from "@/providers/ThemeProvider";
import { getButtonThemeClasses } from "@/utils/ThemeUtil";
import { ButtonHTMLAttributes, HTMLAttributes, useMemo } from "react";

interface IThemedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  title?: string;
  color?: "primary" | "secondary" | "warn" | "danger" | "none";
}
export function ThemedButton({
  title,
  text,
  color,
  className,
  ...props
}: IThemedButtonProps) {
  const { twColorClasses } = useThemeContext();

  const buttonThemeClasses = useMemo<string>(() => {
    return getButtonThemeClasses(color || "none", twColorClasses);
  }, [color, twColorClasses]);

  return (
    <button
      {...props}
      className={`w-fit min-w-24 rounded-md px-5 py-1.5 text-center ${buttonThemeClasses} ${className}`}
      title={title ?? text}
    >
      {text}
    </button>
  );
}
