import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ReactElement, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./screens/Main";
import Login from "./screens/Login";
import SplashScreen from "./screens/SplashScreen";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const Stack = createNativeStackNavigator();

export default function App(): ReactElement | null {
  const [authState, setAuthState] = useState<
    "isLoading" | "isAuthenticated" | "isNotAuthenticated"
  >("isLoading");
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User): void => {
      if (user) {
        setUserInfo(user);
        setAuthState("isAuthenticated");
      } else {
        setAuthState("isNotAuthenticated");
      }
    });

    return unsubscribe;
  }, []);

  if (authState == "isLoading") {
    return <SplashScreen />
  }

  return (
    <NavigationContainer>
      <TailwindProvider>
        <Stack.Navigator>

          {/* Screens for unauthenticated users */}
          {authState == "isNotAuthenticated" && (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
            </>
          )}

          {/* Screens for authenticated users */}
          {authState == "isAuthenticated" && (
            <>
              <Stack.Screen
                name="Main"
                component={Main}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </TailwindProvider>
    </NavigationContainer>
  );
}
