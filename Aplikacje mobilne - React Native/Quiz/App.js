import React, {Component, useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import {StyleSheet, Text, View, Image, Button, LogBox} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from './screens/HomeScreen';
import ResultsScreen from './screens/ResultScreen';
import QuizScreen from './screens/QuizScreen';
import TermsScreen from './screens/TermsScreen';
import Toast from "react-native/Libraries/Components/ToastAndroid/ToastAndroid";
import ApiManager from "./api/ApiManager";
import NetInfo from '@react-native-community/netinfo';

const DrawerContent = (props) => {
    return (
        <View>
            <View style={styles.header}>
                <Text>Quiz App</Text>
                <Image source={require('./assets/quizLogo.png')} style={styles.logo} />
                <View style={styles.sizedBox}/>
                <Button onPress={ApiManager.fetchAllDatabase} title={'Pobierz bazę danych'}/>
                <View style={styles.sizedBox}/>
                <Button onPress={() => ApiManager.getRandomTest(props)} title={'Losuj test'}/>
                <View style={styles.sizedBox}/>
            </View>
            <DrawerItemList {...props} />
        </View>
    );
};



function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: 'transparent',
                    elevation: 0,
                    shadowOpacity: 0,
                },
                headerTitle: '',
            }}
            drawerContent={(props) => <DrawerContent {...props} />}
        >
            <Drawer.Screen name="Menu" component={HomeScreen} />
            <Drawer.Screen name="Result" component={ResultsScreen} />
        </Drawer.Navigator>
    );
}

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App () {
    LogBox.ignoreAllLogs();
    const [isLoadingComplete, setLoadingComplete] = useState(true);
    const [isConnectedToNetwork, setIsConnectedToNetwork] = useState(false);


    useEffect(async () => {

        await setUpInitial();
    }, []);

    const setUpInitial = async () => {
        await ApiManager.fetchAllDatabase();
        const unsubscribe = NetInfo.addEventListener(state => {
            if( state.isConnected !== isConnectedToNetwork ) {
                setIsConnectedToNetwork(state.isConnected);
                if( !state.isConnected ) {
                    Toast.show('No network connection', 1000);
                } else {
                    Toast.show('Connected to network', 1000);
                }
            }
        });
        unsubscribe();

    }

    const getInitialPage = async () => {
        const showTerms = await AsyncStorage.getItem('terms');
        if (showTerms) return 'Terms';
        return 'Home';
    }

    if( !isLoadingComplete ) {
        return <Text>Loading</Text>
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={getInitialPage}>
                <Stack.Screen
                    name="Root"
                    component={DrawerNavigator}
                    options={{headerShown: false}}
                />
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Quiz" component={QuizScreen}/>
                <Stack.Screen name="Results" component={ResultsScreen}/>
                <Stack.Screen name="Terms" component={TermsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    app: {
      fontFamily: 'Lobster',
    },
    header: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 80,
        width: 80,
    },
    button: {
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        paddingStart: 20,
        paddingEnd: 20,
        backgroundColor: '#eeeeee'
    },
});
