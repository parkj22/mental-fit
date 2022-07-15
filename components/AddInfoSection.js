import { View, Text } from 'react-native'
import React from 'react'

const AddInfoSection = ({ text, children }) => {
  return (
    <View className="p-4 space-y-2">
      <Text className="text-xl font-bold">{text}</Text>
      {children}
    </View>
  )
}

export default AddInfoSection;