import { SingleRepositoryContainer } from '../Repository/SingleRepository';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useQuery } from '@apollo/client';
import { ME } from '../../gql/queries';
import { useDeleteReview } from '../../hooks/useDeleteReview';
import { useEffect } from 'react';

export const RepositoryListProfile = () => {
    const { data, loading, refetch } = useQuery(ME, {
        variables: {
            seeReviews: true,
        },
    });

    useEffect(() => {
        refetch({ seeReviews: true });
    }, []);

    const [deleteReview, result] = useDeleteReview();

    const handleDelete = async (id: string) => {
        deleteReview(id);

        if (result.error) {
            throw new Error('Could not delete this review');
        }

        refetch({
            seeReviews: true,
        });
        return 'Ok';
    };

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

    return (
        <SingleRepositoryContainer
            onDelete={handleDelete}
            cta
            repository={data.me}
        />
    );
};
