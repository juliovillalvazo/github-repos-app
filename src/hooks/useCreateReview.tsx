import { useMutation, MutationResult } from '@apollo/client';
import { CREATE_REVIEW } from '../gql/mutations';
import { CreateReviewType, CreateReviewMutation } from '../types';

const useCreateReview = (): [
    (
        values: CreateReviewType,
    ) => Promise<CreateReviewMutation | null | undefined>,
    MutationResult<any>,
] => {
    const [mutate, result] = useMutation<CreateReviewMutation>(CREATE_REVIEW);

    const createReview: (
        values: CreateReviewType,
    ) => Promise<CreateReviewMutation | null | undefined> = async (values) => {
        try {
            console.log(values);
            const { data } = await mutate({
                variables: {
                    review: values,
                },
            });

            return data;
        } catch (e) {
            console.log(e);
        }
    };

    return [createReview, result];
};

export default useCreateReview;
