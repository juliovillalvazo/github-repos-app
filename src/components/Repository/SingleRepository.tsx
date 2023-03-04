import { View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import useSingleRepository from '../../hooks/useSingleRepository';
import { RepositoryItemContainer } from '../Repositories/RepositoryItem';
import Text from '../UI/Text';
import theme from '../../theme';

const styles = StyleSheet.create({
    errorText: {
        marginBottom: 18,
        color: theme.colors.red,
    },
});

const SingleRepository = () => {
    const { id } = useParams();
    const { repository, loading, error } = useSingleRepository(id);

    if (!repository || error)
        return (
            <View>
                <Text style={styles.errorText}>
                    {error ? error.message : 'No repository'}
                </Text>
            </View>
        );

    if (loading) {
        return (
            <View>
                <Text>Fetching data...</Text>
            </View>
        );
    }

    return <RepositoryItemContainer data={repository} />;
};

export default SingleRepository;
