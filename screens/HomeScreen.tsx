import { SafeAreaView, ScrollView, Text, View } from "react-native";
import React, { ReactElement, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import CalendarColumn from "../components/CalendarColumn";
import { StyleSheet } from "react-native";
import AddInfoSection from "../components/AddInfoSection";
import "tailwindcss-react-native/types.d"; // Need to add this type file to use 'className' prop
import LogContainer from "../components/LogContainer";
import LogView from "../components/LogView";

const HomeScreen = (): ReactElement | null => {
  const navigation = useNavigation();
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);

  const enableScroll = () => {
    setScrollEnabled(true);
  }
  const disableScroll = () => {
    setScrollEnabled(false);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView>
      <Header screenName="Home" />
      <ScrollView scrollEnabled={scrollEnabled}>
        <CalendarColumn />
        <LogView enableOuterScroll={enableScroll} disableOuterScroll={disableScroll} />
        <AddInfoSection text="My daily insights - Today">
          <View className="h-36 bg-slate-400"></View>
        </AddInfoSection>
        <AddInfoSection text="My cycles">
          <View className="h-36 bg-slate-400"></View>
        </AddInfoSection>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});

export default HomeScreen;
