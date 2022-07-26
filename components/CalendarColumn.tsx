import { View, Text } from "react-native";
import { ReactElement, useState } from "react";

const CalendarColumn = (): ReactElement | null => {
  const weekInfo = [
    { key: 0, day: "S", date: 10 },
    { key: 1, day: "M", date: 11 },
    { key: 2, day: "T", date: 12 },
    { key: 3, day: "W", date: 13 },
    { key: 4, day: "T", date: 14 },
    { key: 5, day: "F", date: 15 },
    { key: 6, day: "S", date: 16 },
  ];
  const todayDate = 16; // TODO: Update weekInfo and todayDate according to current time

  const [selectedDate, setSelectedDate] = useState<number>(todayDate);

  return (
    <View className="p-2">
      <View className="flex flex-row items-center">
        {weekInfo.map(({ key, day, date }) => (
          <View className="flex items-center basis-[14.2857143%] space-y-1">
            {todayDate == date ? (
              <>
                <Text className="text-center text-xs font-bold">Today</Text>
                {selectedDate == date ? (
                  <View className="px-1 py-3 rounded-full bg-blue-900 w-full">
                    <Text className="text-center text-lg text-white font-bold">
                      {date}
                    </Text>
                  </View>
                ) : (
                  <View className="px-1 py-3 rounded-full w-full">
                    <Text className="text-center text-lg font-bold" onPress={() => { setSelectedDate(date); }}>
                      {date}
                    </Text>
                  </View>
                )}
              </>
            ) : (
              <>
                <Text className="text-center text-xs">{day}</Text>
                {selectedDate == date ? (
                  <View className="px-1 py-3 rounded-full bg-blue-900 w-full">
                    <Text className="text-center text-lg text-white">{date}</Text>
                  </View>
                ) : (
                  <View className="px-1 py-3 rounded-full w-full">
                    <Text className="text-center text-lg" onPress={() => { setSelectedDate(date); }}>{date}</Text>
                  </View>
                )}
              </>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default CalendarColumn;
