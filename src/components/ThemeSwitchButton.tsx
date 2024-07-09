"use client";
import { useThemeContext } from "@/providers/ThemeProvider";
import { ThemedButton } from "./Themed";
import { ButtonHTMLAttributes, useEffect } from "react";
import ThemeService from "@/services/ThemeService";
const themeService = new ThemeService();

export default function ThemeSwitchButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { theme, switchTheme } = useThemeContext();
  const onThemeToggleClick = () => {
    switchTheme();
    themeService.setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    themeService.initializeTheme();
  }, []);

  return (
    <ThemedButton
      {...props}
      text={`Switch To ${theme === "dark" ? "light" : "dark"}`}
      color="secondary"
      onClick={onThemeToggleClick}
    ></ThemedButton>
  );
}
