import { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';

const lightTheme = {
  mode: 'light',
  colors: {
    background: '#f5f5f5',
    surface: '#ffffff',
    card: '#ffffff',
    text: '#111111',
    muted: '#666666',
    border: '#dddddd',
    borderAlt: '#eeeeee',
    placeholder: '#999999',
    accent: '#FF4500',
    danger: '#e53935',
    success: '#4CAF50',
    info: '#2196F3',
    overlay: 'rgba(0,0,0,0.5)',
    sheetBackground: 'rgba(255,255,255,0.95)',
  },
};

const darkTheme = {
  mode: 'dark',
  colors: {
    background: '#121212',
    surface: '#1e1e1e',
    card: '#1f1f1f',
    text: '#f5f5f5',
    muted: '#aaaaaa',
    border: '#333333',
    borderAlt: '#2a2a2a',
    placeholder: '#888888',
    accent: '#FF4500',
    danger: '#ef5350',
    success: '#66bb6a',
    info: '#42a5f5',
    overlay: 'rgba(0,0,0,0.4)',
    sheetBackground: 'rgba(18,18,18,0.95)',
  },
};

const ThemeContext = createContext(lightTheme);

export function ThemeProvider({ children }) {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const value = useMemo(() => theme, [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
