# ReroIlsUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.

This is a prototype to test angular universal for rero-ils.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Angular Universal

The angular universal works only for the single app application: we thus need
to create a single app application for the public view. This implies to recreate
some UI view in angular. Angular universal does not support window, navigator,
etc. It seems that our public-search uses external libraries that use those. This
is why we have created this project. If we decide to create a simple app angular
application, we can try to refactor the complete rero-ils-ui and we can get rid
of bootstrap in profit to a pure primeng application.

### How does it woks

- the node server execute the angular application on the server side and serve
  the first page to the browser with the angular context application. Once the
  page is loaded on the browser the angular application behaves as a standard
  app.

### Requirement

- need to enable CORS on the invenio server: REST_ENABLE_CORS = True
  - actually the server address is hard coded in the code (ilsdev.test.rero.ch)
- an other approach consist to access using a relative URL for the API. In such
  case we need to use a proxy file as we do now for the current application, and
  add in the sever.js file a proxy on the right server ```server.use('/api', createProxyMiddleware({ target: 'https://ilsdev.test.rero.ch', changeOrigin: true }));```
- if the absolute URL is on the localhost we need to set the var env in the
  terminal to support self signed certificate: NODE_TLS_REJECT_UNAUTHORIZED=0

__Note:__ check the server log to see if the server side REST calls does not
          gives an error.

### Development

- `npm run serve frontend`: run the standard dev server
- `npm run dev:ssr`: run the ssr/express node dev server
- `npm run build:ssr && node dist/frontend/server/main.js`: will compile and run
   the node server as in production

### Production

- a new docker image should be created with node to serve the application
- nginx should mount the node application as done with uwsgi
- we would probably use the prerender mode  instead of dynamic

#### Questions
- do we need to consider more workers?
- what is the performance?
- what is the impact in our production server?
