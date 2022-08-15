import { View, Text, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'

const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 2000,
                useNativeDriver: false
            }
        ).start();
    }, [fadeAnim]);

  return (
    <Animated.View style={{
        ...props.style,
        opacity: fadeAnim,
    }}>
        {props.children}
    </Animated.View>
  )
}

export default FadeInView