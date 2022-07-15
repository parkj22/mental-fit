import { View, Text } from 'react-native'
import React from 'react'

const CalendarColumn = () => {
  return (
    <View className="py-2">
        <View className="flex flex-row items-center justify-evenly">
            <Text>S</Text>
            <Text>M</Text>
            <Text>T</Text>
            <Text>W</Text>
            <Text>T</Text>
            <Text>F</Text>
            <Text>Today</Text>
        </View>
        <View className="flex flex-row items-center justify-evenly py-2">
            <Text className="text-lg">10</Text>
            <Text className="text-lg">11</Text>
            <Text className="text-lg">12</Text>
            <Text className="text-lg">13</Text>
            <Text className="text-lg">14</Text>
            <Text className="text-lg">15</Text>
            <Text className="font-bold text-lg">16</Text>
        </View>
    </View>
  )
}

export default CalendarColumn