import * as index from '../index';

import Themes from '../Themes';
import ThemesProvider from '../ThemesProvider';
import withThemesProvider from '../withThemesProvider';

describe('index', () => {
    it('exposes proper interface', () => {
        expect(index.Themes).toBe(Themes);
        expect(index.ThemesProvider).toBe(ThemesProvider);
        expect(index.withThemesProvider).toBe(withThemesProvider);
    });
});
