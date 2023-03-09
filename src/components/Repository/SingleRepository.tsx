import { View, StyleSheet, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import useSingleRepository from '../../hooks/useSingleRepository';
import { RepositoryItemContainer } from '../Repositories/RepositoryItem';
import Text from '../UI/Text';
import theme from '../../theme';
import { ReviewProps } from '../../types';

const styles = StyleSheet.create({
    separator: {
        height: 15,
    },
    errorText: {
        marginBottom: 18,
        color: theme.colors.red,
    },
    reviewContainer: {
        backgroundColor: theme.colors.white,
        padding: '2%',
        flexDirection: 'row',
        gap: 20,
    },
    textContainer: {
        maxWidth: '100%',
    },
});

const ReviewItem = ({
    review,
}: { review: ReviewProps } | { review: undefined }) => {
    if (!review) return <></>;
    return (
        <View style={styles.reviewContainer}>
            <View style={styles.textContainer}>
                <Text>{review.rating}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text>{review.user.username}</Text>
                <Text>{`${review.createdAt}`}</Text>
                <Text>{review.text}</Text>
            </View>
        </View>
    );
};

const ItemSeparator = () => {
    return <View style={styles.separator} />;
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
            ItemSeparatorComponent={ItemSeparator}
        />
    );
};

export default SingleRepository;
