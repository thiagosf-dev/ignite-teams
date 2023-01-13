import { NavigationContainer } from '@react-navigation/native'
import { View } from 'react-native'
import { useTheme } from 'styled-components/native'
import { AppRoutes } from './app.routes'

export const Routes = () => {
  const { COLORS } = useTheme()

  return (
    <View style={{ backgroundColor: COLORS.GRAY_600, flex: 1 }}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  )
}