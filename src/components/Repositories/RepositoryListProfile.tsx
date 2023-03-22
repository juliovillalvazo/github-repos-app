import { SingleRepositoryContainer } from '../Repository/SingleRepository';
import { useQuery } from '@apollo/client';
import { ME } from '../../gql/queries';

export const RepositoryListProfile = () => {
    const { data, loading } = useQuery(ME, {
        variables: {
            seeReviews: true,
        },
    });

    return <SingleRepositoryContainer repository={data.me} loading={loading} />;
};
