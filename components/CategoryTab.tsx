import { View, Text, TouchableOpacity } from "react-native"
import React, { ReactElement } from "react";

const CategoryTab = ({title}): ReactElement | null => {
    return(
        <TouchableOpacity>
            <View className="h-10 w-30 bg-gray-200 p-3 relative mr-2 rounded-full">
                <Text className="text-center font-bold">{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default CategoryTab;