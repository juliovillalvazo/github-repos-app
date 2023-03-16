import { Dimensions, FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { SingleRepository } from '../../types';
import useRepositories from '../../hooks/useRepositories';
import { Menu, Divider, Button } from 'react-native-paper';
import { useState } from 'react';
import theme from '../../theme';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({ item }: { item: SingleRepository }) => {
    return <RepositoryItem {...item} />;
};

export const RepositoryListContainer = ({ repositories }: any) => {
    const repositoryNodes: SingleRepository[] =
        repositories !== undefined
            ? repositories.edges.map((edge: any) => edge.node)
            : [];

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 130 }}
            // other props
        />
    );
};
const RepositoryList = () => {
    const [visible, setVisible] = useState(false);
    const [orderBy, setOrderBy] = useState('CREATED_AT');
    const [orderDirection, setOrderDirection] = useState('DESC');
    const { repositories } = useRepositories(orderBy, orderDirection);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const menuLabel = () => {
        switch (orderBy) {
            case 'CREATED_AT':
                if (orderDirection === 'ASC') return 'Oldest repositories...';
                return 'Latest repositories...';
            case 'RATING_AVERAGE':
                if (orderDirection === 'ASC') return 'Lowest rated...';
                return 'Highest rated...';
        }
    };

    return (
        <View style={{ height: '100%' }}>
            <Menu
                anchor={<Button onPress={openMenu}>{menuLabel()}</Button>}
                anchorPosition='bottom'
                onDismiss={closeMenu}
                visible={visible}
                contentStyle={{
                    backgroundColor: theme.colors.primary,
                    left: Dimensions.get('window').width - 200,
                    alignItems: 'flex-end',
                    width: 200,
                }}
                style={{ width: '100%' }}
            >
                <Menu.Item
                    onPress={() => {
                        setOrderBy('CREATED_AT');
                        setOrderDirection('ASC');
                        closeMenu();
                    }}
                    title='Oldest repositories'
                    titleStyle={{ color: theme.colors.white }}
                />
                <Divider />
                <Menu.Item
                    onPress={() => {
                        setOrderBy('RATING_AVERAGE');
                        setOrderDirection('ASC');
                        closeMenu();
                    }}
                    title='Lowest rated'
                    titleStyle={{ color: theme.colors.white }}
                />
                <Divider />
                <Menu.Item
                    onPress={() => {
                        setOrderBy('RATING_AVERAGE');
                        setOrderDirection('DESC');
                        closeMenu();
                    }}
                    title='Highest rated'
                    titleStyle={{ color: theme.colors.white }}
                />
                <Divider />
                <Menu.Item
                    onPress={() => {
                        setOrderBy('CREATED_AT');
                        setOrderDirection('DESC');
                        closeMenu();
                    }}
                    title='Latest repositories'
                    titleStyle={{ color: theme.colors.white }}
                />
            </Menu>
            <RepositoryListContainer repositories={repositories} />
        </View>
    );
};

export default RepositoryList;
