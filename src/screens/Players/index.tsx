import { Button } from '@components/Button'
import { ButtonIcon } from '@components/ButtonIcon'
import { Filter } from '@components/Filter'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { ListEmpty } from '@components/ListEmpty'
import { Loading } from '@components/Loading'
import { PlayerCard } from '@components/PlayerCard'
import { useNavigation, useRoute } from '@react-navigation/native'
import { groupRemoveByName } from '@storage/group/groupRemoveByName'
import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup'
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam'
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import { AppError } from '@utils/AppError'
import { useEffect, useRef, useState } from 'react'
import { Alert, FlatList, Keyboard, TextInput } from 'react-native'
import { PlayersParam } from 'src/@types/navigation'
import * as S from './styles'

export const Players = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [newPlayerName, setNewPlayerName] = useState('')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [team, setTeam] = useState('a')

  const newPlayerNameInputRef = useRef<TextInput>(null)

  const navigation = useNavigation()
  const route = useRoute()
  const { group } = route.params as PlayersParam


  async function handleAddPlayer() {
    if (newPlayerName.trim().length <= 0) return Alert.alert(
      'Nova Pessoa',
      'Informe o nome de uma pessoa para ser adicionada!'
    )

    const newPlayer: PlayerStorageDTO = {
      name: newPlayerName,
      team
    }

    try {
      await playerAddByGroup(
        group,
        newPlayer
      )
      await fetchPlayersByTeam()
      setNewPlayerName('')
      newPlayerNameInputRef.current?.blur()
      Keyboard.dismiss()
    } catch (error) {
      if (error instanceof AppError) return Alert.alert(
        'Nova Pessoa',
        error.message
      )
      Alert.alert(
        'Nova Pessoa',
        'Ocorreu um erro ao tentar realizar o cadastro! Tente novamente.'
      )
      console.error(error);
    }
  }

  async function fetchPlayersByTeam() {
    setIsLoading(true)
    try {
      const playersByTeam = await playersGetByGroupAndTeam(
        group,
        team
      )
      setPlayers(playersByTeam)
    } catch (error) {
      Alert.alert(
        'Nova Pessoa',
        'Ocorreu um erro ao tentar carregar as pessoas! Tente novamente.'
      )
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(group, playerName)
      await fetchPlayersByTeam()
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Remover Pessoa',
        'Não foi possível remover esta pessoa!'
      )
    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      'Remover Grupo',
      'Tem certeza que deseja excluir este grupo?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => groupRemove() }
      ]
    )
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group)
      navigation.navigate('groups')
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Remover Turma',
        'Não foi possível remover esta Turma!'
      )
    }
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <S.Container>
      <Header showBackButton />

      <Highlight
        subTitle={'Adicione a galera e separe os times'}
        title={group}
      />

      <S.Form>
        <Input
          autoCorrect={false}
          inputRef={newPlayerNameInputRef}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddPlayer}
          placeholder={'Nome da pessoa'}
          returnKeyType={'done'}
          value={newPlayerName}
        />

        <ButtonIcon
          icon={'add'}
          onPress={handleAddPlayer}
        />
      </S.Form>

      <S.HeaderList>
        <FlatList
          keyExtractor={item => item}
          data={['a', 'b']}
          horizontal
          renderItem={({ item }) => (
            <Filter
              isActive={item === team}
              onPress={() => setTeam(item)}
              title={item}
            />
          )}
        />

        <S.NumberOfPlayers>
          {players.length}
        </S.NumberOfPlayers>
      </S.HeaderList>

      {
        isLoading ?
          <Loading /> :
          <FlatList
            keyExtractor={item => item.name}
            contentContainerStyle={[
              { paddingBottom: 100 },
              players.length === 0 && { flex: 1 },
            ]}
            data={players}
            ListEmptyComponent={() => <ListEmpty message={'Não há pessoas neste time'} />}
            renderItem={({ item }) => (
              <PlayerCard
                onRemove={() => { handleRemovePlayer(item.name) }}
                name={item.name}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
      }

      <Button
        title={'Remover Turma'}
        onPress={handleGroupRemove}
        type={'SECONDARY'}
      />
    </S.Container>
  )
}
