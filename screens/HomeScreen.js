import { SafeAreaView, ScrollView, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Header from '../components/Header';
import CalendarColumn from '../components/CalendarColumn';
import DailyInfo from '../components/DailyInfo';
import AddInfoSection from '../components/AddInfoSection';

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, []);

  return (
    <SafeAreaView>
      <Header screenName="Home" />
      <ScrollView>
        <CalendarColumn />
        <DailyInfo />
        <AddInfoSection text="My daily insights - Today">
          <View className="h-36 bg-slate-400"></View>
        </AddInfoSection>
        <AddInfoSection text="My cycles">
          <View className="h-36 bg-slate-400"></View>
        </AddInfoSection>
      </ScrollView>
        {/* Additional information - Refer to MoodFit */}

    </SafeAreaView>
  )
}

export default HomeScreen;