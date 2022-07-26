import { View, Text } from 'react-native'
import React, { ReactElement, ReactNode } from 'react'

type AddInfoSectionProps = {
  text: string | null,
  children: ReactNode,
}

const AddInfoSection = ({ text, children }): ReactElement | null => {
  return (
    <View className="p-4 space-y-2">
      <Text className="text-xl font-bold">{text}</Text>
      {children}
    </View>
  )
}

export default AddInfoSection;