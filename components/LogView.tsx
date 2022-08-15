import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, {
  Dispatch,
  MutableRefObject,
  ReactElement,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import PagerView, {
  PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";
import { StyleSheet } from "react-native";
import LogContainer from "./LogContainer";
import Feather from "@expo/vector-icons/Feather";
import SleepForm from "./log-forms/SleepForm";
import { UserLogData } from "../types/user-log-data";
import DietHydrationForm from "./log-forms/DietHydrationForm";
import ExerciseForm from "./log-forms/ExerciseForm";
import MeditationForm from "./log-forms/MeditationForm";
import GratitudeForm from "./log-forms/GratitudeForm";
import GoalPriorityForm from "./log-forms/GoalPriorityForm";
import LogFormStateBar from "./LogFormStateBar";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { Ionicons } from "@expo/vector-icons";

type LogViewProps = {
  enableOuterScroll: () => void;
  disableOuterScroll: () => void;
};

const NUM_LOG_FORMS = 6;

const LogView = ({
  enableOuterScroll,
  disableOuterScroll,
}: LogViewProps): ReactElement | null => {
  const [userLog, updateUserLog] = useState<UserLogData>();
  const [pagerScrollEnabled, setPagerScrollEnabled] = useState<boolean>(true);
  const [logFormStates, setLogFormStates] = useState<boolean[]>(
    new Array(NUM_LOG_FORMS).fill(false)
  );
  const [currentFormIndex, setCurrentFormIndex] = useState<number>(0);
  const [logViewState, setLogViewState] = useState<
    "idle" | "uploading" | "complete"
  >("idle");

  const pagerViewRef = useRef<PagerView>(null);

  const updateLogFormState = (index: number, save: boolean): boolean => {
    if (index < 0 || index >= NUM_LOG_FORMS) {
      return false;
    }
    const newLogFormStates = [...logFormStates];
    newLogFormStates[index] = save;
    setLogFormStates(newLogFormStates);
    return true;
  };

  const updateCurrentFormIndex = (
    event: PagerViewOnPageSelectedEvent
  ): void => {
    setCurrentFormIndex(event.nativeEvent.position);
  };

  const enablePagerScroll = () => {
    setPagerScrollEnabled(true);
  };

  const disablePagerScroll = () => {
    setPagerScrollEnabled(false);
  };

  const uploadUserLog = async (
    userLog: UserLogData,
    userName: string
  ): Promise<boolean> => {
    setLogViewState("uploading");

    // Handle uploading user log here
    const docRef = await addDoc(collection(db, userName), userLog);

    setLogViewState("complete");
    return true;
  };

  return (
    <View>
      <View className="h-96">
        <PagerView
          ref={pagerViewRef}
          style={styles.container}
          initialPage={0}
          scrollEnabled={pagerScrollEnabled}
          onPageSelected={updateCurrentFormIndex}
        >
          <LogContainer key={1} bgColor="bg-[#fdf7f9]">
            <View className="h-full w-full flex items-center justify-center space-y-4">
              <View className="flex items-center justify-center">
                <Text className="text-3xl font-bold py-2 text-[#00034C]">
                  Track your mind.
                </Text>
                <Text className="text-xl font-light text-[#00034C]">
                  How is your day going?
                </Text>
              </View>
              {/* Allow user to click instead */}
              <TouchableOpacity
                onPress={() => {
                  pagerViewRef.current?.setPage(1);
                }}
              >
                <View className="pl-2 pr-1 py-1 flex flex-row items-center bg-[#00034C] rounded-xl">
                  <Text className="text-base font-semibold text-[#fdf7f9]">
                    Swipe to continue
                  </Text>
                  <Feather name="chevrons-right" size={30} color="#fdf7f9" />
                </View>
              </TouchableOpacity>
            </View>
          </LogContainer>

          <SleepForm
            prevUserLog={userLog}
            updateUserLog={updateUserLog}
            currentFormState={logFormStates[0]}
            updateLogFormState={updateLogFormState}
            formIndex={0}
            key={2}
          />

          <DietHydrationForm
            prevUserLog={userLog}
            updateUserLog={updateUserLog}
            enableOuterScroll={enableOuterScroll}
            disableOuterScroll={disableOuterScroll}
            enablePagerScroll={enablePagerScroll}
            disablePagerScroll={disablePagerScroll}
            currentFormState={logFormStates[1]}
            updateLogFormState={updateLogFormState}
            formIndex={1}
            key={3}
          />

          <ExerciseForm
            prevUserLog={userLog}
            updateUserLog={updateUserLog}
            enableOuterScroll={enableOuterScroll}
            disableOuterScroll={disableOuterScroll}
            enablePagerScroll={enablePagerScroll}
            disablePagerScroll={disablePagerScroll}
            currentFormState={logFormStates[2]}
            updateLogFormState={updateLogFormState}
            formIndex={2}
            key={4}
          />

          <MeditationForm
            prevUserLog={userLog}
            updateUserLog={updateUserLog}
            currentFormState={logFormStates[3]}
            updateLogFormState={updateLogFormState}
            formIndex={3}
            key={5}
          />

          <GratitudeForm
            prevUserLog={userLog}
            updateUserLog={updateUserLog}
            currentFormState={logFormStates[4]}
            updateLogFormState={updateLogFormState}
            formIndex={4}
            key={6}
          />

          <GoalPriorityForm
            prevUserLog={userLog}
            updateUserLog={updateUserLog}
            currentFormState={logFormStates[5]}
            updateLogFormState={updateLogFormState}
            formIndex={5}
            key={7}
          />

          <LogContainer key={8} bgColor="bg-[#fdf7f9]">
            <View className="h-full w-full flex items-center justify-center space-y-4">
              <View className="flex items-center justify-center">
                <Text className="text-3xl font-bold py-2 text-[#00034C]">
                  Well done!
                </Text>
                <Text className="text-xl font-light text-center text-[#00034C]">
                  Upload your log to visualize your life patterns.
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  uploadUserLog(userLog, "testName");
                }}
              >
                {logViewState == "complete" ? (
                  <View className="flex flex-row items-center bg-[#00034C] space-x-2 px-3 py-1 rounded-xl">
                    <Ionicons name="checkmark" size={30} color="#a3e635" />
                    <Text className="text-[#fdf7f9] text-base font-semibold">
                      Complete
                    </Text>
                  </View>
                ) : (
                  <View className="flex flex-row items-center bg-[#00034C] space-x-2 px-4 py-2 rounded-xl">
                    {logViewState == "uploading" ? (
                      <ActivityIndicator size="large" color="#fdf7f9" />
                    ) : (
                      <Feather name="upload-cloud" size={36} color="#fdf7f9" />
                    )}
                    <Text className="text-[#fdf7f9] text-base font-semibold">
                      Upload
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </LogContainer>
        </PagerView>
      </View>
      <LogFormStateBar
        logFormStates={logFormStates}
        currentFormIndex={currentFormIndex}
        pagerViewRef={pagerViewRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LogView;
