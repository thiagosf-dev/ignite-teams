import { TouchableOpacity } from 'react-native';
import styled from "styled-components/native";
import { MaterialIcons } from '@expo/vector-icons'

export type ButtonIconTypeStyleProps = 'PRIMARY' | 'SECONDARY'

type Props = {
  type: ButtonIconTypeStyleProps
}

export const Container = styled(TouchableOpacity)`
  align-items: center;
  height: 56px;
  justify-content: center;
  margin-left: 12px;
  width: 56px;
`

export const Icon = styled(MaterialIcons).attrs<Props>(({ theme, type }) => ({
  color: type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED,
  size: 24,
}))``