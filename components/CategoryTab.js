import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CategoryTab = ({title}) => {
    return(
        <TouchableOpacity className="relative mr-2">
            <View className="h-10 w-30 bg-gray-200 p-3 rounded-full">
                <Text className="text-center font-bold">{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default CategoryTab