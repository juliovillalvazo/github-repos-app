import * as yup from 'yup';
import { Formik } from 'formik';
import { View, StyleSheet } from 'react-native';
import { CreateReviewForm } from './CreateReviewForm';
import useCreateReview from '../../hooks/useCreateReview';
import { useNavigate } from 'react-router-native';
import theme from '../../theme';

export interface CreateReviewProps {
    error?: undefined;
    onSubmit: (values: any) => Promise<void>;
}

interface ReviewFormValues {
    repositoryOwner: string;
    repositoryName: string;
    rating: number;
    review?: string;
}

const initialValues = {
    repositoryOwner: '',
    repositoryName: '',
    rating: 0,
    review: '',
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: theme.colors.white,
        height: '100%',
        padding: '5%',
    },
});

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
    const [createReview, status] = useCreateReview();
    const navigate = useNavigate();

    const onSubmit = async (values: ReviewFormValues) => {
        try {
            const data = await createReview({
                ownerName: values.repositoryOwner,
                repositoryName: values.repositoryName,
                rating: Number(values.rating),
                text: values.review,
            });

            if (data?.createReview.repository.id)
                navigate(`/repositories/${data.createReview.repository.id}`);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <View style={styles.container}>
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
