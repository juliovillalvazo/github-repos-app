import theme from '../../theme';
import { Text as NativeText, StyleSheet } from 'react-native';
import { ReactNode } from 'react';

interface Props {
    color?: 'textSecondary' | 'primary';
    fontSize?: 'subheading' | 'body';
    fontWeight?: 'bold' | 'normal';
    style?: {
        [key: string]: string | number;
    };
    children: ReactNode;
}

const styles = StyleSheet.create({
    text: {
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.body,
        fontFamily: theme.fonts.main,
        fontWeight: theme.fontWeights.normal,
    },
    colorTextSecondary: {
        color: theme.colors.textSecondary,
    },
    colorPrimary: {
        color: theme.colors.primary,
    },
    fontSizeSubheading: {
        fontSize: theme.fontSizes.subheading,
    },
    fontWeightBold: {
        fontWeight: theme.fontWeights.bold,
    },
});

const Text: React.FC<Props> = ({
    color,
    fontSize,
    fontWeight,
    style,
    ...props
}) => {
    const textStyle = [
        styles.text,
        color === 'textSecondary' && styles.colorTextSecondary,
        color === 'primary' && styles.colorPrimary,
        fontSize === 'subheading' && styles.fontSizeSubheading,
        fontWeight === 'bold' && styles.fontWeightBold,
        style,
    ];

    return (
        <NativeText style={textStyle} {...props}>
            {props.children}
        </NativeText>
    );
};

export default Text;
