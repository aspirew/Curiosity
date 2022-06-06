import { createStackNavigator } from 'react-navigation-stack';
import MapScreen from '../screens/mapScreen';
import Header from '../common/header';

const screens = {
  MapScreen: {
    screen: MapScreen,
    navigationOptions: ( {navigation}: any ) => {
      return{
        headerTitle: () => <Header title='Map' navigation={navigation} />,
        detachPreviousScreen: false
      }
    }
  }
};

 const MapStack = createStackNavigator(screens)
 export default MapStack;