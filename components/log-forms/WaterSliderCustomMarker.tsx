import { View, Text } from 'react-native'
import React from 'react'

interface WaterSliderCustomMarkerProps {
  intake: number,
}

const WaterSliderCustomMarker = ({ intake }: WaterSliderCustomMarkerProps) => {
  return (
    <View className="px-1 border border-[#175838] rounded-l-full rounded-tr-full bg-[#175838] rotate-90 w-11">
      <Text className='font-semibold text-center text-sm text-white'>{intake} L</Text>
    </View>
  )
}

export default WaterSliderCustomMarker;