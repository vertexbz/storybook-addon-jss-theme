// @flow
import * as React from 'react';

type ThemeValueType = string | number | { +[string]: ThemeValueType } | ThemeValueType[];

export type ThemeType = {
    name: string,
    variables: {
        +[string]: any
    }
};

export type ThemeProviderComponent = React.ComponentType<{ theme: $Subtype<{}> }>;
