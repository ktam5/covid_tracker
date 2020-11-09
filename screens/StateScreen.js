import React, { useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl, StyleSheet, Text, SafeAreaView, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function StateScreen() {
    const [refreshing, setRefreshing] = useState(false);
    const [usState, setUsState] = useState('IL');
    const [confirmed, setConfirmed] = useState(0);
    const [death, setDeath] = useState(0);
    const [tested, setTested] = useState(0);
    const [hospitalized, setHospitalized] = useState(0);
    const [confirmedIncrease, setConfirmedIncrease] = useState(0);
    const [deathIncrease, setDeathIncrease] = useState(0);
    const [testedIncrease, setTestedIncrease] = useState(0);
    const [hospitalizedIncrease, setHospitalizedIncrease] = useState(0);

    const onRefresh = () => {
        setRefreshing(true);
        setUsState(usState);
        fetchStateData(usState);
        setRefreshing(false);
    };

    useEffect(() => {
        setUsState(usState);
        fetchStateData(usState);
    }, []);

    const fetchStateData = (s) => {
        fetch('https://api.covidtracking.com/v1/states/current.json')
            .then((response) => response.json())
            .then((json) => {
                for (const i of json) {
                    if (i.state == s) {
                        i.positive == null ? setConfirmed(0) : setConfirmed(i.positive);
                        i.totalTestResults == null ? setTested(0) : setTested(i.totalTestResults);
                        i.hospitalized == null ? setHospitalized(0) : setHospitalized(i.hospitalized);
                        i.death == null ? setDeath(0) : setDeath(i.death);
                        i.positiveIncrease == null ? setConfirmedIncrease(0) : setConfirmedIncrease(i.positiveIncrease);
                        i.totalTestResultsIncrease == null ? setTestedIncrease(0) : setTestedIncrease(i.totalTestResultsIncrease);
                        i.hospitalizedIncrease == null ? setHospitalizedIncrease(0) : setHospitalizedIncrease(i.hospitalizedIncrease);
                        i.deathIncrease == null ? setDeathIncrease(0) : setDeathIncrease(i.deathIncrease);
                    }
                }
            })
            .catch((error) => console.error(error));
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <Text style={styles.title}>Covid-19 ({usState})</Text>
                <View style={{height: 260}}>
                    <Picker
                        selectedValue={usState}
                        style={{ height: 20, width: Dimensions.get('window').width }}
                        onValueChange={(itemValue, itemIndex) => {
                            setUsState(itemValue);
                            fetchStateData(itemValue);
                        }}>
                        <Picker.Item label="Alabama" value="AL" />
                        <Picker.Item label="Alaska" value="AK" />
                        <Picker.Item label="Arizona" value="AZ" />
                        <Picker.Item label="Arkansas" value="AR" />
                        <Picker.Item label="California" value="CA" />
                        <Picker.Item label="Colorado" value="CO" />
                        <Picker.Item label="Conneticut" value="CT" />
                        <Picker.Item label="Delaware" value="DE" />
                        <Picker.Item label="Florida" value="FL" />
                        <Picker.Item label="Georgia" value="GA" />
                        <Picker.Item label="Hawaii" value="HI" />
                        <Picker.Item label="Idaho" value="ID" />
                        <Picker.Item label="Illinois" value="IL" />
                        <Picker.Item label="Indiana" value="IN" />
                        <Picker.Item label="Iowa" value="IA" />
                        <Picker.Item label="Kansas" value="KS" />
                        <Picker.Item label="Kentucky" value="KY" />
                        <Picker.Item label="Louisiana" value="LA" />
                        <Picker.Item label="Maine" value="ME" />
                        <Picker.Item label="Maryland" value="MD" />
                        <Picker.Item label="Massachusetts" value="MA" />
                        <Picker.Item label="Michigan" value="MI" />
                        <Picker.Item label="Minnesota" value="MN" />
                        <Picker.Item label="Mississippi" value="MS" />
                        <Picker.Item label="Missouri" value="MO" />
                        <Picker.Item label="Montana" value="MT" />
                        <Picker.Item label="Nebraska" value="NE" />
                        <Picker.Item label="Nevada" value="NV" />
                        <Picker.Item label="New Hamsphire" value="NH" />
                        <Picker.Item label="New Jersey" value="NJ" />
                        <Picker.Item label="New Mexico" value="NM" />
                        <Picker.Item label="New York" value="NY" />
                        <Picker.Item label="North Carolina" value="NC" />
                        <Picker.Item label="North Dakota" value="ND" />
                        <Picker.Item label="Ohio" value="OH" />
                        <Picker.Item label="Oklahoma" value="OK" />
                        <Picker.Item label="Oregon" value="OR" />
                        <Picker.Item label="Pensylvania" value="PA" />
                        <Picker.Item label="Rhode Island" value="RI" />
                        <Picker.Item label="South Carolina" value="SC" />
                        <Picker.Item label="South Dakota" value="SD" />
                        <Picker.Item label="Tennessee" value="TN" />
                        <Picker.Item label="Texas" value="TX" />
                        <Picker.Item label="Utah" value="UT" />
                        <Picker.Item label="Vermont" value="VT" />
                        <Picker.Item label="Virginia" value="VA" />
                        <Picker.Item label="Washington" value="WA" />
                        <Picker.Item label="West Virgina" value="WV" />
                        <Picker.Item label="Wisconsin" value="WI" />
                        <Picker.Item label="Wyoming" value="WY" />
                    </Picker>
                </View>
                <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width, flexDirection: 'row' }}>
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
        margin: 20,
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