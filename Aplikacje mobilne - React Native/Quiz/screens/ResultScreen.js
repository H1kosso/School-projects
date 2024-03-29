import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, View, Text, StyleSheet, RefreshControl} from 'react-native';
import {Card} from "react-native-paper";
import ApiManager from "../api/ApiManager";


const ResultScreen = ({navigation}) => {
    const [refreshing, setRefreshing] = useState(false);
    const [resultsData, setResultsData] = useState([]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData().then(() => setRefreshing(false));
    }, []);

    const fetchData = async () => {
        const result = await ApiManager.getResults();
        setResultsData(result.reverse());
    }

    useEffect(() => {
        fetchData().then();
    }, []);

    const renderItem = ({item}) => (
        <Card style={styles.itemCard}>
            <Text style={styles.itemNick}>{item.nick}</Text>
            <Text>Wynik: {item.score}/{item.total}</Text>
            <Text>Kategoria: {item.type}</Text>
            <Text>Data utworzenia: {item.createdOn}</Text>
        </Card>
    );

    return (
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
        </View>
    );
};

const styles = StyleSheet.create({
    itemCard: {
        margin: 5,
        padding: 10,
    },
    itemNick: {
        fontSize: 20,
    }
});

export default ResultScreen;
