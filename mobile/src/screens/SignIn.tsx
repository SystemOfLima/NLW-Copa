import { Fontisto } from '@expo/vector-icons'
import { Center, Icon, Text } from "native-base";

import { useAuth } from '../hooks/useAuth';
import { Button } from "../components/Button";
import Logo from '../assets/logo.svg'

export function SignIn() {
  const { signIn, isUserLoading } = useAuth()

  return (
    <Center flex={1} bgColor="black" p={7}>
      <Logo width={212} height={40} />

      <Button
        title='Entrar com o google'
        type='SECONDARY'

        mt={12}

        leftIcon={
          <Icon
            as={Fontisto}
            name="google"
            color="white"
            size='md'
          />
        }

        onPress={signIn}
        isLoading={isUserLoading}

        _loading={{ _spinner: { color: 'white' } }}
      />

      <Text color='white' textAlign='center' mt={4}>
        Não utilizamos nenhuma informação além {'\n'}
        do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  )
}