import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
    namespace: string;

    constructor(namespace = 'auth') {
        this.namespace = namespace;
    }

    async getAccessToken() {
        const accessToken = await AsyncStorage.getItem(`${this.namespace}`);
        return accessToken || '';
    }

    async setAccessToken(token: string) {
        await AsyncStorage.setItem(`${this.namespace}`, token);
    }

    async removeAccessToken() {
        await AsyncStorage.removeItem(`${this.namespace}`);
    }
}

export default AuthStorage;
