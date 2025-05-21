import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {useThemeStore} from '../theme/useThemeStore';
import {useColors} from '../theme/useColors';
import Lucide from '@react-native-vector-icons/lucide';

export default function ThemeToggle() {
  const {theme, toggleTheme} = useThemeStore();
  const Colors = useColors();

  const isDark = theme === 'dark';

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Lucide name={isDark ? 'moon' : 'sun'} size={24} color={Colors.text} />
        <Text style={[styles.label, {color: Colors.text}]}>
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </Text>
      </View>
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        thumbColor={isDark ? Colors.primary : '#ccc'}
        trackColor={{false: '#ccc', true: Colors.primary}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});
