// @flow
import * as React from 'react';
import injectStyles from 'react-jss';

type DemoProps = {
    classes: {
        Demo: string
    }
};

const Demo = ({ classes }: DemoProps) => (
    <div className={classes.Demo}>Demo</div>
);

const makeStyle = (theme) => ({
    Demo: {
        width: 300,
        lineHeight: '100px',
        textAlign: 'center',
        border: {
            width: '1px',
            style: 'solid',
            color: 'red'
        },
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        borderRadius: theme.borderRadius
    }
});

export default injectStyles(makeStyle)(Demo);
