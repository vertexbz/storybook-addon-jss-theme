import { mount } from 'enzyme';
import * as React from 'react';
import Themes from '../Themes';
import EventEmitter from 'events';
import * as event from '../events';

describe('Themes', () => {
    // eslint-disable-next-line max-statements
    it('should work properly', () => {
        const channelSpies = {
            emit: jest.spyOn(EventEmitter.prototype, 'emit'),
            on: jest.spyOn(EventEmitter.prototype, 'on'),
            removeListener: jest.spyOn(EventEmitter.prototype, 'removeListener')
        };

        const channel = new EventEmitter();

        const wrapper = mount(<Themes api={null} channel={channel} />);
        expect(wrapper.render()).toMatchSnapshot();
        expect(channelSpies.on).toBeCalledTimes(1);
        expect(channelSpies.emit).not.toBeCalled();
        expect(channelSpies.removeListener).not.toBeCalled();

        const themes = [
            {
                name: 'theme 1',
                variables: {

                }
            },
            {
                name: 'theme 2',
                variables: {

                }
            }
        ];

        channel.emit(event.SetThemes, themes);
        wrapper.update();
        expect(channelSpies.emit).toBeCalledWith(event.SetThemes, themes);
        expect(channelSpies.emit).toBeCalledWith(event.SelectTheme, themes[0]);
        expect(channelSpies.emit).toBeCalledTimes(2);
        channelSpies.emit.mockClear();

        expect(wrapper.render()).toMatchSnapshot();

        const generatedClassNames = wrapper.children().first().prop('classes');
        const buttons = wrapper.find('.' + generatedClassNames.Button);

        buttons.at(1).simulate('click');
        expect(wrapper.render()).toMatchSnapshot();
        expect(channelSpies.emit).toBeCalledWith(event.SelectTheme, themes[1]);
        expect(channelSpies.emit).toBeCalledTimes(1);
        channelSpies.emit.mockClear();

        buttons.at(0).simulate('click');
        expect(wrapper.render()).toMatchSnapshot();
        expect(channelSpies.emit).toBeCalledWith(event.SelectTheme, themes[0]);
        expect(channelSpies.emit).toBeCalledTimes(1);
        channelSpies.emit.mockClear();

        wrapper.unmount();
        expect(channelSpies.removeListener).toBeCalledTimes(1);
    });
});
