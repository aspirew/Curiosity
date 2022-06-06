import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/loginScreen';
import Header from '../common/header';
import RegisterScreen from '../screens/registerScreen';
import MapScreen from '../screens/mapScreen';

const screens = {
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: ( {navigation}: any ) => {
      return{
        headerTitle: () => <Header title='Login' hamburger={false} navigation={navigation} />
      }
    }
  },
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: ( {navigation}: any ) => {
      return{
        headerTitle: () => <Header title='Register'  navigation={navigation} />
      }
    }
  }
};

 const LoginStack = createStackNavigator(screens)
 export default LoginStack;