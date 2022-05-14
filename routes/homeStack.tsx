import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/homeScreen';
import LoginScreen from '../screens/loginScreen';
import MapScreen from '../screens/mapScreen';
import EventCreationScreen from '../screens/eventCreationScreen';

const screens = {
  HomeScreen: {
    screen: HomeScreen,
  },
  LoginScreen: {
    screen: LoginScreen,
  },
  MapScreen: {
    screen: MapScreen
  },
  EventCreationScreen : {
    screen: EventCreationScreen
  }
};

const HomeStack = createStackNavigator(screens)
export default createAppContainer(HomeStack);