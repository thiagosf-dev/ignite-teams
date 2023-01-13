import { Button } from '@components/Button'
import { GroupCard } from '@components/GroupCard'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ListEmpty } from '@components/ListEmpty'
import { Loading } from '@components/Loading'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { groupsGetAll } from '@storage/group/groupsGetAll'
import { useCallback, useState } from 'react'
import { Alert, FlatList } from 'react-native'
import * as S from './styles'

export const Groups = () => {
  const [groups, setGroups] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('new')
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group })
  }

  async function fetchGroups() {
    setIsLoading(true)
    try {
      const data = await groupsGetAll()
      setGroups(data)
    } catch (error) {
      Alert.alert(
        'Turmas',
        'Não foi possível carregar as turmas!'
      )
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
    }, [])
  )

  return (
    <S.Container>
      <Header />

      <Highlight
        subTitle={'Jogue com a sua turma!'}
        title={'Turmas'}
      />

      {
        isLoading ?
          <Loading /> :
          <FlatList
            keyExtractor={item => item}
            contentContainerStyle={groups.length === 0 && { flex: 1 }}
            data={groups}
            ListEmptyComponent={() => <ListEmpty message={'Que tal cadastrar a primeira turma?'} />}
            renderItem={({ item }) => (
              <GroupCard
                onPress={() => handleOpenGroup(item)}
                title={item}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
      }

      <Button
        onPress={handleNewGroup}
        title={'Criar nova Turma'}
      />
    </S.Container>
  )
}
