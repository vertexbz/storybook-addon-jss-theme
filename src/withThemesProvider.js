// @flow
import * as React from 'react';
import ThemesProvider from './ThemesProvider';
import type { ThemeType, ThemeProviderComponent } from './types';

type StoryRendererSig = () => React.Element<*>;

export default (themes: ThemeType[], ThemeProvider?: ThemeProviderComponent): * =>
    // eslint-disable-next-line react/display-name
    (story: StoryRendererSig): React.Element<typeof ThemesProvider> => {
        return <ThemesProvider ThemeProvider={ThemeProvider} themes={themes}>{story()}</ThemesProvider>;
    };
