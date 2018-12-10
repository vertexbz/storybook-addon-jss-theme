// @flow
import * as React from 'react';
import style from './styles';
import * as event from './events';
import injectSheet from 'react-jss';
import type { ThemeType } from './types';

type ThemesProps = {
    channel: any,
    api: any,
    classes: {
        Button: string,
        SelectedButton: string,
        Row: string
    },
    active: boolean
};

type ThemesState = {
    theme: ?ThemeType,
    themes: ThemeType[]
};

class Themes extends React.Component<ThemesProps, ThemesState> {
    state = {
        theme: null,
        themes: []
    };

    constructor(...args: *) {
        super(...args);

        // $FlowIgnore
        this.setTheme = this.setTheme.bind(this);
        // $FlowIgnore
        this.setThemes = this.setThemes.bind(this);
        // $FlowIgnore
        this.onReceiveThemes = this.onReceiveThemes.bind(this);
        // $FlowIgnore
        this.renderThemeButton = this.renderThemeButton.bind(this);
    }

    onReceiveThemes(themes: ThemeType[]) {
        this.setThemes(themes);
        if (themes.length > 0) {
            this.setTheme(themes[0]);
        }
    }

    setTheme(theme: ThemeType) {
        this.setState({ theme });
        this.props.channel.emit(event.SelectTheme, theme);
    }

    setThemes(themes: ThemeType[]) {
        this.setState({ themes });
    }

    componentDidMount() {
        this.props.channel.on(event.SetThemes, this.onReceiveThemes);
    }

    componentWillUnmount() {
        this.props.channel.removeListener(event.SetThemes, this.onReceiveThemes);
    }

    renderThemeButton(theme: ThemeType, i: number): React.Element<'div'> {
        const classNames = [this.props.classes.Button];
        if (theme === this.state.theme) {
            classNames.push(this.props.classes.SelectedButton);
        }

        return (
            <div
                className={classNames.join(' ')}
                key={`${i}-${theme.name}`}
                onClick={this.setTheme.bind(this, theme)}
            >
                {theme.name}
            </div>
        );
    }

    render(): ?React.Element<'div'> {
        if (!this.props.active || !this.state.themes || this.state.themes.length === 0) {
            return null;
        }

        return (
            <div className={this.props.classes.Row}>
                {this.state.themes.map(this.renderThemeButton)}
            </div>
        );
    }
}

export default injectSheet(style)(Themes);
