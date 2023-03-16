import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import { Provider as PaperProvider } from 'react-native-paper';

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/hooks/useAuthStorage';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

export default function App() {
    return (
        <>
            <NativeRouter>
                <ApolloProvider client={apolloClient}>
                    <AuthStorageContext.Provider value={authStorage}>
                        <PaperProvider>
                            <Main />
                        </PaperProvider>
                    </AuthStorageContext.Provider>
                </ApolloProvider>
            </NativeRouter>
            <StatusBar style='auto' />
        </>
    );
}
