import styled, { css } from "styled-components/native";

export const Container = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
`

export const Message = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_300};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.SM}px;
  `}
  text-align: center;
`