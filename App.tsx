import LoginPage from './src/pages/Login';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CadastroPage from './src/pages/User';
import HomePage from './src/pages/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Cadastro" component={CadastroPage} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}
