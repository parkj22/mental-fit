import { View, Text, Button, Pressable } from "react-native";
import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import PagerView from "react-native-pager-view";
import { StyleSheet } from "react-native";
import LogContainer from "./LogContainer";
import Feather from "@expo/vector-icons/Feather";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type UserLogData = {
  sleepDuration?: number;
  breakfast?: boolean;
  lunch?: boolean;
  dinner?: boolean;
  waterConsumed?: number;
  exerciseDuration?: number;
  meditated?: boolean;
  gratitude?: string[];
  priorities?: string[];
};

const LogView = (): ReactElement | null => {
  const [userLog, updateUserLog] = useState<UserLogData>();
  const [isBedTimePickerVisible, setBedTimePickerVisibility] =
    useState<boolean>(false);
  const [isWakeUpTimePickerVisible, setWakeUpTimePickerVisibility] =
    useState<boolean>(false);
  const [bedTime, setBedTime] = useState<Date>(new Date());
  const [wakeUpTime, setWakeUpTime] = useState<Date>(new Date());

  const showTimePicker = (
    setTimePickerVisibility: Dispatch<SetStateAction<boolean>>
  ): void => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = (
    setTimePickerVisibility: Dispatch<SetStateAction<boolean>>
  ): void => {
    setTimePickerVisibility(false);
  };
  const handleChange = (
    time: Date,
    setTime: Dispatch<SetStateAction<Date>>,
    setTimePickerVisibility: Dispatch<SetStateAction<boolean>>
  ) => {
    // TODO: Log the outputted time here
    setTime(time);
    hideTimePicker(setTimePickerVisibility);
  };

  return (
    <View className="h-96">
      <PagerView style={styles.container} initialPage={0}>
        <LogContainer key={1}>
          <View className="h-full w-full flex items-center justify-center space-y-4">
            <View className="flex items-center justify-center">
              <Text className="text-3xl font-bold py-2">Track your mind.</Text>
              <Text className="text-xl font-light">How is your day going?</Text>
            </View>
            <View className="flex flex-row items-center">
              <Text className="font-light text-lg text-blue-800">
                Swipe to continue
              </Text>
              <Feather name="chevron-right" size={30} color="#1565C0" />
            </View>
          </View>
        </LogContainer>

        <LogContainer key={2} bgColor="bg-[#ACDDDE]">
          <Text className="text-2xl font-bold text-[#163838] py-2">
            Make sleep a priority.
          </Text>
          <Text className="text-xl font-light text-[#163838]">
            How many hours did you sleep last night?
          </Text>
          <Pressable
            onPress={() => {
              showTimePicker(setBedTimePickerVisibility);
            }}
          >
            <Text>When did you go to bed?</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              showTimePicker(setWakeUpTimePickerVisibility);
            }}
          >
            <Text>When did you wake up?</Text>
            <Text>Bed Time: {bedTime.toLocaleTimeString()}</Text>
            <Text>Wake up Time: {wakeUpTime.toLocaleTimeString()}</Text>
          </Pressable>
          <DateTimePickerModal
            isVisible={isBedTimePickerVisible}
            mode="time"
            onConfirm={(time) => {
              handleChange(time, setBedTime, setBedTimePickerVisibility);
            }}
            onCancel={() => {
              hideTimePicker(setBedTimePickerVisibility);
            }}
          />
          <DateTimePickerModal
            isVisible={isWakeUpTimePickerVisible}
            mode="time"
            onConfirm={(time) => {
              handleChange(time, setWakeUpTime, setWakeUpTimePickerVisibility);
            }}
            onCancel={() => {
              hideTimePicker(setWakeUpTimePickerVisibility);
            }}
          />
        </LogContainer>

        <LogContainer key={3} bgColor="bg-[#CAF1DE]">
          <Text className="text-2xl font-bold text-[#13462d] py-2">
            Eat healthy, regular meals and stay hydrated.
          </Text>
        </LogContainer>

        <LogContainer key={4} bgColor="bg-[#E1F8DC]">
          <Text className="text-2xl font-bold text-[#1b4e10] py-2">
            Get regular exercise.
          </Text>
        </LogContainer>

        <LogContainer key={5} bgColor="bg-[#FEF8DD]">
          <Text className="text-2xl font-bold text-[#5c4c03] py-2">
            Brilliant things happen in calm minds.
          </Text>
        </LogContainer>

        <LogContainer key={6} bgColor="bg-[#FFE7C7]">
          <Text className="text-2xl font-bold text-[#5b3400] py-2">
            Recognize the good in your life.
          </Text>
        </LogContainer>

        <LogContainer key={7} bgColor="bg-[#F7D8BA]">
          <Text className="text-2xl font-bold text-[#4e2b09] py-2">
            Set goals and priorities.
          </Text>
        </LogContainer>
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LogView;
