import { View, StyleSheet, Image } from 'react-native';
import theme from '../../theme';
import { Item } from '../../types';
import Text from '../UI/Text';
import RepositoryItemInfo from './RepositoryItemInfo';
import RepositoryItemStats from './RepositoryItemStats';

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

const RepositoryItem = ({
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
}: Item) => {
    return (
        <View testID='repositoryItem' style={styles.container}>
            <View style={styles.displayFlexRow}>
                <View style={styles.rightMargin}>
                    <Image
                        style={[styles.smallImage, styles.borderRadio]}
                        source={{ uri: ownerAvatarUrl }}
                    />
                </View>
                <RepositoryItemInfo
                    fullName={fullName}
                    description={description}
                    language={language}
                />
            </View>
            <RepositoryItemStats
                stargazersCount={stargazersCount}
                forksCount={forksCount}
                reviewCount={reviewCount}
                ratingAverage={ratingAverage}
            />
        </View>
    );
};

export default RepositoryItem;
