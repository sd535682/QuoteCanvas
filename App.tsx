import RootNavigation from './src/navigations/RootNavigation';
import AuthProvider from './src/context/AuthContext';
import {toastConfig} from './src/components/ToastMessage';
import Toast from 'react-native-toast-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <RootNavigation />
        <Toast config={toastConfig} />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
