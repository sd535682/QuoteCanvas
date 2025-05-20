import {useThemeStore} from './useThemeStore';
import {lightColors, darkColors} from '../constants/Colors';

export const useColors = () => {
  const theme = useThemeStore(state => state.theme);
  return theme === 'dark' ? darkColors : lightColors;
};
