import { View, Text, SafeAreaView, Image, TextInput, ScrollView} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SearchBar } from 'react-native-screens';
import Header from '../components/Header';
import Category from '../components/Category';


const InsightsScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, []);

  return (
    <SafeAreaView>
     <Header screenName="Insights"/>
     <ScrollView className="bg-gray-100"
      contentContainerStyle={{
      paddingBottom: 100,
      }}
      >
        <Category/>
     </ScrollView>
     <FeaturedRow
        title="Meditation"
     />
    </SafeAreaView>
  );
};

export default InsightsScreen;