import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {Card} from "react-native-paper";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import ApiManager from "../api/ApiManager";
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from "lodash";
import * as Font from "expo-font";



const HomeScreen = ({navigation}) => {
    const [refreshing, setRefreshing] = useState(false);
    const [resultsData, setResultsData] = useState([]);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        ApiManager.getAllTests().then(() => setRefreshing(false));
    }, []);



    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                'Lobster': require('../assets/fonts/Lobster.ttf'),
                 'OpenSans': require('../assets/fonts/OpenSans.ttf')
            });
            setFontsLoaded(true);
        };
        const fetchData = async () => {
            const cachedResult = JSON.parse(await AsyncStorage.getItem('storage-tests'));
            setResultsData(_.shuffle(cachedResult));
            try {
                const result = await ApiManager.getAllTests();
                setResultsData(_.shuffle(result));
            } catch (error) {
                console.error(error);
            }
        }

        loadFonts().then();
        fetchData().then();
    }, []);


    const renderItem = ({item}) => (
        <Pressable onPress={() => navigation.navigate('Quiz', {item: item},)}>
            <Card style={styles.itemCard}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemTags}>Tagi: {item.tags.join(', ')}</Text>
            </Card>
        </Pressable>
    );

    return !fontsLoaded ? (<Text>Wait</Text>) : (
        <View>
            <FlatList
                contentContainerStyle={styles.scrollView}
                data={resultsData}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
            <Card style={styles.card}>
                <Text style={styles.heading}>Przejdź do wyników</Text>
                <Pressable style={styles.button} onPress={() => navigation.navigate('Results')}>
                    <Text style={styles.buttonTitle}>Sprawdź!</Text>
                </Pressable>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        textAlign: 'center',
        margin: 15,
        padding: 15,
    },
    itemTitle: {
        fontSize: 20,
        fontFamily: 'Lobster',
    },
    itemDescription: {
        fontStyle: 'italic',

    },
    itemTags: {
        marginTop: 20,
        fontWeight: 'bold',
        fontFamily: 'Lobster',
    },
    heading: {
        textAlign: 'center',
        marginBottom: 15,
    },
    buttonTitle: {
        textAlign: 'center',
    },
    button: {
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        paddingStart: 20,
        paddingEnd: 20,
        backgroundColor: '#eeeeee'
    },
    itemCard: {
        margin: 5,
        padding: 10,
    },
});

export default HomeScreen;
