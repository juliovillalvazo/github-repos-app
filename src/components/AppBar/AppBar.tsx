import { ScrollView, StyleSheet, View } from 'react-native';
import AppBarTab from './AppBarTab';
import { useQuery } from '@apollo/client';
import { ME } from '../../gql/queries';

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 28,
        paddingLeft: 20,
        backgroundColor: '#24292e',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800',
    },
});

const AppBar = () => {
    const { data } = useQuery(ME);

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <AppBarTab label='Repositories' />
                {!data?.me ? (
                    <>
                        <AppBarTab label='Sign Up' route='signup' />
                        <AppBarTab label='Sign In' route='signIn' />
                    </>
                ) : (
                    <>
                        <AppBarTab
                            label='Create a Review'
                            route='create-review'
                        />
                        <AppBarTab label='My Reviews' route='my-reviews' />
                        <AppBarTab label='Sign Out' />
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default AppBar;
