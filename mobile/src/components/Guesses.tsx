import { Box, FlatList, useToast } from 'native-base';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Alert } from './Alert';
import { EmptyMyPoolList } from './EmptyMyPoolList';
import { Game, GameProps } from './Game';
import { Loading } from './Loading';

interface Props {
  poolId: string;
  code: string
}

export function Guesses({ poolId, code }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [games, setGames] = useState<GameProps[]>([])
  const [secondTeamPoints, setSecondTeamPoints] = useState('')
  const [firstTeamPoints, setFirstTeamPoints] = useState('')


  const toast = useToast()

  async function fetchGame() {
    try {
      setIsLoading(true)

      const response = await api.get(`/pools/${poolId}/games`)
      setGames(response.data.game)
    }
    catch (err) {
      toast.show({
        render: () => <Alert
          title='Erro ao carregar os jogos'
          status='error'
        />
      })

      throw err
    }
    finally {
      setIsLoading(false)
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          render: () => <Alert
            title='Informe o placar do palpite'
            status='error' />
        })
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints)
      })

      toast.show({
        render: () => <Alert
          title='Palpite realizado com sucesso!'
          status='success' />
      })

    }
    catch (err) {
      toast.show({
        render: () => <Alert
          title='Erro ao enviar o palpite!'
          status='error' />
      })
      throw err
    }
  }

  useEffect(() => { fetchGame() }, [poolId])

  if(isLoading) {
    return <Loading />
  }

  return (
    <FlatList
      data={games}
      keyExtractor={items => items.id}
      _contentContainerStyle={{pb:20}}
      ListEmptyComponent={() => <EmptyMyPoolList code={code} />}

      renderItem={({ item }) =>
        <Game
          data={item}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
        />}
    />
  );
}
