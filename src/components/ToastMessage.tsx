import {StyleSheet} from 'react-native';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

export const showToast = (type: string, title: string, message: string) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    position: 'top',
    avoidKeyboard: true,
    topOffset: 50,
  });
};

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={[styles.baseToast, {borderLeftColor: '#4CAF50'}]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={[styles.baseToast, {borderLeftColor: '#f44336'}]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      style={[styles.baseToast, {borderLeftColor: '#2196F3'}]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
  warn: (props: any) => (
    <BaseToast
      {...props}
      style={[styles.baseToast, {borderLeftColor: '#FF9800'}]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
};

const styles = StyleSheet.create({
  baseToast: {
    borderLeftWidth: 8,
    backgroundColor: 'rgba(7, 59, 76, 0.75)',
    borderRadius: 8,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  text2: {
    fontSize: 14,
    color: '#fff',
  },
});
