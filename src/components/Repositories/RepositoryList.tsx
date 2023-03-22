import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { SingleRepository } from '../../types';
import useRepositories from '../../hooks/useRepositories';
import {
    Menu,
    Divider,
    Button,
    Modal,
    Portal,
    Searchbar,
} from 'react-native-paper';
import { useDebounce } from 'use-debounce';
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

export const RepositoryListContainer = ({
    repositories,
    searchValue,
    onSearch,
    setOrderBy,
    setOrderDirection,
    openMenu,
    visible,
    menuLabel,
    closeMenu,
    loadingSearch,
}: any) => {
    const repositoryNodes: SingleRepository[] =
        repositories !== undefined
            ? repositories.edges.map((edge: any) => edge.node)
            : [];

    return (
        <FlatList
            data={repositoryNodes}
            ListHeaderComponent={
                <>
                    <Searchbar
                        value={searchValue}
                        onChangeText={(query) => onSearch(query)}
                        placeholder='Search repository...'
                        mode='view'
                        style={{ backgroundColor: theme.colors.white }}
                        showDivider={false}
                        loading={loadingSearch}
                    />
                    <Menu
                        anchor={
                            <Button
                                textColor={theme.colors.textSecondary}
                                icon='menu'
                                onPress={openMenu}
                                loading={visible}
                                mode='elevated'
                                style={{
                                    borderRadius: 0,
                                    backgroundColor:
                                        theme.colors.mainBackgroundColor,
                                    alignItems: 'flex-start',
                                }}
                            >
                                {menuLabel()}
                            </Button>
                        }
                        onDismiss={closeMenu}
                        visible={visible}
                    >
                        <Portal>
                            <Modal
                                visible={visible}
                                onDismiss={closeMenu}
                                contentContainerStyle={{
                                    backgroundColor: theme.colors.primary,
                                    alignItems: 'flex-end',
                                    flexWrap: 'wrap-reverse',
                                    alignSelf: 'center',
                                    justifyContent: 'flex-start',
                                }}
                                style={{
                                    marginTop: 0,
                                    padding: 2,
                                }}
                            >
                                <Menu.Item
                                    onPress={() => {
                                        setOrderBy('RATING_AVERAGE');
                                        setOrderDirection('DESC');
                                        closeMenu();
                                    }}
                                    title='Select an item...'
                                    titleStyle={{
                                        color: theme.colors.white,
                                    }}
                                    contentStyle={{
                                        width: '100%',
                                        opacity: 0.4,
                                    }}
                                    theme={{
                                        colors: {
                                            primary: theme.colors.white,
                                            onSurfaceVariant:
                                                theme.colors.white,
                                        },
                                    }}
                                    disabled
                                />
                                <Divider
                                    style={{
                                        width: '100%',
                                    }}
                                />
                                <Menu.Item
                                    onPress={() => {
                                        setOrderBy('RATING_AVERAGE');
                                        setOrderDirection('DESC');
                                        closeMenu();
                                    }}
                                    title='Highest rated'
                                    titleStyle={{ color: theme.colors.white }}
                                    leadingIcon={{
                                        source: 'arrow-up',
                                        direction: 'ltr',
                                    }}
                                    contentStyle={{
                                        width: '100%',
                                    }}
                                    theme={{
                                        colors: {
                                            primary: theme.colors.white,
                                            onSurfaceVariant:
                                                theme.colors.white,
                                        },
                                    }}
                                />
                                <Divider
                                    style={{
                                        width: '100%',
                                    }}
                                />
                                <Menu.Item
                                    onPress={() => {
                                        setOrderBy('RATING_AVERAGE');
                                        setOrderDirection('ASC');
                                        closeMenu();
                                    }}
                                    title='Lowest rated'
                                    titleStyle={{ color: theme.colors.white }}
                                    contentStyle={{
                                        width: '100%',
                                    }}
                                    leadingIcon='arrow-down'
                                    theme={{
                                        colors: {
                                            primary: theme.colors.white,
                                            onSurfaceVariant:
                                                theme.colors.white,
                                        },
                                    }}
                                />
                                <Divider
                                    style={{
                                        width: '100%',
                                    }}
                                />
                                <Menu.Item
                                    onPress={() => {
                                        setOrderBy('CREATED_AT');
                                        setOrderDirection('DESC');
                                        closeMenu();
                                    }}
                                    title='Latest repositories'
                                    titleStyle={{ color: theme.colors.white }}
                                    contentStyle={{
                                        width: '100%',
                                    }}
                                    leadingIcon='autorenew'
                                    theme={{
                                        colors: {
                                            primary: theme.colors.white,
                                            onSurfaceVariant:
                                                theme.colors.white,
                                        },
                                    }}
                                />
                                <Divider
                                    style={{
                                        width: '100%',
                                    }}
                                />
                                <Menu.Item
                                    onPress={() => {
                                        setOrderBy('CREATED_AT');
                                        setOrderDirection('ASC');
                                        closeMenu();
                                    }}
                                    title='Oldest repositories'
                                    titleStyle={{ color: theme.colors.white }}
                                    contentStyle={{
                                        width: '100%',
                                    }}
                                    leadingIcon='timer-sand-complete'
                                    theme={{
                                        colors: {
                                            primary: theme.colors.white,
                                            onSurfaceVariant:
                                                theme.colors.white,
                                        },
                                    }}
                                />
                            </Modal>
                        </Portal>
                    </Menu>
                </>
            }
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
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery] = useDebounce(searchQuery, 500);
    const [orderDirection, setOrderDirection] = useState('DESC');
    const { repositories, loading } = useRepositories(
        orderBy,
        orderDirection,
        debouncedQuery,
    );

    const openMenu = () => {
        setVisible(true);
    };
    const closeMenu = () => {
        setVisible(false);
    };

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
        <View style={{ height: '100%', width: '100%' }}>
            <RepositoryListContainer
                visible={visible}
                setOrderBy={setOrderBy}
                setOrderDirection={setOrderDirection}
                openMenu={openMenu}
                closeMenu={closeMenu}
                menuLabel={menuLabel}
                searchValue={searchQuery}
                onSearch={setSearchQuery}
                repositories={repositories}
                loadingSearch={loading}
            />
        </View>
    );
};

export default RepositoryList;
