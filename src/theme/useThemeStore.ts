import {create} from 'zustand';
import {Appearance} from 'react-native';
import {MMKV} from 'react-native-mmkv';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const storage = new MMKV();
const THEME_KEY = 'app_theme';

const getInitialTheme = (): Theme => {
  const saved = storage.getString(THEME_KEY);
  if (saved === 'light' || saved === 'dark') {
    return saved;
  }
  const systemTheme = Appearance.getColorScheme();
  return systemTheme === 'dark' ? 'dark' : 'light';
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: getInitialTheme(),
  setTheme: theme => {
    storage.set(THEME_KEY, theme);
    set({theme});
  },
  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    storage.set(THEME_KEY, newTheme);
    set({theme: newTheme});
  },
}));
