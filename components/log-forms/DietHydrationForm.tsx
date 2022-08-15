import { View, Text, TouchableOpacity } from "react-native";
import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import LogContainer from "../LogContainer";
import { LogFormProps } from "../../types/user-log-data";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import WaterSliderCustomMarker from "./WaterSliderCustomMarker";
import { Ionicons } from "@expo/vector-icons";

interface DietHydrationFormProps extends LogFormProps {
  enableOuterScroll: () => void;
  disableOuterScroll: () => void;
  enablePagerScroll: () => void;
  disablePagerScroll: () => void;
}

const DietHydrationForm = ({
  prevUserLog,
  updateUserLog,
  enableOuterScroll,
  disableOuterScroll,
  enablePagerScroll,
  disablePagerScroll,
  currentFormState,
  updateLogFormState,
  formIndex,
}: DietHydrationFormProps): ReactElement | null => {
  let breakfastBoxRef: BouncyCheckbox | null = null;
  let lunchBoxRef: BouncyCheckbox | null = null;
  let dinnerBoxRef: BouncyCheckbox | null = null;
  const [hadBreakfast, setHadBreakfast] = useState<boolean>(false);
  const [hadLunch, setHadLunch] = useState<boolean>(false);
  const [hadDinner, setHadDinner] = useState<boolean>(false);
  const [waterIntake, setWaterIntake] = useState<number>(0);

  const toggleMeal = (
    hadMeal: boolean,
    setHadMeal: Dispatch<SetStateAction<boolean>>
  ): void => {
    setHadMeal(!hadMeal);
  };

  const handleSliderChange = (value: number[]): void => {
    // Using only one slider value
    const processedValue = Math.round(value[0] * 10) / 10;
    setWaterIntake(processedValue);
  };

  const resetForm = (): void => {
    setHadBreakfast(false);
    setHadLunch(false);
    setHadDinner(false);
    setWaterIntake(0);

    // Clear log
    const newUserlog = { ...prevUserLog };
    delete newUserlog.breakfast;
    delete newUserlog.lunch;
    delete newUserlog.dinner;
    delete newUserlog.waterIntake;
    updateUserLog(newUserlog);

    updateLogFormState(formIndex, false);
  };

  const handleSave = (): boolean => {
    if (!updateUserLog) {
      return false;
    }
    updateUserLog({
      ...prevUserLog,
      breakfast: hadBreakfast,
      lunch: hadLunch,
      dinner: hadDinner,
      waterIntake: waterIntake,
    });
    updateLogFormState(formIndex, true);
    return true;
  };

  return (
    <LogContainer bgColor="bg-[#CAF1DE]">
      <View>
        <Text className="text-2xl font-bold text-[#13462d] py-1">
          Eat healthy, regular meals and stay hydrated.
        </Text>
        <View className="flex flex-row justify-between py-2 space-x-2">
          <View className="flex-1 flex space-y-2 justify-center pl-4 py-2">
            <TouchableOpacity
              onPress={() => {
                breakfastBoxRef.props.onPress(true);
              }}
              disabled={currentFormState}
            >
              <View className="flex flex-row items-center">
                <BouncyCheckbox
                  size={35}
                  ref={(ref: any) => (breakfastBoxRef = ref)}
                  isChecked={hadBreakfast}
                  disableBuiltInState
                  fillColor="#175838"
                  iconStyle={{
                    borderWidth: 2,
                    borderColor: "#175838",
                    borderRadius: 12,
                  }}
                  disabled={currentFormState}
                  innerIconStyle={{ borderRadius: 12 }}
                  onPress={() => {
                    toggleMeal(hadBreakfast, setHadBreakfast);
                  }}
                />
                <Text className={`font-semibold text-lg text-[#13462d]`}>
                  Breakfast
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                lunchBoxRef?.props.onPress(true);
              }}
              disabled={currentFormState}
            >
              <View className="flex flex-row items-center">
                <BouncyCheckbox
                  size={35}
                  ref={(ref: any) => (lunchBoxRef = ref)}
                  isChecked={hadLunch}
                  disableBuiltInState
                  fillColor="#175838"
                  iconStyle={{
                    borderWidth: 2,
                    borderColor: "#175838",
                    borderRadius: 12,
                  }}
                  disabled={currentFormState}
                  innerIconStyle={{ borderRadius: 12 }}
                  onPress={() => {
                    toggleMeal(hadLunch, setHadLunch);
                  }}
                />
                <Text className={`font-semibold text-lg text-[#13462d]`}>
                  Lunch
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dinnerBoxRef?.props.onPress(true);
              }}
              disabled={currentFormState}
            >
              <View className="flex flex-row items-center">
                <BouncyCheckbox
                  size={35}
                  ref={(ref: any) => (dinnerBoxRef = ref)}
                  isChecked={hadDinner}
                  disableBuiltInState
                  fillColor="#175838"
                  iconStyle={{
                    borderWidth: 2,
                    borderColor: "#175838",
                    borderRadius: 12,
                  }}
                  disabled={currentFormState}
                  innerIconStyle={{ borderRadius: 12 }}
                  onPress={() => {
                    toggleMeal(hadDinner, setHadDinner);
                  }}
                />
                <Text className={`font-semibold text-lg text-[#13462d]`}>
                  Dinner
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View className="flex-1 flex items-center justify-start space-y-6 pl-8">
            <Text className="font-semibold text-[#13462d]">Water intake</Text>
            <View className="flex">
              <MultiSlider
                min={0}
                max={4.5}
                step={0.1}
                sliderLength={96}
                vertical
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
                  height: 64,
                  backgroundColor: "transparent",
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}
                selectedStyle={{
                  backgroundColor: "#175838",
                }}
                customMarker={() => (
                  <WaterSliderCustomMarker intake={waterIntake} />
                )}
                markerOffsetY={-28}
                markerOffsetX={10}
                containerStyle={{
                  padding: 2,
                  borderTopWidth: 2,
                  borderBottomWidth: 2,
                  borderLeftWidth: 2,
                  height: 72,
                  width: 100,
                  borderTopLeftRadius: 12,
                  borderBottomLeftRadius: 12,
                }}
                enabledOne={!currentFormState}
              />
            </View>
          </View>
        </View>
      </View>
      <View className="flex flex-row justify-end items-center space-x-2">
        <TouchableOpacity onPress={resetForm}>
          <View
            className={`px-4 py-3 bg-[#3ecc87] rounded-xl`} // Color darkened 40%
          >
            <Text className={`text-lg font-semibold text-white`}>Reset</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSave}
          disabled={
            !(hadBreakfast || hadLunch || hadDinner || waterIntake != 0) || currentFormState
          }
        >
          <View
            className={`w-[73px] px-4 py-3 bg-[#84deb2] rounded-xl ${
              // Color darkened 20%
              (hadBreakfast || hadLunch || hadDinner || waterIntake != 0) &&
              "bg-[#175838]" // Color darkened 75%
            }`}
          >
            {currentFormState ? (
              <View className="flex items-center">
                <Ionicons name="checkmark" size={26} color="white" />
              </View>
            ) : (
              <Text
                className={`text-lg font-semibold text-[#3ecc87] ${
                  // Color darkened 40%
                  (hadBreakfast || hadLunch || hadDinner || waterIntake != 0) &&
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

export default DietHydrationForm;
