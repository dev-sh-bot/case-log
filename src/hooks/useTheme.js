import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../reducers/themeSlice';

export const useTheme = () => {
  const theme = useSelector(selectTheme);

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  return theme;
}; 