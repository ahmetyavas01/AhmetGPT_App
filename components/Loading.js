import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';


export default function Loading() {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <LottieView style={{ width: '90%', height: 500 }} source={require('../Lottie/Loading.json')} autoPlay loop />
        </View>
    )
}

const styles = StyleSheet.create({})