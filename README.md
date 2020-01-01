## React Autocomplete Tags Input
A simple React component for displaying an editable list of tags with autocompletion for adding more tags.
This is inspired by the Components field editor in Jira. This component is built using React Hooks and does not
require Redux.

## Features
- Display list of tags and allow user to add and delete tags
- Supply list of allowed tags that user can select from when adding to the list
- Simple interface

### Coming Soon
- Reorder feature using drag and drop
- Ability for user to create new tags (outside of the allowed list) and add them to the list
- Multicolumn drop downs for very long select lists

## Suggestions & Feature Requests
If you have any suggestions for improvements for feature requests, open an issue on the [github page](https://github.com/jameschristou/react-autocomplete-tags-input/issues)

## Demo
Here is a simple demo which allows you to choose from a number of available programming languages and development tools.

![img](demo.gif)

## Installation
The package can be installed via npm
```
npm install @jchristou/react-autocomplete-tags-input
```

### Peer Dependencies
Install the following **peer dependencies** with given versions
```
"react": "^16.10.2",
"react-dom": "^16.10.2"
```

## Usage
See the [example project](https://github.com/jameschristou/react-autocomplete-tags-input/tree/master/example). This uses the `npm` published version of the component.

### Default Styling
To include the default styling you will need to import it
```js
import '@jchristou/react-autocomplete-tags-input/dist-component/style.css';
```

## Development
Run `npm install` to install all packages and depenedencies.

### Dev
To run dev server with HMR while developing use `npm run start`. This will run the project on http://localhost:8080 by default.

There is a `TestPage.js` component located in the `test` folder (see [TestPage.js]((https://github.com/jameschristou/react-autocomplete-tags-input/tree/master/test/components/TestPage.js))) which you can use for testing.

### Production
`npm run build`

### Analysis
`npm run build:analyze` builds static analysis to examine bundle sizing. You can see output reports in dist/stats.html and dist/report.html
then use http-server to run a http server and access the stats.html. Just run `http-server dist` (ensure you have http-server installed globally)
the dist parameter ensures that it uses the dist folder. It will give you an IP address e.g. http://172.17.126.81:8080 then you can access
stats.html using http://172.17.126.81:8080/stats.html.