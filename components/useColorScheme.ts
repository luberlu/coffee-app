import { useColorScheme as _useColorScheme } from 'react-native';
import { useState, useEffect } from 'react';
import { MODE } from '@/constants';

let forcedColorScheme: 'light' | 'dark' | null = MODE;

export function setColorScheme(scheme: 'light' | 'dark' | null) {
  forcedColorScheme = scheme;
}

export function useColorScheme() {
  const systemColorScheme = _useColorScheme();
  const [colorScheme, setColorScheme] = useState(forcedColorScheme || systemColorScheme);

  useEffect(() => {
    setColorScheme(forcedColorScheme || systemColorScheme);
  }, [systemColorScheme, forcedColorScheme]);

  return colorScheme;
}
