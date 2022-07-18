import { View, Image, Text, Pressable, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const Header = ({ screenName }) => {
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
                  <Ionicons name="calendar-outline" size="30" color="#00034C" />
                </View>
              </TouchableOpacity>
            </Pressable>
          </View>
        )}

        {/* Customize Header component for each screen */}
        {screenName == "Insights" && 
          <View className="flex-row items-center space-x-4 pb-2 mx-4">
            <View className="flex-row flex-1 space-x-4 bg-gray-200 p-3 rounded-full">
              <Ionicons name="search-outline" size="20" color="gray" />
              <TextInput
                placeholder="What's New!"
                keyboardType="default"
              />
            </View>
          </View>
        }
        {screenName == "Community" && <View></View>}
      </View>
      <Pressable onPress={onNotificationsPress}>
        <TouchableOpacity>
          <Ionicons
            name="notifications-outline"
            size="30"
            color="#00034C"
          />
        </TouchableOpacity>
      </Pressable>
    </View>
  );
};

export default Header;
