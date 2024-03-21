import axios, {AxiosHeaders as Buffer} from "axios";

const API_Url = 'https://sensecap.seeed.cc/openapi';
const API_ID = "LHY5MB7C3C8WTAA5";
const Access_Api_Key = "34C99BBDA28A4BCD9C96EE749DAB454A32D60656623C47B583029382F350F555";

const sensorDictionary = {
    "Temperature": 4097,
    "Humidity": 4098,
    "LightIntensity": 4099,
    "BarometricPressure": 41011,
    "WindDirection": 4104,
    "WindSpeed": 4105,
    "Rainfall Hourly": 4113,
    "UVIndex": 4190,
    "SOSEvent": 4200,
    "MotionId": 4209,
    "BluetoothBeaconMACAddress": 5002
};

const getDeviceGroups = async () => {
    try {
        const response = await axios.get(`${API_Url}/list_groups`, {
            auth: {
                username: `${API_ID}`,
                password: `${Access_Api_Key}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const getSingleParameterFromDevice = async (eui, measurement_id, channel_index = 1) => {
    try {
        const response = await axios.get(`${API_Url}/list_telemetry_data`, {
            auth: {
                username: `${API_ID}`,
                password: `${Access_Api_Key}`
            },
            params: {
                device_eui: eui,
                measurement_id: measurement_id,
                channel_index: channel_index
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
const getAllDataFromDevice = async (eui, channel_index = 1) => {
    try {
        const response = await axios.get(`${API_Url}/list_telemetry_data`, {
            auth: {
                username: `${API_ID}`,
                password: `${Access_Api_Key}`
            },
            params: {
                device_eui: eui,
                channel_index: channel_index
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export {sensorDictionary, getDeviceGroups, getSingleParameterFromDevice, getAllDataFromDevice}
