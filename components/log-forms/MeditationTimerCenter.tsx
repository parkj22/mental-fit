import { View, Text, TouchableOpacity } from "react-native";
import React, { Dispatch, ReactElement, SetStateAction } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface MeditationTimerCenterProps {
  remainingTime: number;
  timerIsPlaying: boolean;
  setTimerIsPlaying: Dispatch<SetStateAction<boolean>>;
  meditationComplete: boolean;
}

const MeditationTimerCenter = ({
  remainingTime,
  timerIsPlaying,
  setTimerIsPlaying,
  meditationComplete,
}: MeditationTimerCenterProps): ReactElement | null => {
  const toggleTimerIsPlaying = () => {
    if (meditationComplete) {
      return;
    }
    setTimerIsPlaying(!timerIsPlaying);
  };

  return (
    <TouchableOpacity onPress={toggleTimerIsPlaying}>
      <View className="rounded-full p-6">
        {meditationComplete ? (
          <MaterialCommunityIcons name="check" size={55} color="#8a7204" />
        ) : (
          <View>
            {timerIsPlaying ? (
              <Text className="text-3xl font-bold text-[#735f03]">
                {remainingTime}
              </Text>
            ) : (
              <MaterialCommunityIcons
                name="meditation"
                size={55}
                color="#8a7204"
              />
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MeditationTimerCenter;
