import { View, Text, ScrollView } from "react-native"
import React, { ReactElement } from "react"
import Article from "./Article";

const FeaturedRow = ({title}): ReactElement => {
    return(
        <View>
            <View className="pt-4">
                <Text className="font-bold text-lg">{title}</Text>
            </View>
            

            <ScrollView
                horizontal
                contentContainerStyle={{
                    paddingHorizontal: 15
                }}
                showsHorizontalScrollIndicator={false}
                className="pt-2"
            >
                <Article
                    title="sample"
                    imgUrl="https://links.papareact.com/gn7"
                />
                <Article
                    title="sample"
                    imgUrl="https://links.papareact.com/gn7"
                />
                <Article
                    title="sample"
                    imgUrl="https://links.papareact.com/gn7"
                />
            </ScrollView>
        </View>
    );
};

export default FeaturedRow;