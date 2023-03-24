import { MutationResult, useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../gql/mutations';

export const useDeleteReview = (): [
    (id: string) => Promise<void>,
    MutationResult<any>,
] => {
    const [mutate, result] = useMutation(DELETE_REVIEW);

    const deleteReview = async (id: string) => {
        try {
            await mutate({
                variables: {
                    id,
                },
            });
        } catch (e) {
            console.log(e);
        }
    };

    return [deleteReview, result];
};
