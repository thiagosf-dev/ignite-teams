import { TouchableProps } from 'react-native-svg'
import * as S from './styles'

type Props = TouchableProps & {
  title: string
  type?: S.ButtonTypeStyleProps
}

export const Button = ({
  title,
  type = 'PRIMARY',
  ...rest
}: Props) => {
  return (
    <S.Container
      type={type}
      {...rest}
    >
      <S.Title>
        {title}
      </S.Title>
    </S.Container>
  )
}
