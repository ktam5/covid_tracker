import React, { useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl, StyleSheet, Text, SafeAreaView, Dimensions } from 'react-native';

export default function CountryScreen() {
    const [refreshing, setRefreshing] = useState(false);

    const width = Dimensions.get('window').width;
    const [confirmed, setConfirmed] = useState(0);
    const [death, setDeath] = useState(0);
    const [tested, setTested] = useState(0);
    const [hospitalized, setHospitalized] = useState(0);

    const [confirmedIncrease, setConfirmedIncrease] = useState(0);
    const [deathIncrease, setDeathIncrease] = useState(0);
    const [testedIncrease, setTestedIncrease] = useState(0);
    const [hospitalizedIncrease, setHospitalizedIncrease] = useState(0);

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
            .then((json) => {
                setConfirmed(json[0].positive);
                setTested(json[0].totalTestResults);
                setHospitalized(json[0].hospitalized);
                setDeath(json[0].death);
                setConfirmedIncrease(json[0].positiveIncrease);
                setTestedIncrease(json[0].totalTestResultsIncrease);
                setHospitalizedIncrease(json[0].hospitalizedIncrease);
                setDeathIncrease(json[0].deathIncrease);
            })
            .catch((error) => console.error(error));
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <Text style={styles.title}>Covid-19 (US)</Text>
                <View style={{ width: width, height: width, flexDirection: 'row' }}>
                    <View>
                        <View style={[styles.boxes, { backgroundColor: '#9999ff' }]}>
                            <Text style={styles.word}>Tested</Text>
                            <Text style={styles.number}>+{testedIncrease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                            <Text style={styles.number}>{tested.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                        </View>
                        <View style={[styles.boxes, { backgroundColor: '#ff6666' }]}>
                            <Text style={styles.word}>Confirmed</Text>
                            <Text style={styles.number}>+{confirmedIncrease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                            <Text style={styles.number}>{confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                        </View>
                    </View>
                    <View>
                        <View style={[styles.boxes, { backgroundColor: '#33ff99' }]}>
                            <Text style={styles.word}>Hospitalized</Text>
                            <Text style={styles.number}>+{hospitalizedIncrease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                            <Text style={styles.number}>{hospitalized.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                        </View>
                        <View style={[styles.boxes, { backgroundColor: '#c0c0c0' }]}>
                            <Text style={styles.word}>Death</Text>
                            <Text style={styles.number}>+{deathIncrease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                            <Text style={styles.number}>{death.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.boxes, { backgroundColor: 'yellow', width: 300}]}>
                    <Text style={styles.word}>Positivity Rate</Text>
                    <Text style={styles.number}>{Math.round(100 * confirmedIncrease/testedIncrease)}%</Text>
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
        fontWeight: 'bold',
        margin: 40,
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
        fontSize: 25,
        fontWeight: '500'
    },
    number: {
        textAlign: 'center',
        fontSize: 20,
    }
});

