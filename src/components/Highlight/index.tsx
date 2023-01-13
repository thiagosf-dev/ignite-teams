import * as S from './styles'

type Props = {
  subTitle: string
  title: string
}

export const Highlight = ({
  subTitle,
  title
}: Props) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.SubTitle>{subTitle}</S.SubTitle>
    </S.Container>
  )
}
