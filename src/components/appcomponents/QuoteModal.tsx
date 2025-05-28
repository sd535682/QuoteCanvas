import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import ViewShot, {captureRef} from 'react-native-view-shot';
import Share from 'react-native-share';
import QuotesCard from './QuotesCard';
import {Quote} from '../../services/feedAPI';
import {useColors} from '../../theme/useColors';
import Modal from 'react-native-modal';
import Lucide from '@react-native-vector-icons/lucide';
import {debugWarn} from '../../../config/config';

type QuoteModalProps = {
  visible: boolean;
  onClose: () => void;
  quote: Quote | null;
};

export default function QuoteModal({visible, onClose, quote}: QuoteModalProps) {
  const Colors = useColors();
  const styles = getStyles(Colors);
  const viewRef = useRef<View>(null);

  const shareQuoteImage = async () => {
    if (!viewRef.current) {
      return;
    }
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
      });

      if (Platform.OS === 'android' && Platform.Version < 30) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to share images.',
            buttonPositive: 'OK',
          },
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Denied',
            'Cannot share without storage permission.',
          );
          return;
        }
      }

      await Share.open({url: uri, type: 'image/png'});
    } catch (err) {
      debugWarn(err);
    }
  };

  if (!quote) {
    return null;
  }

  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.75}
      backdropColor={Colors.background}
      animationIn="pulse"
      animationOut="wobble"
      animationInTiming={250}
      animationOutTiming={500}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      useNativeDriverForBackdrop={true}>
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <ViewShot ref={viewRef} options={{format: 'png'}}>
            <View collapsable={false}>
              <QuotesCard quote={quote} />
              <Text style={styles.creditText}>Made with ❤️ Quote Canvas</Text>
            </View>
          </ViewShot>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.buttons} onPress={shareQuoteImage}>
              <Lucide name="share-2" size={18} color={Colors.cardText} />
              <Text style={styles.buttonText}>Share as Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons} onPress={onClose}>
              <Lucide name="x" size={20} color={Colors.cardText} />
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const getStyles = (Colors: any) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      width: '95%',
      backgroundColor: Colors.background,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      borderColor: Colors.black,
      borderWidth: 3,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
      padding: '5%',
      paddingTop: '10%',
    },
    buttons: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: Colors.black,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    buttonText: {
      color: Colors.text,
      fontSize: 14,
    },
    creditText: {
      color: Colors.textGray,
      fontSize: 12,
      textAlign: 'left',
      paddingHorizontal: '5%',
      paddingVertical: '5%',
    },
  });
