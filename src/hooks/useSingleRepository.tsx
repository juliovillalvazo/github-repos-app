import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../gql/queries';
import { SingleRepository } from '../types';
import { ApolloError } from '@apollo/client';

const useSingleRepository = (id: string | undefined) => {
    if (!id) {
        return {
            error: new ApolloError({ errorMessage: 'No id was provided' }),
        };
    }

    const { data, error, loading, refetch } = useQuery<{
        repository: SingleRepository;
    }>(GET_REPOSITORY, {
        variables: { id },
        fetchPolicy: 'cache-and-network',
    });

    console.log(data);

    return {
        repository: data?.repository,
        loading,
        refetch,
        error,
    };
};

export default useSingleRepository;
