import { View, Text, TouchableOpacity } from "react-native";
import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import LogContainer from "../LogContainer";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { LogFormProps } from "../../types/user-log-data";

const SleepForm = ({
  prevUserLog,
  updateUserLog,
  currentFormState,
  updateLogFormState,
  formIndex,
}: LogFormProps): ReactElement | null => {
  const [isBedTimePickerVisible, setBedTimePickerVisibility] =
    useState<boolean>(false);
  const [isWakeUpTimePickerVisible, setWakeUpTimePickerVisibility] =
    useState<boolean>(false);
  const [bedTime, setBedTime] = useState<Date | null>(null);
  const [wakeUpTime, setWakeUpTime] = useState<Date | null>(null);

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
    setTime(time);
    hideTimePicker(setTimePickerVisibility);
  };

  const resetForm = (): void => {
    setBedTime(null);
    setWakeUpTime(null);

    // Clear log
    const newUserLog = { ...prevUserLog };
    delete newUserLog.bedTime;
    delete newUserLog.wakeUpTime;
    delete newUserLog.sleepDurationMinutes;

    updateUserLog(newUserLog);
    updateLogFormState(formIndex, false);
  };

  const calculateSleepDurationInMinutes = (
    time1: Date,
    time2: Date
  ): number => {
    // Get both times in minutes
    let minutes1 = Math.floor(time1.getTime() / 60000);
    let minutes2 = Math.floor(time2.getTime() / 60000);

    // Consider the case where wake up time is AM and bed time is PM
    if (minutes1 > minutes2) {
      minutes2 += 1440; // Add 24 hours
    }

    // Return the difference
    return minutes2 - minutes1;
  };

  const handleSave = (): boolean => {
    if (!updateUserLog || !bedTime || !wakeUpTime) {
      return false;
    }
    updateUserLog({
      ...prevUserLog,
      bedTime: bedTime,
      wakeUpTime: wakeUpTime,
      sleepDurationMinutes: calculateSleepDurationInMinutes(
        bedTime,
        wakeUpTime
      ),
    });
    updateLogFormState(formIndex, true);
    return true;
  };

  return (
    <LogContainer bgColor="bg-[#ACDDDE]">
      <View>
        <Text className="text-2xl font-bold text-[#163838] py-1">
          Sleep solves everything.
        </Text>
        <Text className="text-xl font-light text-[#163838]">
          How many hours did you sleep last night?
        </Text>
        <View className="flex flex-row items-center justify-center space-x-2 py-6">
          <TouchableOpacity
            onPress={() => {
              showTimePicker(setBedTimePickerVisibility);
            }}
            disabled={currentFormState}
          >
            <View className="p-1 px-4 rounded-xl border-2 border-[#225455] flex items-center">
              <Ionicons name="bed-outline" size={30} color="#163838" />
              <Text className="font-semibold text-center text-[#163838] text-lg">
                {bedTime
                  ? bedTime.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    })
                  : "No input"}
              </Text>
            </View>
          </TouchableOpacity>
          <Ionicons name="pulse-outline" size={25} color="#163838" />
          <TouchableOpacity
            onPress={() => {
              showTimePicker(setWakeUpTimePickerVisibility);
            }}
            disabled={currentFormState}
          >
            <View className="p-1 px-4 rounded-xl border-2 border-[#225455] flex items-center">
              <Ionicons name="alarm-outline" size={30} color="#163838" />
              <Text
                className={`font-semibold text-center text-[#163838] text-lg`}
              >
                {wakeUpTime
                  ? wakeUpTime.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    })
                  : "No input"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isBedTimePickerVisible}
          mode="time"
          locale="en-US"
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
          locale="en-US"
          onConfirm={(time) => {
            handleChange(time, setWakeUpTime, setWakeUpTimePickerVisibility);
          }}
          onCancel={() => {
            hideTimePicker(setWakeUpTimePickerVisibility);
          }}
        />
      </View>
      <View className="flex flex-row justify-end items-center space-x-2">
        <TouchableOpacity onPress={resetForm}>
          <View
            className={`px-4 py-3 bg-[#43a7a9] rounded-xl`} // Color darkened 40%
          >
            <Text className={`text-lg font-semibold text-white`}>Reset</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSave}
          disabled={!bedTime || !wakeUpTime || currentFormState}
        >
          <View
            className={`w-[73px] px-4 py-3 bg-[#74c6c8] rounded-xl ${
              // Color darkened 20%
              bedTime && wakeUpTime && "bg-[#1c4646]" // Color darkened 75%
            }`}
          >
            {currentFormState ? (
              <View className="flex items-center">
                <Ionicons name="checkmark" size={26} color="white" />
              </View>
            ) : (
              <Text
                className={`text-lg font-semibold text-[#388b8d] ${
                  // Color darkened 40%
                  bedTime && wakeUpTime && "text-white"
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

export default SleepForm;
