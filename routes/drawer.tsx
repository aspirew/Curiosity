
import { createDrawerNavigator } from 'react-navigation-drawer';
import HomeStack from './homeStack';
import EventStack from './eventStack';
import { createAppContainer } from 'react-navigation';


//https://stackoverflow.com/questions/67840220/getting-typeerror-interpolate-is-not-a-function-in-react-native
const RootDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack
  },
  Event: {
    screen: EventStack
  }
  
},
{
  drawerPosition : "right"  
});

export default createAppContainer(RootDrawerNavigator);
