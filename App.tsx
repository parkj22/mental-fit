import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import InsightsScreen from "./screens/InsightsScreen";
import CommunityScreen from "./screens/CommunityScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ReactElement } from "react";


const Tab = createBottomTabNavigator();

export default function App(): ReactElement | null {
  return (
    <NavigationContainer>
      <TailwindProvider>
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
      </TailwindProvider>
    </NavigationContainer>
  );
}
