import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface ExerciseSliderCustomMarkerProps {
  duration: number;
}

const ExerciseSliderCustomMarker = ({
  duration,
}: ExerciseSliderCustomMarkerProps) => {
  return (
    <View className="flex items-center space-y-0.5">
        <Ionicons name="triangle" size={10} color="#216114" />
    <View className="px-1 rounded-lg border-2 border-[#216114] bg-[#216114] w-16">
      <Text className="font-extrabold text-center text-white">
        {duration}
      </Text>
      <Text className="font-bold text-center text-xs text-white">
        minutes
      </Text>
    </View>
    </View>
  );
};

export default ExerciseSliderCustomMarker;
