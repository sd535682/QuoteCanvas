import {useEffect, useState} from 'react';
import RootNavigation from './src/navigations/RootNavigation';
import AuthProvider from './src/context/AuthContext';

export default function App() {
  const [stageInfo, setStageInfo] = useState<{message: string} | null>(null);

  useEffect(() => {
    fetch(`${process.env.API_URL}`)
      .then(response => response.json())
      .then(data => setStageInfo(data));
  }, []);

  console.log(JSON.stringify(stageInfo?.message));

  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}
