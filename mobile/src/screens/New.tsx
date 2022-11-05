import { useState } from "react";
import { Header } from "../components/Header";
import { Heading, Text, VStack, useToast } from "native-base";

import Logo from '../assets/logo.svg'
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Alert } from "../components/Alert";
import { api } from "../services/api";

export function New() {
  const [titlePool, setTitlePool] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  async function handlePoolCreate() {
    if (!titlePool) {
      return toast.show({
        placement: 'top',
        render: () => <Alert
          title="Nome do Bolão Inválido!"
          status="warning"
        />
      })
    }

    try {
      setIsLoading(true)

      await api.post('/pools', { title: titlePool })

      return toast.show({
        placement: 'top',
        render: () => <Alert
          title="Bolão criado com sucesso!"
        />
      })
    }
    catch (err) {
      toast.show({
        placement: 'top',
        render: () => <Alert
          title="Não foi possivel criar o bolão!"
          status="error"
        />
      })

      throw err
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
          Crie seu próprio bolão da copa {"\n"} e compartilhe entre amigos!
        </Heading>

        <Input
          mb={2}
          placeholder="Qual nome do seu bolão?"
          onChangeText={setTitlePool}
          value={titlePool}
        />

        <Button
          title="Criar meu bolão"
          onPress={handlePoolCreate}
          isLoading={isLoading}
        />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um código único
          que poderá usar para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  )
}