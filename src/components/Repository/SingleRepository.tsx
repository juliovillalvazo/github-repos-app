import { View, StyleSheet, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import useSingleRepository from '../../hooks/useSingleRepository';
import { RepositoryItemContainer } from '../Repositories/RepositoryItem';
import Text from '../UI/Text';
import theme from '../../theme';
import { ReviewProps } from '../../types';
import { format } from 'date-fns';

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
    },
    textContainer: {
        paddingRight: '12%',
    },
    ratingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        marginRight: 10,
    },
    ratingBorder: {
        borderWidth: 2,
        borderColor: theme.colors.primary,
        borderRadius: 50,
    },
    textRating: {
        textAlign: 'center',
        color: theme.colors.primary,
        fontWeight: theme.fontWeights.bold,
    },
    author: {
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.textSecondary,
    },
    date: {
        color: theme.colors.textSecondary,
        fontSize: theme.fontSizes.body,
    },
    description: {
        color: theme.colors.textSecondary,
        fontWeight: theme.fontWeights.normal,
    },
});

const ReviewItem = ({
    review,
}: { review: ReviewProps } | { review: undefined }) => {
    if (!review) return <></>;
    const formattedDate = format(new Date(review.createdAt), 'MM.dd.yyyy');
    return (
        <View style={styles.reviewContainer}>
            <View style={[styles.ratingContainer, styles.ratingBorder]}>
                <Text style={styles.textRating}>{review.rating}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.author}>{review.user.username}</Text>
                <Text style={styles.date}>{formattedDate}</Text>
                <Text style={styles.description}>{review.text}</Text>
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
