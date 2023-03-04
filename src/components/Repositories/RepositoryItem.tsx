import { View, StyleSheet, Image, Pressable, Button } from 'react-native';
import theme from '../../theme';
import { SingleRepository } from '../../types';
import RepositoryItemInfo from './RepositoryItemInfo';
import RepositoryItemStats from './RepositoryItemStats';
import { useNavigate } from 'react-router-native';
import { openURL } from 'expo-linking';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white,
        marginBottom: 5,
        padding: '5%',
        width: '100%',
    },
    smallImage: {
        width: 40,
        height: 40,
    },
    borderRadio: {
        borderRadius: 8,
    },
    displayFlexRow: {
        flexDirection: 'row',
        paddingBottom: 10,
    },
    alignCenter: {
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    rightMargin: {
        marginRight: 10,
    },
});

export const RepositoryItemContainer = ({
    data,
}: {
    data: SingleRepository;
}) => {
    const navigate = useNavigate();
    const onPressHandler = async () => {
        try {
            if (data.url) await openURL(data.url);
            else throw new Error('No url provided');
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <Pressable onPress={() => navigate(`/repositories/${data.id}`)}>
            <View testID='repositoryItem' style={styles.container}>
                <View style={styles.displayFlexRow}>
                    <View style={styles.rightMargin}>
                        <Image
                            style={[styles.smallImage, styles.borderRadio]}
                            source={{ uri: data.ownerAvatarUrl }}
                        />
                    </View>
                    <RepositoryItemInfo
                        fullName={data.fullName}
                        description={data.description}
                        language={data.language}
                    />
                </View>
                <RepositoryItemStats
                    stargazersCount={data.stargazersCount}
                    forksCount={data.forksCount}
                    reviewCount={data.reviewCount}
                    ratingAverage={data.ratingAverage}
                />
                {data.url && (
                    <View>
                        <Button
                            onPress={onPressHandler}
                            title='Open in Github'
                        ></Button>
                    </View>
                )}
            </View>
        </Pressable>
    );
};

const RepositoryItem = ({
    id,
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
    url,
}: SingleRepository) => {
    const navigate = useNavigate();
    return (
        <Pressable onPress={() => navigate(`/repositories/${id}`)}>
            <RepositoryItemContainer
                data={{
                    id,
                    fullName,
                    description,
                    language,
                    forksCount,
                    stargazersCount,
                    ratingAverage,
                    reviewCount,
                    ownerAvatarUrl,
                    url,
                }}
            />
        </Pressable>
    );
};

export default RepositoryItem;
