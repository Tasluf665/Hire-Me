import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { API_URL } from '@env'


export default function SplashScreen() {

    return (
        <View style={styles.container}  >
            <Text>SplashScreen</Text>
            <Text>{API_URL}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

})