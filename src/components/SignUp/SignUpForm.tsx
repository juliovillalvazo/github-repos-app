import FormikTextInput from '../UI/FormikTextInput';
import { View, Pressable, StyleSheet } from 'react-native';
import Text from '../UI/Text';
import theme from '../../theme';

type FormProps = {
    onSubmit: (values: any) => void;
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        backgroundColor: theme.colors.white,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 15,
        marginBottom: 30,
        height: 60,
    },
    createButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        backgroundColor: theme.colors.primary,
        borderRadius: 8,
    },
    createButton: {
        color: theme.colors.white,
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold,
    },
});

export const SignUpForm = ({ onSubmit }: FormProps) => {
    return (
        <View style={styles.container}>
            <FormikTextInput
                style={styles.input}
                name='username'
                placeholder='Username'
            />
            <FormikTextInput
                style={styles.input}
                name='password'
                placeholder='Password'
                secureTextEntry
            />
            <FormikTextInput
                style={styles.input}
                name='passwordConfirm'
                placeholder='Password Confirmation'
                secureTextEntry
            />
            <Pressable onPress={onSubmit}>
                <View style={styles.createButtonContainer}>
                    <Text style={styles.createButton}>Create Account</Text>
                </View>
            </Pressable>
        </View>
    );
};
