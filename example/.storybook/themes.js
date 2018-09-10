// @flow

const defaultTheme = {
    name: 'DEFAULT',
    variables: {
        backgroundColor: 'lightgrey',
        textColor: 'black',
        borderRadius: '30px'
    }
};

const darkTheme = {
    name: 'DARK',
    variables: {
        backgroundColor: 'black',
        textColor: 'white',
        borderRadius: '100px',
    }
};

export default [defaultTheme, darkTheme];
