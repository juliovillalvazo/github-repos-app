import * as yup from 'yup';
import { Formik } from 'formik';

import { View, StyleSheet } from 'react-native';
import { SignUpForm } from './SignUpForm';
import theme from '../../theme';

import useSignUp from '../../hooks/useSignUp';
import { CreateUserInputType } from '../../types';
import { useNavigate } from 'react-router-native';
import Text from '../UI/Text';

const initialValues = {
    username: '',
    password: '',
    passwordConfirm: '',
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: '100%',
        backgroundColor: theme.colors.white,
        padding: '5%',
    },
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
        .required('Username is required')
        .min(1, 'Username must be between 1 and 30 characters')
        .max(30),
    password: yup
        .string()
        .required('Password is required')
        .min(5, 'Password must be between 5 and 50 characters')
        .max(50),
    passwordConfirm: yup
        .string()
        .required('Password confirm is required')
        .oneOf([yup.ref('password'), ''], 'Passwords must match'),
});

export const SignUp = () => {
    const [signUp, status] = useSignUp();
    const navigate = useNavigate();
    const onSubmit = async (values: CreateUserInputType) => {
        console.log(values);
        try {
            const data = await signUp({
                username: values.username,
                password: values.password,
            });

            if (data) {
                console.log(data.createUser);
                navigate('/signIn');
            }
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <View style={styles.container}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
            </Formik>
            {status.error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{status.error.message}</Text>
                </View>
            )}
        </View>
    );
};
