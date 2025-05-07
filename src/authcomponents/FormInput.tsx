import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';
import Lucide from '@react-native-vector-icons/lucide';
import {IconName} from '../constants/Icons';

export default function FormInput({
  inputLabel,
  leftInputIcon,
  rightInputIcon,
  iconColor,
}: {
  inputLabel: string;
  leftInputIcon?: IconName;
  rightInputIcon?: IconName;
  iconColor?: string;
}) {
  return (
    <View style={styles.inputContainer}>
      <View>
        {leftInputIcon && (
          <Lucide name={leftInputIcon} size={24} color={iconColor} />
        )}
      </View>
      <View style={styles.inputField}>
        <Text style={styles.inputLabel}>{inputLabel}</Text>
        <TextInput style={styles.inputBox} />
      </View>
      <View>
        {rightInputIcon && (
          <Lucide name={rightInputIcon} size={24} color={iconColor} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: '12%',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textGray,
    marginLeft: 4,
  },
  inputField: {
    flexDirection: 'column',
    flex: 1,
    paddingHorizontal: 10,
  },
  inputBox: {
    // borderWidth: 1,
    // borderColor: Colors.lightGray,
    width: '100%',
    flexDirection: 'row',
    color: Colors.black,
    fontSize: 16,
    fontWeight: '600',
  },
});
