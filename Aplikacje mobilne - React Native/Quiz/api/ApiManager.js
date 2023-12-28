import _ from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native/Libraries/Components/ToastAndroid/ToastAndroid";

const serverUrl = 'https://tgryl.pl';

class ApiManager {
    getResults() {
        return fetch(`${serverUrl}/quiz/results?last=20`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                return json;
            }).catch((error) => {
                console.error(error);
            });
    }

    sendResults(data) {
        return fetch(`${serverUrl}/quiz/result`, {
            method: 'POST',
            body: JSON.stringify(data),
        }).then((response) => response.json())
            .then((json) => {
                console.log('Succesfull');
                return json;
            }).catch((error) => {
                console.error(error);
            });
    }

    getAllTests() {
        return fetch(`${serverUrl}/quiz/tests`, {
            method: 'GET'
        }).then((response) => response.json())
            .then((json) => {
                return json;
            }).catch((error) => {
                console.error(error);
            });
    }

    getTestDetails(id) {
        return fetch(`${serverUrl}/quiz/test/${id}`, {
            method: 'GET'
        }).then((response) => response.json())
            .then((json) => {
                return json;
            }).catch((error) => {
                console.error(error);
            });
    }

    fetchRandomTests = async () => {
        try {
            const result = await this.getAllTests();
            return _.shuffle(result)[0];
        } catch(error) {
            const cachedResult = JSON.parse(await AsyncStorage.getItem('storage-tests'));
            return _.shuffle(cachedResult)[0];
        }
    }
     getRandomTest = async (props) => {
        const test = await this.fetchRandomTests();
        props.navigation.navigate('Quiz', { item: test });
    }
     fetchAllDatabase = async () => {
        Toast.show('Pobieram bazę danych', 1000);
        const results = await this.getResults();
        const tests = await this.getAllTests();
        let testsDetails = {};
        for(let i = 0; i < tests.length; i++ ) {
            testsDetails[tests[i].id] = await this.getTestDetails(tests[i].id);
        }

        await AsyncStorage.setItem('storage-results', JSON.stringify(results));
        await AsyncStorage.setItem('storage-tests', JSON.stringify(tests));
        await AsyncStorage.setItem('storage-tests-details', JSON.stringify(testsDetails));
        Toast.show('Baza została pobrana', 1000);
    }
}

export default new ApiManager();
