import { View, TouchableOpacity } from "react-native";
import React, { MutableRefObject, ReactElement } from "react";
import { Ionicons } from "@expo/vector-icons";
import PagerView from "react-native-pager-view";

interface LogFormStateBarProps {
  logFormStates: boolean[];
  currentFormIndex: number;
  pagerViewRef: MutableRefObject<PagerView>;
}

const LogFormStateBar = ({
  logFormStates,
  currentFormIndex,
  pagerViewRef,
}: LogFormStateBarProps): ReactElement | null => {
  return (
    <View className="flex items-center justify-center pb-2">
      <View className="px-2 py-1 flex flex-row justify-center items-center space-x-0.5 rounded-full">
        {logFormStates.map((logFormState, index) => (
          <TouchableOpacity onPress={() => { pagerViewRef.current?.setPage(index + 1); }} key={index}>
            <View>
              {logFormState ? (
                <Ionicons
                  name={
                    currentFormIndex - 1 == index
                      ? "checkmark-circle"
                      : "checkmark-circle-outline"
                  }
                  size={20}
                  color="green"
                />
              ) : (
                <Ionicons
                  name={
                    currentFormIndex - 1 == index
                      ? "ellipsis-horizontal-circle-sharp"
                      : "ellipsis-horizontal-circle-outline"
                  }
                  size={20}
                  color="gray"
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => { pagerViewRef.current?.setPage(7); }}>
          <Ionicons name={currentFormIndex == 7 ? "cloud-circle" : "cloud-circle-outline"} size={20} color="#00034C"/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogFormStateBar;
