import 'react-native-gesture-handler';
import * as React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CompleteScreen from './components/CompleteScreen';
import AllScreen from './components/AllScreen';
import ActiveScreen from './components/ActiveScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="All" >
        <Tab.Screen
          name="Complete"
          component={CompleteScreen}
          options={{
            tabBarLabel: "Complete",
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = focused ?
                (Platform.OS === "android" ? "md-checkmark-done" : "ios-checkmark-done") :
                (Platform.OS === "android" ? "md-checkmark-done-outline" : "ios-checkmark-done-outline");

              return <Ionicons name={iconName} size={size} color={color} />;
            }
          }} />
        <Tab.Screen
          name="All"
          component={AllScreen}
          options={{
            tabBarLabel: "All",
            tabBarIcon: ({ size, color }) => {
              let iconName = "pluscircleo";

              return (<AntDesign name={iconName} size={size} color={color} />);
            }
          }} />
        <Tab.Screen
          name="Active"
          component={ActiveScreen}
          options={{
            tabBarLabel: "Active",
            tabBarIcon: ({ size, color }) => {
              let iconName = "sliders";

              return (<FontAwesome name={iconName} size={size} color={color} />);
            }
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;