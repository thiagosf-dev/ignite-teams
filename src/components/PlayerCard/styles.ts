import styled, { css } from "styled-components/native";
import { MaterialIcons } from '@expo/vector-icons'

export const Container = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
  border-radius: 10px;
  flex-direction: row;
  height: 56px;
  margin-bottom: 16px;
  width: 100%;
`
export const Name = styled.Text`
  flex: 1;
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_200};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`

export const Icon = styled(MaterialIcons).attrs(({ theme }) => ({
  color: theme.COLORS.GRAY_200,
  size: 24,
}))`
  margin-left: 16px;
  margin-right: 4px;
`