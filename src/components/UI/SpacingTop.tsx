import Constants from 'expo-constants';
import { View, StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 20,
        backgroundColor: theme.colors.white,
    },
});

const SpacingTop = () => {
    return <View style={styles.container}></View>;
};

export default SpacingTop;
