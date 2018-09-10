# storybook-addon-jss-theme

## Installation
```bash
yarn add -D storybook-addon-jss-theme
```

### Configure storybook
To get this addon in your story book you have to register the panel and add story decorator
 
#### Registering the panel
Add to .storybook/addons.js 
```javascript
import 'storybook-addon-jss-theme/dist/register';
```

#### Adding story decorator
addDecorator to .storybook/config.js
```javascript
import {addDecorator} from '@storybook/react';
import {withThemesProvider} from 'storybook-addon-jss-theme';

const themes = [theme1, theme2];
addDecorator(withThemesProvider(themes));
```

> or

addDecorator to particular stories 

```javascript
import {withThemesProvider} from 'storybook-addon-jss-theme';

const themes = [theme1, theme2];

storiesOf("demo", module)
  .addDecorator(withThemesProvider(themes))
  .add("themed component", () => <JSSThemedComponent />);
```

## Example
To run provided example execute following command, storybook will run on port 3000
```bash
yarn example
```

## API

### Theme object
Theme object must contain two fields 
- `name` (string): This contains the theme name displayed in Themes panel
- `variables` (object): This object holds all theme variables

#### Example

```javascript
const defaultTheme = {
    name: 'DEFAULT',
    variables: {
        backgroundColor: 'lightgrey',
        textColor: 'black',
        borderRadius: '30px'
    }
};
```  

### `withThemesProvider`
`withThemesProvider` decorator takes one required argument which is an array of themes (look above for shape of theme object)
and second (optional) which is a ThemeProvider component for custom theme providers created with JSS's createTheme function 

```
withThemesProvider(themes[, ThemeProvider])
```
