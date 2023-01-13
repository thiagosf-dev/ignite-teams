import { TouchableOpacity } from 'react-native';
import styled, { css } from "styled-components/native";

export type ButtonTypeStyleProps = 'PRIMARY' | 'SECONDARY'

type Props = {
  type: ButtonTypeStyleProps
}

export const Container = styled(TouchableOpacity) <Props>`
  align-items: center;
  background-color: ${({ theme, type }) => type === 'PRIMARY' ?
    theme.COLORS.GREEN_700 :
    theme.COLORS.RED_DARK};
  border-radius: 6px;
  flex: 1;
  justify-content: center;
  max-height: 56px;
  margin-top: 16px;
  min-height: 56px;
`

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.MD}px;
  `}
`