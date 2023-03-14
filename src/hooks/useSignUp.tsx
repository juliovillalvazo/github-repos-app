import { useMutation, MutationResult } from '@apollo/client';
import { CREATE_USER } from '../gql/mutations';

import { CreateUserInputType, CreatedUserType } from '../types';

const useSignUp = (): [
    (
        values: CreateUserInputType,
    ) => Promise<CreatedUserType | undefined | null>,
    MutationResult<any>,
] => {
    const [mutate, result] = useMutation<CreatedUserType>(CREATE_USER);

    const signUp = async (values: CreateUserInputType) => {
        try {
            const { data } = await mutate({
                variables: {
                    user: values,
                },
            });

            return data;
        } catch (e) {
            console.log(e);
        }
    };

    return [signUp, result];
};

export default useSignUp;
