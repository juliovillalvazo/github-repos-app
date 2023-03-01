import { useMutation, MutationResult, useApolloClient } from '@apollo/client';
import { AUTHENTICATE } from '../gql/mutations';
import { AuthenticateInput } from '../types';
import { useAuthStorage } from './useAuthStorage';

interface AuthMutationResult {
    authenticate: {
        accessToken: string;
    };
}

const useSignIn = (): [
    (values: AuthenticateInput) => Promise<string | undefined>,
    MutationResult<any>,
] => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const [mutate, result] = useMutation<AuthMutationResult>(AUTHENTICATE);

    const signIn: (
        values: AuthenticateInput,
    ) => Promise<string | undefined> = async (values) => {
        try {
            const { data } = await mutate({
                variables: {
                    credentials: values,
                },
            });
            if (data) {
                await authStorage.setAccessToken(data.authenticate.accessToken);
                apolloClient.resetStore();
                const token = await authStorage.getAccessToken();
                return token;
            }
        } catch (e) {
            console.log(e);
        }
    };

    return [signIn, result];
};

export default useSignIn;
