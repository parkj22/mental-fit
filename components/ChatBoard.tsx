import { View, Image, Text, TouchableOpacity, Pressable } from "react-native"
import React, { ReactElement } from "react"


const ChatBoard = ({userImg, bgColor}): ReactElement => {
    const onProfilePress = () => {};
    return(
        <View className="p-4">
            <View className={`h-48 w-full rounded-3xl shadow-lg p-6 ${bgColor}`}>
                <Pressable onPress={onProfilePress}>
                    <Image
                    source={{
                        uri: userImg, 
                    }}
                    className="h-8 w-8 rounded-full absolute top-1 left-1"
                    />
                </Pressable>   
            </View>
            <TouchableOpacity>
                    <View className="absolute p-3 m-2 bottom-2 right-1 h-10 w-20 bg-gray-200 rounded-full">
                        <Text className="text-center font-bold">
                            Chat
                        </Text>
                    </View>
                </TouchableOpacity> 
        </View>
    );
};

export default ChatBoard;