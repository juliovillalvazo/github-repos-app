import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useNavigate, useParams } from 'react-router-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import useSingleRepository from '../../hooks/useSingleRepository';
import { RepositoryItemContainer } from '../Repositories/RepositoryItem';
import Text from '../UI/Text';
import theme from '../../theme';
import {
    ReviewProps,
    SingleRepository as SingleRepositoryType,
} from '../../types';
import { format } from 'date-fns';

export interface SingleRepositoryProps {
    loading?: boolean;
    repository?: SingleRepositoryType;
    header?: boolean;
    cta: boolean;
}

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
    background: {
        justifyContent: 'space-between',
    },
});

export const ReviewItem = ({
    review,
    cta,
}:
    | { review: ReviewProps; cta: boolean }
    | { review: undefined; cta: boolean }) => {
    if (!review) return <></>;
    const navigate = useNavigate();

    const formattedDate = format(new Date(review.createdAt), 'MM.dd.yyyy');
    return (
        <View>
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
            {cta && (
                <View style={[styles.reviewContainer, styles.background]}>
                    <Button
                        onPress={() => navigate(`/repositories/${review.id}`)}
                    >
                        View repository
                    </Button>
                    <Button
                        onPress={() => navigate(`/repositories/${review.id}`)}
                    >
                        Delete review
                    </Button>
                </View>
            )}
        </View>
    );
};

const ItemSeparator = () => {
    return <View style={styles.separator} />;
};

export const SingleRepositoryContainer: React.FC<SingleRepositoryProps> = ({
    loading,
    repository,
    header,
    cta,
}) => {
    if (!repository) return null;

    if (loading) {
        return (
            <View
                style={{
                    width: '100%',
                    padding: '5%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator animating={true} size={48} />
            </View>
        );
    }

    const reviews: ReviewProps[] | undefined = repository.reviews?.edges.map(
        (edge) => edge.node,
    );

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem cta={cta} review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => {
                return (
                    <>
                        {header && (
                            <RepositoryItemContainer data={repository} />
                        )}
                    </>
                );
            }}
            ItemSeparatorComponent={ItemSeparator}
            contentContainerStyle={{ paddingBottom: 100 }}
        />
    );
};

const SingleRepository = () => {
    const { id } = useParams();
    const { repository, loading } = useSingleRepository(id);

    return (
        <SingleRepositoryContainer
            cta={false}
            loading={loading}
            repository={repository}
            header
        />
    );
};

export default SingleRepository;
