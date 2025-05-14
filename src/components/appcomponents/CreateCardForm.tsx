import {TextInput, StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

export default function CreateCardForm({
  placeholder,
  value,
  onChangeText,
  placeholderTextColor,
  height,
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholderTextColor?: string;
  height?: number;
}) {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={[styles.input, height ? {height: height} : null]}
      placeholderTextColor={placeholderTextColor}
      multiline={true}
      textAlignVertical="top"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    color: Colors.black,
    backgroundColor: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});
