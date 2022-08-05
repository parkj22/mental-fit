import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, { ReactElement, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SearchBar } from 'react-native-screens';
import Header from '../components/Header';
import Category from '../components/Category';
import FeaturedRow from '../components/FeaturedRow';

const InsightsScreen = (): ReactElement | null => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, []);

  return (
    <SafeAreaView>
      <Header screenName="Insights"/>
      <ScrollView className="bg-gray-100">
         <Category />
         <FeaturedRow
            title="Meditation"
         />
         <FeaturedRow
            title="Sleep"
         />
         <FeaturedRow
            title="Physical Exercise"
         />
         <FeaturedRow
            title="Diet"
         />
         <FeaturedRow
            title="Personal Journal"
         />
         <FeaturedRow
            title="Daily Routine"
         />
         <FeaturedRow
            title="Goal Setting"
         />
     </ScrollView>
    </SafeAreaView>
  );
};

export default InsightsScreen;