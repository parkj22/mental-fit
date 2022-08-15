import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { ReactElement, useState } from "react";
import LogContainer from "../LogContainer";
import { LogFormProps } from "../../types/user-log-data";
import {
  Entypo,
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";

const MAX_LEN_PRIORITY_ARRAY = 3;

const GoalPriorityForm = ({
  prevUserLog,
  updateUserLog,
  currentFormState,
  updateLogFormState,
  formIndex,
}: LogFormProps): ReactElement | null => {
  const [priorityArray, setPriorityArray] = useState<string[]>([]);

  const appendEmptyGratitude = (): boolean => {
    if (priorityArray.length >= MAX_LEN_PRIORITY_ARRAY) {
      return false;
    }
    setPriorityArray([...priorityArray, ""]);
    return true;
  };

  const modifyGratitude = (newText: string, index: number): boolean => {
    if (index < 0 || index >= priorityArray.length) {
      return false;
    }
    const newGratitudeArray = [...priorityArray];
    newGratitudeArray[index] = newText;
    setPriorityArray(newGratitudeArray);
  };

  const removeGratitude = (index: number): boolean => {
    if (index < 0 || index >= priorityArray.length) {
      return false;
    }
    setPriorityArray(priorityArray.filter((_, i) => i !== index));
  };

  const resetForm = (): void => {
    setPriorityArray([]);
    const newUserLog = { ...prevUserLog };
    delete newUserLog.priorities;
    updateUserLog(newUserLog);

    updateLogFormState(formIndex, false);
  };

  const handleSave = (): boolean => {
    if (!updateUserLog) {
      return false;
    }
    updateUserLog({
      ...prevUserLog,
      priorities: priorityArray,
    });
    updateLogFormState(formIndex, true);
    return true;
  };

  return (
    <LogContainer key={6} bgColor="bg-[#F7D8BA]">
      <Text className="text-2xl font-bold text-[#4e2b09] pt-1">
        Action expresses priorities.
      </Text>
      <View
        className="pt-1.5 pl-0.5 pr-1.5 flex space-y-1 rounded-xl bg-[#fefae7]"
        style={{ height: 152 }}
      >
        {priorityArray.map((gratitude, i) => (
          <View key={i} className="flex flex-row items-center space-x-1">
            {gratitude != "" && !currentFormState? (
              <TouchableOpacity
                onPress={() => {
                  removeGratitude(i);
                }}
              >
                <View className="px-[9px]">
                  <FontAwesome name="minus" size={15} color="#4e2b09" />
                </View>
              </TouchableOpacity>
            ) : (
              <Entypo name="dot-single" size={30} color="#4e2b09" />
            )}
            {i != priorityArray.length - 1 || currentFormState ? (
              <View className="flex-1 h-11 px-3 pt-0.5 rounded-md bg-[#F7D8BA] flex justify-center">
                <Text className="text-[#4e2b09] text-base font-semibold">
                  {gratitude}
                </Text>
              </View>
            ) : (
              <TextInput
                className="flex-1 h-11 px-3 pb-1 rounded-md bg-[#ffe9cd] text-[#714100] text-base font-semibold"
                onChangeText={(text) => {
                  modifyGratitude(text, i);
                }}
                value={gratitude}
                placeholder="I'm planning to..."
              />
            )}
          </View>
        ))}
        {priorityArray.length < MAX_LEN_PRIORITY_ARRAY && !currentFormState ? (
          <View className="flex flex-row items-center space-x-1">
            <Entypo name="dot-single" size={30} color="#4e2b09" />
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={appendEmptyGratitude}
              disabled={
                !(priorityArray.length == 0) &&
                !(priorityArray[priorityArray.length - 1] != "")
              }
            >
              <View className="h-11 rounded-md flex items-center justify-center bg-[#f0b780]">
                <MaterialCommunityIcons
                  name="lightbulb"
                  size={30}
                  color="#4e2b09"
                />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View></View> // {expression && (JSX element)} not working here, so empty ternary operator is used instead
        )}
      </View>
      <View className="flex flex-row justify-end items-center space-x-2">
        <TouchableOpacity onPress={resetForm}>
          <View
            className={`px-4 py-3 bg-[#e5801f] rounded-xl`} // Color darkened 40%
          >
            <Text className={`text-lg font-semibold text-white`}>Reset</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSave}
          disabled={priorityArray.length <= 0 || priorityArray[0] == "" || currentFormState}
        >
          <View
            className={`w-[73px] px-4 py-3 bg-[#eeac6c] rounded-xl ${
              // Color darkened 20%
              priorityArray.length > 0 &&
              priorityArray[0] != "" &&
              "bg-[#61350b]" // Color darkened 75%
            }`}
          >
            {currentFormState ? (
              <View className="flex items-center">
                <Ionicons name="checkmark" size={26} color="white" />
              </View>
            ) : (
              <Text
                className={`text-lg font-semibold text-[#c26b16] ${
                  // Color darkened 40%
                  priorityArray.length > 0 &&
                  priorityArray[0] != "" &&
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

export default GoalPriorityForm;
