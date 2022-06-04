import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/loginScreen';
import MapScreen from '../screens/mapScreen';
import Header from '../common/header';
import RegisterScreen from '../screens/registerScreen';

const screens = {
  LoginScreen: {
    screen: LoginScreen,
  },
  RegisterScreen: {
    screen: RegisterScreen,
  },
  MapScreen: {
    screen: MapScreen,
    navigationOptions: ( {navigation}: any ) => {
      return{
        headerTitle: () => <Header title='Map' navigation={navigation} />
      }
    }
  }
};

 const LoginStack = createStackNavigator(screens)
 export default LoginStack;