// @flow
import * as React from 'react';
import addons from '@storybook/addons';
import { ThemeProvider as JssThemeProvider } from 'react-jss';
import * as event from './events';
import type { ThemeType, ThemeProviderComponent } from './types';

type ThemesProviderProps = {
    ThemeProvider: ThemeProviderComponent,
    themes: Array<ThemeType>,
    children: React.Element<*>
};


type ThemesProviderState = {
    theme: ?ThemeType
};

export default
class ThemesProvider extends React.Component<ThemesProviderProps, ThemesProviderState> {
    static defaultProps = {
        ThemeProvider: JssThemeProvider
    };

    state = {
        theme: this.props.themes[0]
    };

    constructor(...args: *) {
        super(...args);

        // $FlowIgnore
        this.setTheme = this.setTheme.bind(this);
    }

    setTheme(theme: ThemeType) {
        this.setState({ theme });
    }

    componentDidMount() {
        const channel = addons.getChannel();
        channel.on(event.SelectTheme, this.setTheme);
        channel.emit(event.SetThemes, this.props.themes);
    }

    componentWillUnmount() {
        const channel = addons.getChannel();
        channel.removeListener(event.SelectTheme, this.setTheme);
    }

    render(): ?React.Element<ThemeProviderComponent> {
        if (!this.state.theme) {
            return null;
        }

        const ThemeProvider = this.props.ThemeProvider;

        return (
            <ThemeProvider theme={this.state.theme.variables}>
                {this.props.children}
            </ThemeProvider>
        );
    }
}
