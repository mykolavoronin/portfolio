import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark =
      theme === "dark" || (theme === "system" && root.classList.contains("dark"));
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative h-9 w-9 min-h-9 min-w-9 rounded-full"
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-[transform,opacity] duration-200 ease-out dark:-rotate-90 dark:scale-0 dark:opacity-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 opacity-0 transition-[transform,opacity] duration-200 ease-out dark:rotate-0 dark:scale-100 dark:opacity-100" />
    </Button>
  );
}
