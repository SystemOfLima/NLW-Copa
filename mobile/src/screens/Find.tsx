import { useState } from "react";
import { Heading, useToast, VStack } from "native-base";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Alert } from "../components/Alert";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";

export function Find() {
  const { navigate } = useNavigation()
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  async function handleJoinPool() {
    try {
      setIsLoading(true)

      if (!code.trim()) {
        return toast.show({
          placement: "top",
          render: () => <Alert title="Codigo inválido!" status="warning" />
        })
      }


      await api.post('/pools/join', { code })

      toast.show({
        placement: "top",
        render: () => <Alert title="Você entrou no bolão!" status="success" />
      })

      navigate('pools')
    }
    catch (err) {
      setIsLoading(false)

      if (err.response?.data?.message === 'Pool not found.') {
        toast.show({
          placement: "top",
          render: () => <Alert title="Bolão não encontrado!" status="error" />
        })
      }
      else if (err.response?.data?.message === 'You already join this pool.') {
        toast.show({
          placement: "top",
          render: () => <Alert title="Você já está nesse Bolão!" status="warning" />
        })
      }
      else {
        toast.show({
          placement: "top",
          render: () => <Alert title="Error 500!" status="error" />
        })
      }

      throw err
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
          Encontre um bolão através de {"\n"}
          seu código único
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          autoCapitalize="characters"
          onChangeText={code => { setCode(code.toLocaleUpperCase()) }}
        />

        <Button title="BUSCAR BOLÃO" onPress={handleJoinPool} />
      </VStack>
    </VStack>
  )
}