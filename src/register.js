// @flow
import * as React from 'react';
import addons from '@storybook/addons';
import Themes from './Themes';

type RenderProps = {
    active?: boolean
};

addons.register('storybook/jss-themes', (api: *): * => {
    addons.addPanel('storybook/jss-themes/panel', {
        title: 'Themes',
        render({ active }: RenderProps = { active: true }): ?React.Element<typeof Themes> {
            return <Themes channel={addons.getChannel()} api={api} active={active} />;
        }
    });
});
