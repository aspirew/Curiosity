
import { createDrawerNavigator } from 'react-navigation-drawer';
import EventStack from './eventStack';
import { createAppContainer } from 'react-navigation';
import ProfileStack from './profileStack';
import LoginStack from './loginStack';


//https://stackoverflow.com/questions/67840220/getting-typeerror-interpolate-is-not-a-function-in-react-native
const RootDrawerNavigator = createDrawerNavigator({
  Login: {
    screen: LoginStack
  },
  Event: {
    screen: EventStack
  },
  Profile: {
    screen: ProfileStack
  },
},
{
  drawerPosition : "right"  
});

export default createAppContainer(RootDrawerNavigator);
