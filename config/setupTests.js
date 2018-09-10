import 'jest';

import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

global.requestAnimationFrame = (callback) => {
    setTimeout(callback, 0);
};

const matchMedia = () => ({
    matches: false,
    addListener: null,
    removeListener: null,
});

global.matchMedia = global.matchMedia || matchMedia;
