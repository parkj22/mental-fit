import { Text, View } from "react-native";
import React, { ReactElement, ReactNode } from "react";

type LogContainerProps = {
  children?: ReactNode,
  bgColor?: string,
}

const LogContainer = ({children, bgColor}: LogContainerProps): ReactElement | null => {
  return (
    <View className="p-6">
      <View className={`h-full w-full rounded-3xl shadow-lg p-6 flex justify-between ${bgColor}`}>
        {children}
      </View>
    </View>
  );
};

export default LogContainer;
