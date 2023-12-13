import React, {Component, useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from './screens/HomeScreen';
import ResultsScreen from './screens/ResultScreen';
import QuizScreen from './screens/QuizScreen';
import TermsScreen from './screens/TermsScreen';
import {Asset as Font} from "expo-asset";

const CustomDrawer = (props) => {
    return (
        <View>
            <View style={styles.header}>
                <Text>Quiz App</Text>
                <Image source={require('./assets/quizLogo.png')} style={styles.logo} />
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
            drawerContent={(props) => <CustomDrawer {...props} />}
        >
            <Drawer.Screen name="Menu" component={HomeScreen} />
            <Drawer.Screen name="Result" component={ResultsScreen} />
        </Drawer.Navigator>
    );
}

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App () {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    async function loadResourcesAsync() {
        await Promise.all([
            Font.loadAsync({
                'Lobster': require('./assets/fonts/Lobster.ttf'),
                'OpenSans': require('./assets/fonts/OpenSans.ttf'),
            })
        ]);
        setLoadingComplete(true);
    }

    loadResourcesAsync().then();

    // const getInitialPage = async () => {
    //     const showTerms = await AsyncStorage.getItem('terms');
    //     if (showTerms) return 'Terms';
    //     return 'Home';
    // }



    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={HomeScreen}>
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
      fontFamily: 'OpenSans',
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
});
