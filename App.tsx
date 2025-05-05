import {useEffect, useState} from 'react';
import RootNavigation from './src/navigations/RootNavigation';

export default function App() {
  const [stageInfo, setStageInfo] = useState<{message: string} | null>(null);

  useEffect(() => {
    fetch(`${process.env.API_URL}`)
      .then(response => response.json())
      .then(data => setStageInfo(data));
  }, []);

  console.log(JSON.stringify(stageInfo?.message));

  return <RootNavigation />;
}
