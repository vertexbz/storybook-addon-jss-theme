// @flow
import * as React from 'react';
import { ButtonStyle, RowStyle, SelectedButtonStyle } from './styles';
import * as event from './events';
import type { ThemeType } from './types';

type ThemesProps = $ReadOnly<{
    channel: any,
    api: any
}>;

type ThemesState = {
    theme: ?ThemeType,
    themes: ThemeType[]
};

export default
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
        const buttonStyle = theme === this.state.theme ? SelectedButtonStyle : ButtonStyle;
        return <div style={buttonStyle} key={i} onClick={this.setTheme.bind(this, theme)}>{theme.name}</div>;
    }

    render(): ?React.Element<'div'> {
        if (!this.state.themes) {
            return null;
        }

        return (
            <div style={RowStyle}>
                {this.state.themes.map(this.renderThemeButton)}
            </div>
        );
    }
}
