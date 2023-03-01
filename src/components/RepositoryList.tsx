import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem/RepositoryItem';
import { Item } from '../types';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({ item }: { item: Item }) => {
    return <RepositoryItem {...item} />;
};

const RepositoryList = () => {
    const { repositories } = useRepositories();

    const repositoryNodes: Item[] =
        repositories !== undefined
            ? repositories.edges.map((edge: any) => edge.node)
            : [];

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={renderItem}
            // other props
        />
    );
};

export default RepositoryList;
