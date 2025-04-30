import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function App() {
  const [quotes, setQuotes] = useState<{message: string} | null>(null);

  useEffect(() => {
    fetch(`${process.env.API_URL}`)
      .then(response => response.json())
      .then(data => setQuotes(data));
  }, []);

  return (
    <View style={styles.container}>
      <Text>{quotes?.message || 'Loading...'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
