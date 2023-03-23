import { SingleRepositoryContainer } from '../Repository/SingleRepository';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useQuery } from '@apollo/client';
import { ME } from '../../gql/queries';

export const RepositoryListProfile = () => {
    const { data, loading } = useQuery(ME, {
        variables: {
            seeReviews: true,
        },
    });

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

    return <SingleRepositoryContainer cta repository={data.me} />;
};
