import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/homeScreen';
import LoginScreen from '../screens/loginScreen';
import MapScreen from '../screens/mapScreen';
import EventCreationScreen from '../screens/eventCreationScreen';
import Header from '../common/header';


const screens = {
  HomeScreen: {
    screen: HomeScreen,
  },
  LoginScreen: {
    screen: LoginScreen,
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

 const HomeStack = createStackNavigator(screens)
 export default HomeStack;