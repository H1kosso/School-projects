import React, {useState} from 'react';
import {AsyncStorage, Button, StyleSheet, Text, View} from 'react-native';


const TermsScreen = ({navigation}) => {

    const handleSubmit = async () => {
        await AsyncStorage.setItem('terms', 'true')
        navigation.navigate({ name: 'Home' });
    }

    return (
        <View style={styles.page}>
            <Text>Regulamin</Text>
            <View style={styles.sizedBox}/>
            <Text>
                Warunki korzystania z tej aplikacji nanananan
            </Text>
            <View style={styles.sizedBox}/>
            <View style={styles.sizedBox}/>
            <Button title={"Akceptuje warunki korzystania"} onPress={handleSubmit}/>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingStart: 15,
        paddingEnd: 15,
    },
    sizedBox: {
        height: 15,
    }
});

export default TermsScreen;
