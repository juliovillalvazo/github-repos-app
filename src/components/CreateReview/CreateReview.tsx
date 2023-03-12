import * as yup from 'yup';
import { Formik } from 'formik';
import { View } from 'react-native';
import theme from '../../theme';
import { CreateReviewForm } from './CreateReviewForm';

export interface CreateReviewProps {
    error?: undefined;
    onSubmit: (values: any) => Promise<void>;
}

const initialValues = {
    repositoryOwner: '',
    repositoryName: '',
    rating: 0,
    review: '',
};

const validationSchema = yup.object().shape({
    repositoryOwner: yup
        .string()
        .min(5, 'owner name must be at least  5 characters long')
        .required('repository owner is required'),
    repositoryName: yup
        .string()
        .min(5, 'repository name must be at least 5 characters long')
        .required('repository name is required'),
    rating: yup
        .number()
        .integer()
        .positive()
        .lessThan(101, 'Rating must be between 0 and 100')
        .required(),
    review: yup.string().min(20, 'Your review must be at least 20 characters'),
});

export const CreateReview = () => {
    const onSubmit = (values: any) => {
        console.log(values);
    };
    return (
        <View>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ handleSubmit }) => (
                    <CreateReviewForm onSubmit={handleSubmit} />
                )}
            </Formik>
        </View>
    );
};
