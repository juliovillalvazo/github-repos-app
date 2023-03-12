import { Pressable, View, StyleSheet } from 'react-native';
import theme from '../../theme';
import FormikTextInput from '../UI/FormikTextInput';
import Text from '../UI/Text';

type FormProps = {
    onSubmit: (values: any) => void;
};

export const CreateReviewForm: React.FC<FormProps> = ({ onSubmit }) => {
    return (
        <View>
            <FormikTextInput
                name='repositoryOwner'
                placeholder='repository owner'
            />
            <FormikTextInput
                name='repositoryName'
                placeholder='repository name'
            />
            <FormikTextInput name='rating' placeholder='rating' />
            <FormikTextInput name='review' placeholder='review' />
            <Pressable onPress={onSubmit}>
                <Text>Create a Review</Text>
            </Pressable>
        </View>
    );
};
