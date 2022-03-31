import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/homeScreen';
import LoginScreen from '../screens/loginScreen';
import MapScreen from '../screens/mapScreen';

const screens = {
  HomeScreen: {
    screen: HomeScreen,
  },
  LoginScreen: {
    screen: LoginScreen,
  },
  MapScreen: {
    screen: MapScreen
  }
};

const HomeStack = createStackNavigator(screens)
export default createAppContainer(HomeStack);