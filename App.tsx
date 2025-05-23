import {useEffect} from 'react';
import RootNavigation from './src/navigations/RootNavigation';
import AuthProvider from './src/context/AuthContext';
import {toastConfig} from './src/components/ToastMessage';
import Toast from 'react-native-toast-message';

export default function App() {
  useEffect(() => {
    fetch(`${process.env.API_URL}`)
      .then(response => response.json())
      .then(data => console.log(JSON.stringify(data.message)));
  }, []);

  return (
    <AuthProvider>
      <RootNavigation />
      <Toast config={toastConfig} />
    </AuthProvider>
  );
}
