import { Platform } from "react-native"

enum Fonts {
    normal = '400',
    bold = '700'
}

interface Theme {
    colors: {
        [key: string]: string,
    }
    fontSizes: {
        [key: string]: number,
    }
    fonts: {
        [key: string]: string,
    }
    fontWeights: {
        [key: string]: Fonts,
    }
}

const theme: Theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        primary: '#0366d6',
        white: 'white',
        red: '#d73a4a',
        mainBackgroundColor: '#e1e4e8',
    },
    fontSizes: {
        body: 13,
        subheading: 16,
    },
    fonts: {
        main: Platform.select({
            ios: 'Arial',
            android: 'Roboto',
            default: 'System',
        }),
    },
    fontWeights: {
        normal: Fonts.normal,
        bold: Fonts.bold,
    },
};

export default theme;