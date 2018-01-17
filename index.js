'use strict';

module.exports = {
  name: 'ember-pesto',

  	included(app) {
  		app.import(`${app.bowerDirectory}/parsleyjs/dist/parsley.min.js`);
  		app.import(`${app.bowerDirectory}/bootstrap/dist/css/bootstrap.min.css`);
  		app.import(`${app.bowerDirectory}/bootstrap/dist/js/bootstrap.min.js`);
  	},
};
