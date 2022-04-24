import { createStackNavigator } from 'react-navigation-stack';
import Header from '../common/header';
import EventCreationScreen from '../screens/eventCreationScreen';
import EventViewScreen from '../screens/eventViewScreen';

const screens = {
  EventCreationScreen: {
    screen: EventCreationScreen,
    navigationOptions: ( {navigation}: any ) => {
      return{
        headerTitle: () => <Header title='Event Creation' navigation={navigation} />
        
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
  }
};

 const EventStack = createStackNavigator(screens)
 export default EventStack;