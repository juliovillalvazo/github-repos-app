import { View, StyleSheet } from 'react-native';
import Text from '../UI/Text';
import theme from '../../theme';

interface Props {
    fullName: string;
    description: string;
    language: string;
}

const styles = StyleSheet.create({
    alignStart: {
        alignItems: 'flex-start',
        flexShrink: 1,
    },
    displayFlexRow: {
        flexDirection: 'row',
    },
    language: {
        padding: '1.6%',
        color: theme.colors.white,
        backgroundColor: theme.colors.primary,
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 10,
    },
    content: {
        marginBottom: 10,
        color: theme.colors.textSecondary,
    },
    title: {
        marginBottom: 10,
        fontWeight: theme.fontWeights.bold,
    },
});

const RepositoryItemInfo = ({ fullName, description, language }: Props) => {
    return (
        <View style={styles.alignStart}>
            <Text style={styles.title}>{fullName}</Text>
            <Text style={styles.content}>{description}</Text>
            <View style={styles.displayFlexRow}>
                <Text style={styles.language}>{language}</Text>
            </View>
        </View>
    );
};

export default RepositoryItemInfo;
