"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from 'lucide-react'

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center hover:ring-2 ring-gray-300 transition-all duration-300 focus:outline-none"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 text-gray-800 dark:text-gray-200 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 text-gray-800 dark:text-gray-200 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  )
}