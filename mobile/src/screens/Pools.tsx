import { useCallback, useEffect, useState } from "react";
import { Octicons } from '@expo/vector-icons';
import { VStack, Icon, useToast, FlatList } from "native-base";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { api } from "../services/api";
import { Alert } from "../components/Alert";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { PoolCard } from "../components/PoolCard";
import { PoolCardPros } from "../components/PoolCard";
import { EmptyPoolList } from "../components/EmptyPoolList";

export function Pools() {
  const [isLoading, setIsLoading] = useState(true)
  const [pools, setPools] = useState<PoolCardPros[]>([])

  const { navigate } = useNavigation()
  const toast = useToast()

  async function fetchPools() {
    try {
      setIsLoading(true)
      const response = await api.get('/pools')
      setPools(response.data.pools)
    }
    catch (err) {
      toast.show({
        placement: 'top',
        render: () => <Alert
          title="Não foi possível recuperar os seus Bolões!"
          status="warning"
        />
      })

      throw err
    }
    finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchPools()
  }, []))

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus Bolões" />

      <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
          onPress={() => navigate("find")}
        />
      </VStack>

      {
        isLoading
          ? <Loading />
          : <FlatList
            data={pools}
            keyExtractor={item => item.id}
            px={5}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ pb: 24 }}
            ListEmptyComponent={() => <EmptyPoolList />}

            renderItem={({ item }) =>
              <PoolCard
                data={item}
                onPress={() => navigate('details', { id: item.id })}
              />}
          />
      }
    </VStack>
  )
}