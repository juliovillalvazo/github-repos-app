import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './Repositories/RepositoryList';
import AppBar from './AppBar/AppBar';
import SpacingTop from './UI/SpacingTop';
import theme from '../theme';
import SignIn from './SignIn/SignIn';
import SingleRepository from './Repository/SingleRepository';
import { CreateReview } from './CreateReview';
import { SignUp } from './SignUp';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.mainBackgroundColor,
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <SpacingTop />
            <Routes>
                <Route path='/' element={<RepositoryList />} />
                <Route path='/signIn' element={<SignIn />} />
                <Route path='*' element={<Navigate to='/' replace />} />
                <Route
                    path='/repositories/:id'
                    element={<SingleRepository />}
                />
                <Route path='/create-review' element={<CreateReview />} />
                <Route path='/signup' element={<SignUp />} />
            </Routes>
            <AppBar />
        </View>
    );
};

export default Main;
