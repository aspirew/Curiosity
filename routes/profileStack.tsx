import { createStackNavigator } from 'react-navigation-stack';
import Header from '../common/header';
import EventViewScreen from '../screens/eventViewScreen';
import MapScreen from '../screens/mapScreen';
import ProfileScreen from '../screens/profileScreen';

const screens = {
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: ( {navigation}: any ) => {
      return{
        headerTitle: () => <Header title='Profile' navigation={navigation} />     
      }
    }
  },
  EventViewScreen : {
    screen: EventViewScreen,
    navigationOptions: ( {navigation}: any ) => {
      return{
        headerTitle: () => <Header title='Event List' navigation={navigation} />
      }
    }
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

 const ProfileStack = createStackNavigator(screens)
 export default ProfileStack;