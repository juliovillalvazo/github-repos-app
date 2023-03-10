import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from '../../theme';

interface Props {
    style?: {
        [key: string]: string | number;
    };
    name: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    multiline?: boolean;
}

const styles = StyleSheet.create({
    errorText: {
        marginBottom: 18,
        color: theme.colors.red,
    },
});

const FormikTextInput = ({ name, ...props }: Props) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

    return (
        <>
            <TextInput
                onChangeText={(value) => helpers.setValue(value)}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                error={showError}
                {...props}
            />
            {showError && <Text style={styles.errorText}>{meta.error}</Text>}
        </>
    );
};

export default FormikTextInput;
