import { View, StyleSheet, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import useSingleRepository from '../../hooks/useSingleRepository';
import { RepositoryItemContainer } from '../Repositories/RepositoryItem';
import Text from '../UI/Text';
import theme from '../../theme';
import { ReviewProps } from '../../types';

const styles = StyleSheet.create({
    errorText: {
        marginBottom: 18,
        color: theme.colors.red,
    },
});

const ReviewItem = ({
    review,
}: { review: ReviewProps } | { review: undefined }) => {
    if (!review) return <></>;
    return (
        <View>
            <Text>{`${review.createdAt}`}</Text>
            <Text>{`${review.id}`}</Text>
            <Text>{`${review.rating}`}</Text>
            <Text>{`${review.text}`}</Text>
            <Text>{`${review.user.id}`}</Text>
            <Text>{`${review.user.username}`}</Text>
        </View>
    );
};

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

    const reviews: ReviewProps[] | undefined = repository.reviews?.edges.map(
        (edge) => edge.node,
    );

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => (
                <RepositoryItemContainer data={repository} />
            )}
        />
    );
};

export default SingleRepository;
