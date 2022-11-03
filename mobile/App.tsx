import { NativeBaseProvider, StatusBar } from 'native-base'
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { THEME } from './src/styles/theme'

import { Loading } from './src/components/Loading';
import { AuthContextProvider } from './src/contexts/AuthContext';

import { New } from './src/screens/New';
import { SignIn } from './src/screens/SignIn'; 
import { Find } from './src/screens/Find'; 
import { Pools } from './src/screens/Pools';  

export default function App() {
  const [fontsLoading] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle='light-content'
          backgroundColor="transparent"
          translucent
        />

        {
          fontsLoading ?
            <Pools /> :
            <Loading />
        }
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}