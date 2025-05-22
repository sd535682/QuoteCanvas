import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {useColors} from '../../theme/useColors';

export default function LogoutConfirmation({
  visible,
  onCancel,
  onConfirm,
}: {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const Colors = useColors();
  const styles = getStyles(Colors);
  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.75}
      backdropColor={Colors.background}
      animationIn="pulse"
      animationOut="wobble"
      animationInTiming={250}
      animationOutTiming={500}
      onBackdropPress={onCancel}
      onBackButtonPress={onCancel}
      useNativeDriverForBackdrop={true}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.title}>Are you sure you want to logout?</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const getStyles = (Colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      width: '100%',
      backgroundColor: Colors.cardBackground,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      borderColor: Colors.black,
      borderWidth: 3,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.text,
      textAlign: 'center',
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
      padding: '5%',
      paddingTop: '10%',
    },
    cancelButton: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 8,
      color: 'black',
    },
    cancelButtonText: {
      fontSize: 12,
      color: 'black',
      fontWeight: 'bold',
    },
    confirmButton: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 8,
      color: 'white',
    },
    confirmButtonText: {
      fontSize: 12,
      color: 'white',
      fontWeight: 'bold',
    },
  });
