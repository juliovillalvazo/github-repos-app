import * as yup from 'yup';
import { Formik } from 'formik';
import SignInForm from './SignInForm';
import useSignIn from '../../hooks/useSignIn';
import { AuthenticateInput } from '../../types';
import Text from '../UI/Text';
import { View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import theme from '../../theme';

const initialValues = {
    username: '',
    password: '',
};

const styles = StyleSheet.create({
    errorContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: theme.colors.white,
    },
    errorText: {
        color: theme.colors.red,
        fontSize: theme.fontSizes.subheading,
    },
});

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(5, 'username must be at least 5 characters long')
        .required('username is required'),
    password: yup
        .string()
        .min(8, 'password must be at least 8 characters long')
        .required('Password is required'),
});

const SignIn = () => {
    const [signIn, status] = useSignIn();
    const navigate = useNavigate();

    const onSubmit = async (values: AuthenticateInput) => {
        try {
            const token = await signIn(values);

            console.log(token);

            if (token) {
                navigate('/');
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
            </Formik>
            {status.error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{status.error.message}</Text>
                </View>
            )}
        </View>
    );
};

export default SignIn;
