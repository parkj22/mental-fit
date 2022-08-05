import { View, Text, ScrollView } from "react-native"
import React, { ReactElement } from "react";
import CategoryTab from "./CategoryTab";

const Category = (): ReactElement | null => {
    return(
        <ScrollView
        contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 5
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

export default Category;