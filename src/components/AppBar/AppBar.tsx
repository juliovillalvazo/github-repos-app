import { ScrollView, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import { useQuery } from '@apollo/client';
import { ME } from '../../gql/queries';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 14,
        paddingLeft: 20,
        backgroundColor: '#24292e',
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800',
    },
});

const AppBar = () => {
    const { data } = useQuery(ME);
    console.log(data);
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <AppBarTab label='Repositories' />
                {!data?.me ? (
                    <AppBarTab label='Sign In' route='signIn' />
                ) : (
                    <AppBarTab label='Sign Out' />
                )}
            </ScrollView>
        </View>
    );
};

export default AppBar;
