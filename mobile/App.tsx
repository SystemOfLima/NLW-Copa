import { NativeBaseProvider, StatusBar } from 'native-base'
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { THEME } from './src/styles/theme'

import { Loading } from './src/components/Loading';
import { AuthContextProvider } from './src/contexts/AuthContext';
  
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoading] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle='dark-content'
          backgroundColor="transparent"
          translucent
        />

        {
          fontsLoading ?
            <Routes /> :
            <Loading />
        }
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
