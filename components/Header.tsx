import { View, Image, Text, Pressable, TouchableOpacity } from "react-native";
import React, { ReactElement } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import "tailwindcss-react-native/types.d";  // Need to add this type file to use 'className' prop

type HeaderProps = {
  screenName: string,
}

const Header = ({ screenName }: HeaderProps): ReactElement | null => {
  // TODO: Implement press handlers
  const onProfilePress = () => {};
  const onCalendarPress = () => {};
  const onNotificationsPress = () => {};

  return (
    <View className="flex flex-row items-center px-4 py-1">
      <Pressable onPress={onProfilePress}>
        <Image
          source={{
            // TODO: Replace this temporary user profile pic
            uri: "https://lh3.googleusercontent.com/a/AItbvmmUHkzpj1JAdkzyOabjy5bGUE-24arb__Z-Mga8=s96-c",
          }}
          className="h-8 w-8 rounded-full"
        />
      </Pressable>
      <View className="flex-1">
        {screenName == "Home" && (
          <View className="flex flex-row justify-end space-x-4">
            <Pressable onPress={onCalendarPress}>
              <TouchableOpacity>
                <View className="flex flex-row items-center space-x-1">
                  <Text className="text-base">July</Text>
                  <Ionicons name="calendar-outline" size={30} color="#00034C" />
                </View>
              </TouchableOpacity>
            </Pressable>
            <Pressable onPress={onNotificationsPress}>
              <TouchableOpacity>
                <Ionicons
                  name="notifications-outline"
                  size={30}
                  color="#00034C"
                />
              </TouchableOpacity>
            </Pressable>
          </View>
        )}

        {/* Customize Header component for each screen */}
        {screenName == "Insights" && <View></View>}
        {screenName == "Community" && <View></View>}
      </View>
    </View>
  );
};

export default Header;
