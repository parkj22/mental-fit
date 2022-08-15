import React, { ReactElement } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CommunityScreen from './CommunityScreen';
import HomeScreen from './HomeScreen';
import InsightsScreen from './InsightsScreen';

const Tab = createBottomTabNavigator();

const Main = (): ReactElement | null => {

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          // Set icons for each screens
          if (route.name == "Home") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name == "Insights") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name == "Community") {
            iconName = focused ? "people" : "people-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#00034C",  // TODO: arbitrary color used
        tabBarInactiveTintColor: "gray",  //  TODO: arbitrary color used
      })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Insights" component={InsightsScreen} />
        <Tab.Screen name="Community" component={CommunityScreen} />
      </Tab.Navigator>
  )
}

export default Main;