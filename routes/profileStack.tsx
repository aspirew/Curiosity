import { createStackNavigator } from 'react-navigation-stack';
import Header from '../common/header';
import MapScreen from '../screens/mapScreen';
import ProfileScreen from '../screens/profileScreen';

const screens = {
  ProfileScreen: {
    screen: ProfileScreen,
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