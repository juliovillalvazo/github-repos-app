import { Pressable, View, StyleSheet } from 'react-native';
import theme from '../../theme';
import FormikTextInput from '../UI/FormikTextInput';
import Text from '../UI/Text';

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

export const CreateReviewForm: React.FC<FormProps> = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput
                style={styles.input}
                name='repositoryOwner'
                placeholder='repository owner'
            />
            <FormikTextInput
                style={styles.input}
                name='repositoryName'
                placeholder='repository name'
            />
            <FormikTextInput
                style={styles.input}
                name='rating'
                placeholder='rating'
            />
            <FormikTextInput
                style={styles.input}
                name='review'
                placeholder='reviews'
                multiline
            />
            <Pressable onPress={onSubmit}>
                <View style={styles.createButtonContainer}>
                    <Text style={styles.createButton}>Create a Review</Text>
                </View>
            </Pressable>
        </View>
    );
};
