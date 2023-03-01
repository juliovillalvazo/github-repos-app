import { View, StyleSheet } from 'react-native';
import Text from '../UI/Text';
import SingleStat from './StatsInfo/SingleStat';
import theme from '../../theme';

interface Props {
    stargazersCount: number;
    forksCount: number;
    reviewCount: number;
    ratingAverage: number;
}

const styles = StyleSheet.create({
    displayFlexRow: {
        flexDirection: 'row',
        paddingBottom: 10,
    },
    alignCenter: {
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});

const RepositoryItemStats = ({
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
}: Props) => {
    return (
        <View style={[styles.displayFlexRow, styles.alignCenter]}>
            <SingleStat
                value={
                    stargazersCount > 1000
                        ? `${(stargazersCount / 1000).toFixed(1)}k`
                        : stargazersCount
                }
                label={'Stars'}
            />
            <SingleStat
                value={
                    forksCount > 1000
                        ? `${(forksCount / 1000).toFixed(1)}k`
                        : forksCount
                }
                label={'Forks'}
            />
            <SingleStat
                value={
                    reviewCount > 1000
                        ? `${(reviewCount / 1000).toFixed(1)}k`
                        : reviewCount
                }
                label={'Reviews'}
            />
            <SingleStat value={ratingAverage} label={'Rating'} />
        </View>
    );
};

export default RepositoryItemStats;
