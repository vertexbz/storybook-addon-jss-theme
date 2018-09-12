import * as React from 'react';
import { mount } from 'enzyme';
import withThemesProvider from '../withThemesProvider';
import ThemesProvider from '../ThemesProvider';

jest.mock('@storybook/addons');

describe('withThemesProvider', () => {
    it('decorates component with ThemesProvider', () => {
        expect(typeof withThemesProvider).toBe('function');

        const themes = [
            {
                name: 'test',
                variables: {

                }
            }
        ];

        const ThemeProvider = jest.fn();

        const storyDecorator = withThemesProvider(themes, ThemeProvider);

        expect(typeof storyDecorator).toBe('function');

        const Story = jest.fn(() => <div />);

        const rendered = storyDecorator(Story);

        expect(Story).toBeCalledTimes(1);

        const renderedStory = mount(rendered);

        expect(renderedStory.type()).toBe(ThemesProvider);
        expect(renderedStory.prop('themes')).toBe(themes);
        expect(renderedStory.prop('ThemeProvider')).toBe(ThemeProvider);
    });
});
