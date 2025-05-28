import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  ViewStyle,
  Keyboard,
} from 'react-native';

interface KeyboardAwareWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  behavior?: 'height' | 'position' | 'padding';
  keyboardVerticalOffset?: number;
  enableScrollView?: boolean;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
  showsVerticalScrollIndicator?: boolean;
  bounces?: boolean;
}

export default function KeyboardAwareWrapper({
  children,
  style,
  contentContainerStyle,
  behavior,
  keyboardVerticalOffset,
  enableScrollView = true,
  keyboardShouldPersistTaps = 'handled',
  showsVerticalScrollIndicator = false,
  bounces = true,
}: KeyboardAwareWrapperProps) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener?.remove();
      keyboardDidShowListener?.remove();
    };
  }, []);

  // Only apply behavior when keyboard is visible
  const dynamicBehavior = isKeyboardVisible
    ? behavior || (Platform.OS === 'ios' ? 'padding' : 'height')
    : undefined;

  const defaultOffset =
    keyboardVerticalOffset ?? (Platform.OS === 'ios' ? 0 : 20);

  const keyboardAvoidingViewStyle = [styles.container, style];
  const scrollContentStyle = [styles.scrollContainer, contentContainerStyle];

  if (enableScrollView) {
    return (
      <KeyboardAvoidingView
        style={keyboardAvoidingViewStyle}
        behavior={dynamicBehavior}
        keyboardVerticalOffset={defaultOffset}>
        <ScrollView
          contentContainerStyle={scrollContentStyle}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          bounces={bounces}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={keyboardAvoidingViewStyle}
      behavior={dynamicBehavior}
      keyboardVerticalOffset={defaultOffset}>
      {children}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
