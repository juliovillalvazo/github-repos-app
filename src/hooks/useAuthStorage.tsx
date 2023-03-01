import React, { createContext } from 'react';
import { useContext } from 'react';
import AuthStorage from '../utils/authStorage';

// const authStorage = new AuthStorage();

// type Action =
//     | { type: 'SET_TOKEN'; payload: string }
//     | { type: 'REMOVE_TOKEN' }
//     | { type: 'GET_TOKEN'; payload: string | undefined };

// type State = { accessToken: string | undefined };
// type Dispatch = (action: Action) => void;
// type Props = { children: ReactNode };

const AuthStorageContext = createContext<AuthStorage | undefined>(undefined);

// const authStorageReducer = (state: State, action: Action) => {
//     switch (action.type) {
//         case 'GET_TOKEN':
//             return { accessToken: action.payload };
//         case 'SET_TOKEN':
//             return { accessToken: action.payload };
//         case 'REMOVE_TOKEN':
//             return { accessToken: undefined };
//         default:
//             throw new Error(`Unhandled action type`);
//     }
// };

// const AuthStorageProvider = ({ children }: Props) => {
//     const [state, dispatch] = useReducer(authStorageReducer, {
//         accessToken: undefined,
//     });

//     const value = { state, dispatch };

//     return (
//         <AuthStorageContext.Provider value={value}>
//             {children}
//         </AuthStorageContext.Provider>
//     );
// };

export const useAuthStorage = () => {
    const context = useContext(AuthStorageContext);
    if (context === undefined) {
        throw new Error(
            'useAuthStorage must be used within AuthStorageProvider',
        );
    }

    return context;
};

// const getToken = async (dispatch: Dispatch) => {
//     try {
//         const getToken = await authStorage.getAccessToken();
//         dispatch({ type: 'GET_TOKEN', payload: getToken });
//     } catch (error) {
//         console.log(error);
//     }
// };

// const setToken = async (dispatch: Dispatch, payload: string) => {
//     try {
//         await authStorage.setAccessToken(payload);
//         dispatch({ type: 'SET_TOKEN', payload });
//     } catch (error) {
//         console.log(error);
//     }
// };

// const removeToken = async (dispatch: Dispatch) => {
//     try {
//         await authStorage.removeAccessToken();
//         dispatch({ type: 'REMOVE_TOKEN' });
//     } catch (err) {
//         console.log(err);
//     }
// };

export default AuthStorageContext;
