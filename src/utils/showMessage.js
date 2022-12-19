import { Toast } from 'native-base';
import { Alert } from 'react-native';

// To show display toast message success
export const toastMessagesuccess = (str) => {
    Toast.show({
        text: str,
        position: 'bottom',
        buttonText: 'Okay',
        duration: 5000,
        type: 'success'
    });
};

// To show display toast message failure
export const toastMessagefailure = (str) => {
    Toast.show({
        text: str,
        position: 'bottom',
        buttonText: 'Okay',
        duration: 5000,
        type: 'danger'
    });
};

// To show display toast message normal
export const toastMessageokey = (str) => {
    Toast.show({
        text: str,
        position: 'bottom',
        buttonText: 'Okay',
        duration: 5000,
        type: 'Okey'
    });
};

// Showing alert message
export const alertMessage = (title, body) => {
    Alert.alert(
        title,
        body,
        [
            { text: 'Ok', style: 'cancel' },
        ],
        { cancelable: false }
    );
};