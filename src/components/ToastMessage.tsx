import {StyleSheet} from 'react-native';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import Lucide from '@react-native-vector-icons/lucide';
import {CommonColors} from '../constants/Colors';

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
      style={[styles.baseToast, styles.successBorderLeftColor]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      renderLeadingIcon={() => (
        <Lucide
          name="circle-check"
          size={24}
          color={CommonColors.notificationSuccessIcon}
        />
      )}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={[styles.baseToast, styles.errorBorderLeftColor]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      renderLeadingIcon={() => (
        <Lucide
          name="circle-x"
          size={24}
          color={CommonColors.notificationErrorIcon}
        />
      )}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      style={[styles.baseToast, styles.infoBorderLeftColor]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      renderLeadingIcon={() => (
        <Lucide
          name="info"
          size={24}
          color={CommonColors.notificationInfoIcon}
        />
      )}
    />
  ),
  warn: (props: any) => (
    <BaseToast
      {...props}
      style={[styles.baseToast, styles.warnBorderLeftColor]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      renderLeadingIcon={() => (
        <Lucide
          name="triangle-alert"
          size={24}
          color={CommonColors.notificationWarnIcon}
        />
      )}
    />
  ),
};

const styles = StyleSheet.create({
  baseToast: {
    borderLeftWidth: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CommonColors.notificationText,
  },
  text2: {
    fontSize: 14,
    color: CommonColors.notificationText,
  },
  successBorderLeftColor: {
    borderLeftColor: CommonColors.notificationSuccessIcon,
  },
  errorBorderLeftColor: {
    borderLeftColor: CommonColors.notificationErrorIcon,
  },
  infoBorderLeftColor: {
    borderLeftColor: CommonColors.notificationInfoIcon,
  },
  warnBorderLeftColor: {
    borderLeftColor: CommonColors.notificationWarnIcon,
  },
});
