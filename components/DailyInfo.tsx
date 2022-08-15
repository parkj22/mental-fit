import { View, Text, Button } from "react-native";
import React, { ReactElement } from "react";

const DailyInfo = (): ReactElement | null => {
  return (
    <View className="h-96 flex justify-center items-center space-y-4">
      <View className="flex items-center">
        <Text className="text-lg font-bold">Period in</Text>
        <Text className="text-5xl font-bold">6 days</Text>
      </View>
      <Text className="text-lg">Low chance of getting pregnant</Text>
      <View className="flex items-center justify-center p-2 py-1 bg-blue-900 rounded-full">
        <Button title="Log period" color="#FFFFFF"></Button>
      </View>
    </View>
  );
};

export default DailyInfo;
