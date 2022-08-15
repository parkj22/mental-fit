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

const MAX_LEN_GRATITUDE_ARRAY = 3;

const GratitudeForm = ({
  prevUserLog,
  updateUserLog,
  currentFormState,
  updateLogFormState,
  formIndex,
}: LogFormProps): ReactElement | null => {
  const [gratitudeArray, setGratitudeArray] = useState<string[]>([]);

  const appendEmptyGratitude = (): boolean => {
    if (gratitudeArray.length >= MAX_LEN_GRATITUDE_ARRAY) {
      return false;
    }
    setGratitudeArray([...gratitudeArray, ""]);
    return true;
  };

  const modifyGratitude = (newText: string, index: number): boolean => {
    if (index < 0 || index >= gratitudeArray.length) {
      return false;
    }
    const newGratitudeArray = [...gratitudeArray];
    newGratitudeArray[index] = newText;
    setGratitudeArray(newGratitudeArray);
  };

  const removeGratitude = (index: number): boolean => {
    if (index < 0 || index >= gratitudeArray.length) {
      return false;
    }
    setGratitudeArray(gratitudeArray.filter((_, i) => i !== index));
  };

  const resetForm = (): void => {
    setGratitudeArray([]);
    const newUserLog = { ...prevUserLog };
    delete newUserLog.gratitudes;
    updateUserLog(newUserLog);

    updateLogFormState(formIndex, false);
  };

  const handleSave = (): boolean => {
    if (!updateUserLog) {
      return false;
    }
    updateUserLog({
      ...prevUserLog,
      gratitudes: gratitudeArray,
    });
    updateLogFormState(formIndex, true);
    return true;
  };

  return (
    <LogContainer key={6} bgColor="bg-[#FFE7C7]">
      <Text className="text-2xl font-bold text-[#5b3400] pt-1">
        Recognize the good in your life.
      </Text>
      <View
        className="pt-1.5 pl-0.5 pr-1.5 flex space-y-1 rounded-xl bg-[#fefae7]"
        style={{ height: 152 }}
      >
        {gratitudeArray.map((gratitude, i) => (
          <View key={i} className="flex flex-row items-center space-x-1">
            {gratitude != "" && !currentFormState ? (
              <TouchableOpacity
                onPress={() => {
                  removeGratitude(i);
                }}
              >
                <View className="px-[9px]">
                  <FontAwesome name="minus" size={15} color="#714100" />
                </View>
              </TouchableOpacity>
            ) : (
              <Entypo name="dot-single" size={30} color="#714100" />
            )}
            {i != gratitudeArray.length - 1 || currentFormState ? (
              <View className="flex-1 h-11 px-3 pt-0.5 rounded-md bg-[#FFE7C7] flex justify-center">
                <Text className="text-[#714100] text-base font-semibold">
                  {gratitude}
                </Text>
              </View>
            ) : (
              <TextInput
                className="flex-1 h-11 px-3 pb-1 rounded-md bg-[#fff1dd] text-[#714100] text-base font-semibold"
                onChangeText={(text) => {
                  modifyGratitude(text, i);
                }}
                value={gratitude}
                placeholder="I'm grateful for..."
              />
            )}
          </View>
        ))}
        {gratitudeArray.length < MAX_LEN_GRATITUDE_ARRAY && !currentFormState ? (
          <View className="flex flex-row items-center space-x-1">
            <Entypo name="dot-single" size={30} color="#714100" />
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={appendEmptyGratitude}
              disabled={
                !(gratitudeArray.length == 0) &&
                !(gratitudeArray[gratitudeArray.length - 1] != "")
              }
            >
              <View className="h-11 rounded-md flex items-center justify-center bg-[#ffca83]">
                <MaterialCommunityIcons
                  name="pencil"
                  size={30}
                  color="#714100"
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
            className={`px-4 py-3 bg-[#ff9911] rounded-xl`} // Color darkened 40%
          >
            <Text className={`text-lg font-semibold text-white`}>Reset</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSave}
          disabled={gratitudeArray.length <= 0 || gratitudeArray[0] == "" || currentFormState}
        >
          <View
            className={`w-[73px] px-4 py-3 bg-[#ffc06c] rounded-xl ${
              // Color darkened 20%
              gratitudeArray.length > 0 &&
              gratitudeArray[0] != "" &&
              "bg-[#714100]" // Color darkened 75%
            }`}
          >
            {currentFormState ? (
              <View className="flex items-center">
                <Ionicons name="checkmark" size={26} color="white" />
              </View>
            ) : (
              <Text
                className={`text-lg font-semibold text-[#e38200] ${
                  // Color darkened 40%
                  gratitudeArray.length > 0 &&
                  gratitudeArray[0] != "" &&
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

export default GratitudeForm;
