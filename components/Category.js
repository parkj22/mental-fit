import { View, Text, ScrollView } from "react-native"
import React from "react"
import CategoryTab from "./CategoryTab";

const Category = () => {
    return(
        <ScrollView
        contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 10,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        >
            <CategoryTab title="Discover"/>
            <CategoryTab title="Saved"/>
            <CategoryTab title="Recommended"/>
            <CategoryTab title="Recent"/>
            <CategoryTab title="Watch"/>
            
        </ScrollView>
       
    );
};

export default Category