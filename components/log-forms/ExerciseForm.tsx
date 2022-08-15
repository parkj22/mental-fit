import { View, Text, TouchableOpacity } from "react-native";
import React, { ReactElement, useState } from "react";
import LogContainer from "../LogContainer";
import { LogFormProps } from "../../types/user-log-data";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import ExerciseSliderCustomMarker from "./ExerciseSliderCustomMarker";
import { Ionicons } from "@expo/vector-icons";

interface ExerciseFormProps extends LogFormProps {
  enableOuterScroll: () => void;
  disableOuterScroll: () => void;
  enablePagerScroll: () => void;
  disablePagerScroll: () => void;
}

const ExerciseForm = ({
  prevUserLog,
  updateUserLog,
  enableOuterScroll,
  disableOuterScroll,
  enablePagerScroll,
  disablePagerScroll,
  currentFormState,
  updateLogFormState,
  formIndex,
}: ExerciseFormProps): ReactElement | null => {
  const [exerciseDurationInMinutes, setExerciseDurationInMinutes] =
    useState<number>(0);

  const handleSliderChange = (value: number[]): void => {
    setExerciseDurationInMinutes(value[0]);
  };

  const resetForm = (): void => {
    setExerciseDurationInMinutes(0);

    const newUserLog = { ...prevUserLog };
    delete newUserLog.exerciseDurationInMinutes;
    updateUserLog(newUserLog);

    updateLogFormState(formIndex, false);
  };

  const handleSave = (): boolean => {
    if (!updateUserLog) {
      return false;
    }
    updateUserLog({
      ...prevUserLog,
      exerciseDurationInMinutes: exerciseDurationInMinutes,
    });
    updateLogFormState(formIndex, true);
    return true;
  };

  return (
    <LogContainer bgColor="bg-[#E1F8DC]">
      <View>
        <Text className="text-2xl font-bold text-[#1b4e10] py-1">
          Slow progress is better than no progress.
        </Text>
        <Text className="font-light text-xl text-[#1b4e10]">
          How long did you workout today?
        </Text>
      </View>
      <View className="mb-12">
        <View className="flex flex-row justify-between pb-0.5">
          <Text className="font-semibold text-xs pl-4 text-[#1b4e10]">0m</Text>
          <Text className="font-semibold text-xs text-[#1b4e10]">30m</Text>
          <Text className="font-semibold text-xs text-[#1b4e10]">1h</Text>
          <Text className="font-semibold text-xs text-[#1b4e10]">1h 30m</Text>
          <Text className="font-semibold text-xs pr-3 text-[#1b4e10]">+2h</Text>
        </View>
        <View className="flex items-center">
          <MultiSlider
            min={0}
            max={120}
            step={1}
            sliderLength={240}
            onValuesChangeStart={() => {
              disableOuterScroll();
              disablePagerScroll();
            }}
            onValuesChangeFinish={() => {
              enableOuterScroll();
              enablePagerScroll();
            }}
            onValuesChange={handleSliderChange}
            trackStyle={{
              height: 24,
              backgroundColor: "transparent",
            }}
            selectedStyle={{
              backgroundColor: "#216114",
            }}
            containerStyle={{
              padding: 2,
              borderWidth: 2,
              borderColor: "#216114",
              height: 32,
              width: 248,
            }}
            customMarker={() => (
              <ExerciseSliderCustomMarker
                duration={exerciseDurationInMinutes}
              />
            )}
            markerOffsetY={56}
            enabledOne={!currentFormState}
          />
        </View>
      </View>
      <View className="flex flex-row justify-end items-center space-x-2">
        <TouchableOpacity onPress={resetForm}>
          <View
            className={`px-4 py-3 bg-[#5bd940] rounded-xl`} // Color darkened 40%
          >
            <Text className={`text-lg font-semibold text-white`}>Reset</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} disabled={currentFormState}>
          <View
            className={`w-[73px] px-4 py-3 bg-[#9ee88e] rounded-xl ${
              // Color darkened 20%
              "bg-[#216114]" // Color darkened 75%
            }`}
          >
            {currentFormState ? (
              <View className="flex items-center">
                <Ionicons name="checkmark" size={26} color="white" />
              </View>
            ) : (
              <Text
                className={`text-lg font-semibold text-[#5bd940] ${
                  // Color darkened 40%
                  "text-white"
                }`}
              >
                Save
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </LogContainer>
  );
};

export default ExerciseForm;
