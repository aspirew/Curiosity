import { createStackNavigator } from 'react-navigation-stack';
import Header from '../common/header';
import EventCreationScreen from '../screens/eventCreationScreen';

const screens = {
  EventCreationScreen: {
    screen: EventCreationScreen,
    navigationOptions: ( {navigation}: any ) => {
      return{
        headerTitle: () => <Header title='Event Creation' navigation={navigation} />
      }
    }
  }
};

 const EventStack = createStackNavigator(screens)
 export default EventStack;