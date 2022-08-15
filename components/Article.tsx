import { View, Image, Text, TouchableOpacity } from "react-native"
import React, { ReactElement } from "react"

const Article = ({title, imgUrl}): ReactElement => {
    return(
        <TouchableOpacity>
            <Image
                source={{
                    //TODO:  Article Pic
                    uri: imgUrl,
                }}
                className="h-44 w-36 rounded mr-2"
            />
            <Text className="absolute bottom-1 left-1 font-bold text-lg">
                {title}
            </Text>
        </TouchableOpacity>
        
    );
};

export default Article;