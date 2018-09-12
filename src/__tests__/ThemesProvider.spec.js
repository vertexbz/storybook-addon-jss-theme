import { mount } from 'enzyme';
import * as React from 'react';
import ThemesProvider from '../ThemesProvider';
import * as event from '../events';

jest.mock('@storybook/addons');
const addonsMock = require('@storybook/addons').default;

describe('ThemesProvider', () => {
    // eslint-disable-next-line max-statements
    it('should work properly', () => {
        const themes = [
            {
                name: 'theme 1',
                variables: {
                    var: '1'
                }
            },
            {
                name: 'theme 2',
                variables: {
                    var: '2'
                }
            }
        ];

        const TestThemesProvider = ({ children }) => children;
        const TestStory = () => <div />;

        const wrapper = mount(
            <ThemesProvider themes={themes} ThemeProvider={TestThemesProvider}>
                <TestStory />
            </ThemesProvider>
        );

        expect(wrapper.render()).toMatchSnapshot();
        expect(addonsMock.__channel.on).toBeCalledTimes(1);

        const registerSelectThemeCall = addonsMock.__channel.on.mock.calls[0];
        const registerSelectThemeCallback = registerSelectThemeCall[1];
        expect(registerSelectThemeCall[0]).toBe(event.SelectTheme);

        expect(addonsMock.__channel.emit).toBeCalledTimes(1);
        expect(addonsMock.__channel.emit).toBeCalledWith(event.SetThemes, themes);

        registerSelectThemeCallback(themes[0]);
        wrapper.update();
        expect(wrapper.render()).toMatchSnapshot();

        expect(wrapper.find(TestThemesProvider).exists()).toBeTruthy();
        expect(wrapper.find(TestThemesProvider).prop('theme')).toBe(themes[0].variables);

        expect(wrapper.find(TestThemesProvider).find(TestStory).exists()).toBeTruthy();



        registerSelectThemeCallback(themes[1]);
        wrapper.update();
        expect(wrapper.render()).toMatchSnapshot();

        expect(wrapper.find(TestThemesProvider).exists()).toBeTruthy();
        expect(wrapper.find(TestThemesProvider).prop('theme')).toBe(themes[1].variables);

        expect(wrapper.find(TestThemesProvider).find(TestStory).exists()).toBeTruthy();


        wrapper.unmount();
        expect(addonsMock.__channel.removeListener).toBeCalledTimes(1);
    });
});
