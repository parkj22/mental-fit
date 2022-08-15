import { View, Text, TouchableOpacity } from "react-native";
import React, { ReactElement, useState } from "react";
import LogContainer from "../LogContainer";
import { LogFormProps } from "../../types/user-log-data";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import MeditationTimerCenter from "./MeditationTimerCenter";
import { Ionicons } from "@expo/vector-icons";

const MeditationForm = ({
  prevUserLog,
  updateUserLog,
  currentFormState,
  updateLogFormState,
  formIndex,
}: LogFormProps): ReactElement | null => {
  const [meditationComplete, setMeditationComplete] = useState<boolean>(false);
  const [timerIsPlaying, setTimerIsPlaying] = useState<boolean>(false);

  // Key is used for re-rendering and restarting the timer
  const [timerKey, setTimerKey] = useState<number>(0);

  const handleTimerUpdate = () => {};

  // Automatically save when meditation is complete
  const handleTimerComplete = () => {
    setMeditationComplete(true);
    handleSave();
  };
  const resetForm = (): void => {
    setMeditationComplete(false);
    setTimerIsPlaying(false);
    setTimerKey(timerKey + 1);

    const newUserLog = { ...prevUserLog };
    delete newUserLog.meditated;
    updateUserLog(newUserLog);

    updateLogFormState(formIndex, false);
  };

  const handleSave = (): boolean => {
    if (!updateUserLog) {
      return false;
    }
    updateUserLog({
      ...prevUserLog,
      meditated: meditationComplete,
    });
    updateLogFormState(formIndex, true);
    return true;
  };

  return (
    <LogContainer key={5} bgColor="bg-[#FEF8DD]">
      <View>
        <Text className="text-2xl font-bold text-[#5c4c03] py-1">
          Brilliant things happen in calm minds.
        </Text>
        <Text className="font-light text-xl text-[#5c4c03]">
          Stabilize your mind for a minute.
        </Text>
      </View>
      <View className="flex items-center">
        <CountdownCircleTimer
          key={timerKey}
          isPlaying={timerIsPlaying}
          duration={60}
          colors={["#e7be07", "#5c4c03"]}
          colorsTime={[60, 0]}
          isSmoothColorTransition={true}
          trailColor="#fcea98"
          size={108}
          strokeWidth={9}
          onUpdate={handleTimerUpdate}
          onComplete={handleTimerComplete}
        >
          {({ remainingTime }) => (
            <MeditationTimerCenter
              remainingTime={remainingTime}
              timerIsPlaying={timerIsPlaying}
              setTimerIsPlaying={setTimerIsPlaying}
              meditationComplete={meditationComplete}
            />
          )}
        </CountdownCircleTimer>
      </View>
      <View className="flex flex-row justify-end items-center space-x-2">
        <TouchableOpacity onPress={resetForm}>
          <View
            className={`px-4 py-3 bg-[#e7be07] rounded-xl`} // Color darkened 40%
          >
            <Text className={`text-lg font-semibold text-white`}>Reset</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} disabled={!meditationComplete || currentFormState}>
          <View
            className={`w-[73px] px-4 py-3 bg-[#fbe581] rounded-xl ${
              // Color darkened 20%
              meditationComplete && "bg-[#735f03]" // Color darkened 75%
            }`}
          >
            {currentFormState ? (
              <View className="flex items-center">
                <Ionicons name="checkmark" size={26} color="white" />
              </View>
            ) : (
              <Text
                className={`text-lg font-semibold text-[#e7be07] ${
                  // Color darkened 40%
                  meditationComplete && "text-white"
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

export default MeditationForm;
