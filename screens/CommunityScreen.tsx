import { View, Text, SafeAreaView, ScrollView} from 'react-native'
import React, { ReactElement, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Header from '../components/Header';
import ChatBoard from '../components/ChatBoard';

const CommunityScreen = (): ReactElement | null => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, []);

  return (
    <SafeAreaView >
      <Header screenName="Community"/>
      <ScrollView >
         <ChatBoard 
          userImg="https://lh3.googleusercontent.com/a/AItbvmmUHkzpj1JAdkzyOabjy5bGUE-24arb__Z-Mga8=s96-c"
          bgColor='bg-[#ACDDDE]'
        />
        <ChatBoard 
           userImg="https://lh3.googleusercontent.com/a/AItbvmmUHkzpj1JAdkzyOabjy5bGUE-24arb__Z-Mga8=s96-c" 
          bgColor='bg-[#ACDDDE]'
        />
        <ChatBoard 
           userImg="https://lh3.googleusercontent.com/a/AItbvmmUHkzpj1JAdkzyOabjy5bGUE-24arb__Z-Mga8=s96-c" 
          bgColor='bg-[#ACDDDE]'
        />
        <ChatBoard 
           userImg="https://lh3.googleusercontent.com/a/AItbvmmUHkzpj1JAdkzyOabjy5bGUE-24arb__Z-Mga8=s96-c" 
          bgColor='bg-[#ACDDDE]'
        />
        <ChatBoard 
           userImg="https://lh3.googleusercontent.com/a/AItbvmmUHkzpj1JAdkzyOabjy5bGUE-24arb__Z-Mga8=s96-c" 
          bgColor='bg-[#ACDDDE]'
        />
        <ChatBoard 
           userImg="https://lh3.googleusercontent.com/a/AItbvmmUHkzpj1JAdkzyOabjy5bGUE-24arb__Z-Mga8=s96-c" 
          bgColor='bg-[#ACDDDE]'
        />
      </ScrollView>
    </SafeAreaView>
  );
};



export default CommunityScreen;