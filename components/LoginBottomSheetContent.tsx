import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { ReactElement } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"

const LoginBottomSheetContent = (): ReactElement | null => {
  return (
    <View className="p-4 flex flex-col items-center space-y-2">
      <Text className="text-xl font-semibold">Log in to your account</Text>
      <Text className="text-base font-light text-center">
        If you already have an account, please click here to proceed.
      </Text>
      <View className="flex items-center space-y-2 w-full">
        <TouchableOpacity style={{ alignSelf: "stretch" }}>
          <View className="rounded-full bg-gray-100 border border-gray-200 p-2 flex flex-row items-center justify-center space-x-2">
            <Image source={require("../assets/logo-google.png")} style={{ width: 30, height: 30 }} />
            <Text className="text-base font-semibold">
              Continue with Google
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignSelf: "stretch" }}>
          <View className="rounded-full bg-gray-100 border border-gray-200 p-2 flex flex-row items-center justify-center space-x-2">
          <Ionicons name="logo-facebook" size={30} color="#4267B2"/>
            <Text className="text-base font-semibold">
              Continue with Facebook
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignSelf: "stretch" }}>
          <View className="rounded-full bg-gray-100 border border-gray-200 p-2 flex flex-row items-center justify-center space-x-2">
            <MaterialCommunityIcons name="email-outline" size={30}  />
            <Text className="text-base font-semibold">Continue with email</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginBottomSheetContent;
