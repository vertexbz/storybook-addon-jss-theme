import * as React from 'react';
import { shallow } from 'enzyme';
import Themes from '../Themes';

jest.mock('@storybook/addons');
const addonsMock = require('@storybook/addons').default;

describe('register', () => {
    it('registers plugin and panel', () => {
        require('../register');
        expect(addonsMock.register).toBeCalledTimes(1);
        expect(addonsMock.addPanel).not.toBeCalled();

        const registerCallArgs = addonsMock.register.mock.calls[0];
        const registerCallback = registerCallArgs[1];

        expect(typeof registerCallArgs[0]).toBe('string');
        expect(typeof registerCallback).toBe('function');

        registerCallback();
        expect(addonsMock.addPanel).toBeCalledTimes(1);

        const addPanelCallArgs = addonsMock.addPanel.mock.calls[0];
        const addPanelPayload = addPanelCallArgs[1];

        expect(typeof addPanelCallArgs[0]).toBe('string');
        expect(typeof addPanelPayload).toBe('object');

        expect(addPanelPayload.title).toBe('Themes');
        expect(typeof addPanelPayload.render).toBe('function');

        const renderedPanel = shallow(addPanelPayload.render());

        expect(addonsMock.getChannel).toBeCalled();
        expect(renderedPanel.type()).toBe(shallow(<Themes />).type());
    });
});
