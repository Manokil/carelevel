import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Function to get initial theme
const getInitialTheme = (): Theme => {
  // Check localStorage first
  const saved = localStorage.getItem('theme') as Theme | null;
  if (saved && (saved === 'light' || saved === 'dark')) {
    return saved;
  }
  
  // Check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  // Default to dark theme
  return 'dark';
};

// Apply theme immediately to avoid flash
const applyTheme = (theme: Theme) => {
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);
  
  // Add transition class for smooth theme changes
  document.documentElement.classList.add('theme-transition');
  
  // Remove transition class after animation completes
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transition');
  }, 100);
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const initialTheme = getInitialTheme();
    // Apply theme immediately on mount to prevent flash
    applyTheme(initialTheme);
    return initialTheme;
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
