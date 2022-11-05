import { useFocusEffect, useRoute } from "@react-navigation/native";
import { HStack, useToast, VStack } from "native-base";
import { useCallback, useState } from "react";
import { Share } from "react-native";
import { Alert } from "../components/Alert";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Guesses } from "../components/Guesses";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { PoolCardPros } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { api } from "../services/api";

interface RouteParams {
  id: string
}

export function Details() {
  const toast = useToast()
  const route = useRoute()

  const { id } = route.params as RouteParams

  const [poolDetails, setPoolDetails] = useState<PoolCardPros>({} as PoolCardPros)
  const [isLoading, setIsLoading] = useState(true)
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses')


  async function fetchPoolDetails() {
    try {
      setIsLoading(true)

      const response = await api.get(`/pools/${id}`)
      setPoolDetails(response.data.pool)
    }
    catch (err) {
      toast.show({
        placement: "top",
        render: () => <Alert title="Não foi possível carregar os detalhes do bolão" status="error" />
      })

      throw err
    }
    finally {
      setIsLoading(false)
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: poolDetails.code
    })
  }

  useFocusEffect(useCallback(() => { fetchPoolDetails() }, []))

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header title={poolDetails.title} showBackButton showShareButton onShare={handleCodeShare} />

      {
        poolDetails._count?.participants > 0
          ? <VStack px={5} flex={1}>
            <PoolHeader data={poolDetails} />

            <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
              <Option
                title="Seus Palpites"
                isSelected={optionSelected === 'guesses'}
                onPress={() => setOptionSelected('guesses')}
              />
              <Option
                title="Ranking do grupo"
                isSelected={optionSelected === 'ranking'}
                onPress={() => setOptionSelected('ranking')}
              />
            </HStack>

            <Guesses poolId={poolDetails.id} code={poolDetails.code} />
          </VStack>
          : <EmptyMyPoolList code={poolDetails.code} />
      }
    </VStack>
  )
}