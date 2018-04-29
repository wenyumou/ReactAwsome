import React from 'react';
import { TabNavigator, TabBarBottom, StackNavigator, DrawerNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/home';
import SettingsScreen from './screens/settings';
import ListScreen from './screens/list';
import DetailScreen from './screens/detail';
import AboutScreen from './screens/about';
import jg from './jg';


class HymnsList extends ListScreen{
  constructor(props){
    super(props);
  }
  state={
    contentTypeID:279
  }
};
class NewsList extends ListScreen{
  constructor(props){
    super(props);
  }
  state={
    contentTypeID:345
  }
};

const HomeStack = StackNavigator({
  Home: { screen: HomeScreen,
    navigationOptions:{
      title:'Home'
    }
  },
});

const HymnsStack = StackNavigator({
  List: { screen: HymnsList,
    navigationOptions:{
      title:'Hymns'
    }
  },
  Detail:{screen:DetailScreen}

});
const NewsStack = StackNavigator({
  List: { screen: NewsList,
    navigationOptions:{
      title:'News'
    }
  },
  Detail:{screen:DetailScreen}

});

export default TabNavigator(
  {
    Home: { screen: HomeStack},
    Hymns: { screen: HymnsStack },
    News: { screen: NewsStack },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Hymns') {
          iconName = `ios-headset${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'News') {
          iconName = `ios-list${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
      
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false
  }
);

// export default DrawerNavigator({
//   Tab: {
//       screen: tabNav,
//       navigationOptions: {
//           drawerLabel: "Home",
//           drawerIcon: ({ tintColor }) => <Ionicons name="ios-home" size={24} />
//       },
//   },
//   Settings:{
//     screen:SettingsScreen,
//     navigationOptions:{
//       drawerLabel: "Settings",
//       drawerIcon: ({ tintColor }) => <Ionicons name="ios-settings" size={24} />
//     }
//   },
//   About:{
//     screen:AboutScreen,
//     navigationOptions:{
//       drawerLabel: "About Us",
//       drawerIcon: ({ tintColor }) => <Ionicons name="ios-information" size={24} />
//     }
    
//   }

// });
 