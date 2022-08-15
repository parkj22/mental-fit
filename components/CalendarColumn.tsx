import { View, Text, StyleSheet } from "react-native";
import { ReactElement, useState } from "react";
import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  subDays,
} from "date-fns";
import PagerView from "react-native-pager-view";

const today = new Date();
const dates = eachWeekOfInterval(
  {
    start: subDays(new Date(), 14),
    end: addDays(new Date(), 14),
  },
  {
    weekStartsOn: 1,
  }
).reduce((acc: Date[][], cur) => {
  const allDays = eachDayOfInterval({
    start: cur,
    end: addDays(cur, 6),
  });
  acc.push(allDays);
  return acc;
}, []);

const CalendarColumn = (): ReactElement | null => {
  const [selectedDate, setSelectedDate] = useState<number>(today.getDate());

  return (
    <View className="h-[88px] p-2">
      <PagerView style={styles.container} initialPage={2}>
        {dates.map((week, i) => {
          return (
            <View key={i} className="flex flex-row justify-around">
              {week.map((day, j) => {
                const formattedDay = format(day, "EEEEE");
                return (
                  <View key={j} className="flex items-center space-y-1">
                    <Text className={`text-xs ${day.getDate() == today.getDate() ? "font-bold" : "text-gray-600"} ${j == 5 && "text-blue-600"} ${j == 6 && "text-red-600"}`}>{day.getDate() == today.getDate() ? "TODAY" : formattedDay}</Text>
                    <View className={`rounded-full p-2 px-3 ${selectedDate == day.getDate() && "bg-[#00034C]"}`}>
                      <Text
                        className={`w-6 h-8 text-lg font-light text-center pt-0.5 ${
                          selectedDate == day.getDate() &&
                          "text-white"
                        } ${day.getDate() == today.getDate() && "font-bold"}`}
                        onPress={() => {
                          setSelectedDate(day.getDate());
                        }}
                      >
                        {day.getDate()}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          );
        })}
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CalendarColumn;
