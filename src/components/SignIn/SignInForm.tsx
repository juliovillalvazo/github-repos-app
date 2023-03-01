import { Pressable, View, StyleSheet } from 'react-native';
import theme from '../../theme';
import FormikTextInput from '../UI/FormikTextInput';
import Text from '../UI/Text';

interface Props {
    onSubmit: (values: any) => void;
}

const styles = StyleSheet.create({
    container: {
        padding: '5%',
        backgroundColor: theme.colors.white,
    },
    input: {
        borderColor: theme.colors.textSecondary,
        borderRadius: 8,
        borderWidth: 1,
        padding: '5%',
        marginBottom: 18,
    },
    button: {
        padding: '5%',
        backgroundColor: theme.colors.primary,
        color: theme.colors.white,
        borderRadius: 8,
        fontSize: theme.fontSizes.subheading,
        overflow: 'hidden',
        textAlign: 'center',
        fontWeight: theme.fontSizes.bold,
    },
    error: {
        borderColor: theme.colors.red,
    },
});

const SignInForm = ({ onSubmit }: Props) => {
    return (
        <View style={styles.container}>
            <View>
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
                <Pressable onPress={onSubmit}>
                    <Text style={styles.button}>Sign In</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default SignInForm;
