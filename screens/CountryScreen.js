import React, { useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl, StyleSheet, Text, SafeAreaView, Dimensions } from 'react-native';

export default function CountryScreen() {
    const [refreshing, setRefreshing] = React.useState(false);

    const width = Dimensions.get('window').width;
    const [confirmed, setConfirmed] = React.useState(0);
    const [death, setDeath] = React.useState(0);
    const [tested, setTested] = React.useState(0);
    const [recovered, setRecovered] = React.useState(0);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchUSData();
        setRefreshing(false);
    }, []);

    useEffect(() => {
        fetchUSData();
    }, []);

    const fetchUSData = () => {
        fetch('https://api.covidtracking.com/v1/us/current.json')
          .then((response) => response.json())
          .then((json) => {setConfirmed(json[0].positive);
            setTested(json[0].totalTestResults);
            setRecovered(json[0].recovered);
            setDeath(json[0].death)})
          .catch((error) => console.error(error));
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <Text style={styles.title}>US Covid-19</Text>
                <View style={{ width: width, height: width, flexDirection: 'row' }}>
                    <View>
                        <View style={[styles.boxes, { backgroundColor: 'pink' }]}>
                            <Text style={styles.word}>Confirmed</Text>
                            <Text style={styles.number}>{confirmed}</Text>
                        </View>
                        <View style={[styles.boxes, { backgroundColor: 'blue' }]}>
                            <Text style={styles.word}>Tested</Text>
                            <Text style={styles.number}>{tested}</Text>
                        </View>
                    </View>
                    <View>
                        <View style={[styles.boxes, { backgroundColor: 'gray' }]}>
                            <Text style={styles.word}>Death</Text>
                            <Text style={styles.number}>{death}</Text>
                        </View>
                        <View style={[styles.boxes, { backgroundColor: 'green' }]}>
                            <Text style={styles.word}>Recovered</Text>
                            <Text style={styles.number}>{recovered}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    boxes: {
        width: Dimensions.get('window').width / 2 * .85,
        height: Dimensions.get('window').width / 2 * .85,
        borderRadius: 20,
        margin: 15,
        justifyContent: 'space-evenly',
    },
    word: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600'
    },
    number: {
        textAlign: 'center',
    }
});

