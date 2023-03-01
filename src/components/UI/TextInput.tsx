import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../../theme';

interface Props {
    onChangeText: (value: any) => void;
    onBlur: () => void;
    value: string | undefined;
    style?: {
        [key: string]: string | number;
    };
    error: string | false | undefined;
}

const styles = StyleSheet.create({
    error: {
        borderColor: theme.colors.red,
    },
});

const TextInput = ({ style, error, ...props }: Props) => {
    const textInputStyle = [style];
    return (
        <NativeTextInput
            style={[textInputStyle, error ? styles.error : null]}
            {...props}
        />
    );
};

export default TextInput;
