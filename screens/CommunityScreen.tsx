import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { ReactElement, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Header from '../components/Header';

const CommunityScreen = (): ReactElement | null => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, []);

  return (
    <SafeAreaView>
      <Header screenName="Community"/>
      <ScrollView>
        <Text>
          Hi
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CommunityScreen;