import { View, StyleSheet } from 'react-native';
import theme from '../../../theme';
import Text from '../../UI/Text';

interface Props {
    value: string | number;
    label: string;
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    title: {
        marginBottom: 8,
        fontWeight: theme.fontWeights.bold,
    },
});

const SingleStat = ({ value, label }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{value}</Text>
            <Text>{label}</Text>
        </View>
    );
};

export default SingleStat;
