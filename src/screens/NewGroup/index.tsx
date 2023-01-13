import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native'
import { groupCreate } from '@storage/group/groupCreate'
import { AppError } from '@utils/AppError'
import { useState } from 'react'
import { Alert } from 'react-native'
import * as S from './styles'

export const NewGroup = () => {
  const [group, setGroup] = useState('')

  const navigation = useNavigation()

  async function handleNew() {
    try {
      if (group.trim().length <= 0) return Alert.alert(
        'Novro Grupo',
        'Por favor informe um nome para o grupo'
      )
      await groupCreate(group)
      navigation.navigate('players', { group })
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert(
          'Novo Grupo',
          error.message
        )
      }
      Alert.alert(
        'Novo Grupo',
        'Ocorreu um erro ao tentar realizar o cadastro! Tente novamente.'
      )
      console.error(error);
    }
  }

  return (
    <S.Container>
      <Header showBackButton />

      <S.Content>
        <S.Icon />

        <Highlight
          subTitle={'Crie um turma para adicionar pessoas'}
          title={'Nova turma'}
        />

        <Input
          onChangeText={setGroup}
          value={group}
        />

        <Button
          onPress={handleNew}
          title={'Criar'}
        />
      </S.Content>
    </S.Container>
  )
}