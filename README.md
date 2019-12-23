## React Autocomplete Tags Input

A simple React component for displaying an editable list of tags with autocompletion for adding more tags. This is inspired by the Components field editor in Jira.

Please note that this package is not yet ready for production use. I'm still actively working on this but please come back soon!

### Installation
The package can be installed via npm
```
npm install @jchristou/react-autocomplete-tags-input
```

You will need to install React and React-Dom separately (peer dependencies).

The default styling is not automatically included. To include it please import it
```js
import '@jchristou/react-autocomplete-tags-input/dist-component/style.css';
```

### Usage
See the [example project](https://github.com/jameschristou/react-autocomplete-tags-input/tree/master/example)

### Development
Run `npm install` to install all packages and depenedencies.

#### Dev
To compile front end assets while developing use `npm run start`.

#### Production
`npm run build`

#### Analysis
`npm run build:analyze` builds static analysis to examine bundle sizing. You can see output reports in dist/stats.html and dist/report.html
then use http-server to run a http server and access the stats.html. Just run `http-server dist` (ensure you have http-server installed globally)
the dist parameter ensures that it uses the dist folder. It will give you an IP address e.g. http://172.17.126.81:8080 then you can access
stats.html using http://172.17.126.81:8080/stats.html.