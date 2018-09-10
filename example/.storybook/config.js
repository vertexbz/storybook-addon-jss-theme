import {addDecorator, configure} from '@storybook/react';
import {withThemesProvider} from '../../dist';

import themes from './themes';

addDecorator(withThemesProvider(themes));

function loadStories() {
    require('../index.js');
}

configure(loadStories, module);