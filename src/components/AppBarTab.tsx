import { Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import Text from './UI/Text';
import { useApolloClient } from '@apollo/client';
import { useAuthStorage } from '../hooks/useAuthStorage';

interface Props {
    label: string;
    route?: string;
}

const nativeStyles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800',
    },
    pressedContainer: {
        backgroundColor: 'dodgerblue',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    pressableContainer: {
        padding: 7,
    },
});

const AppBarTab = ({ label, route }: Props) => {
    const navigate = useNavigate();
    const apolloClient = useApolloClient();
    const authStorage = useAuthStorage();

    return (
        <Pressable
            onPress={async () => {
                if (label.includes('Out')) {
                    await authStorage.removeAccessToken();
                    apolloClient.resetStore();
                }
                navigate(route || '/');
            }}
            style={({ pressed }) => [
                pressed && nativeStyles.pressedContainer,
                nativeStyles.pressableContainer,
            ]}
        >
            <Text style={nativeStyles.text}>{label}</Text>
        </Pressable>
    );
};

export default AppBarTab;
