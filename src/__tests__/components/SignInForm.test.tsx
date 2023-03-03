import { SignInContainer } from '../../components/SignIn/SignIn';
import {
    render,
    screen,
    fireEvent,
    waitFor,
} from '@testing-library/react-native';

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            const onSubmit = jest.fn();
            render(<SignInContainer onSubmit={onSubmit} />);

            fireEvent.changeText(
                screen.getByPlaceholderText('Username'),
                'juliol',
            );
            fireEvent.changeText(
                screen.getByPlaceholderText('Password'),
                'password',
            );
            fireEvent.press(screen.getByText('Sign In'));

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1);
                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: 'juliol',
                    password: 'password',
                });
            });
        });

        it('Does not call the onSubmit Function and shows error message when wrong username length', async () => {
            const onSubmit = jest.fn();
            render(<SignInContainer onSubmit={onSubmit} />);

            const container = screen.getByTestId('SignInContainer');

            fireEvent.changeText(
                screen.getByPlaceholderText('Username'),
                'jul',
            );
            fireEvent.changeText(
                screen.getByPlaceholderText('Password'),
                'password',
            );
            fireEvent.press(screen.getByText('Sign In'));

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(0);
                expect(container).toHaveTextContent(
                    'username must be at least 5 characters long',
                );
                // expect(container).toHaveTextContent(
                //     'password must be at least 8 characters long',
                // );
            });
        });

        it('Does not call the onSubmit Function and shows error message when wrong password length', async () => {
            const onSubmit = jest.fn();
            render(<SignInContainer onSubmit={onSubmit} />);

            const container = screen.getByTestId('SignInContainer');

            fireEvent.changeText(
                screen.getByPlaceholderText('Username'),
                'juliol',
            );
            fireEvent.changeText(
                screen.getByPlaceholderText('Password'),
                'pass',
            );
            fireEvent.press(screen.getByText('Sign In'));

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(0);
                expect(container).toHaveTextContent(
                    'password must be at least 8 characters long',
                );
            });
        });

        it('Does not call the onSubmit Function and shows error message when no username and password are inputted', async () => {
            const onSubmit = jest.fn();
            render(<SignInContainer onSubmit={onSubmit} />);

            const container = screen.getByTestId('SignInContainer');

            fireEvent.press(screen.getByText('Sign In'));

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(0);
                expect(container).toHaveTextContent('username is required');

                expect(container).toHaveTextContent('password is required');
            });
        });
    });
});
