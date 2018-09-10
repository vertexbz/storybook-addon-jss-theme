// @flow
import * as React from 'react';
import addons from '@storybook/addons';
import Themes from './Themes';

addons.register('storybook/jss-themes', (api: *): * => {
    addons.addPanel('storybook/jss-themes/panel', {
        title: 'Themes',
        render(): React.Element<typeof Themes> {
            return <Themes channel={addons.getChannel()} api={api} />;
        }
    });
});
