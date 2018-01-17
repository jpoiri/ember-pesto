import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('pesto-input');
  this.route('pesto-textarea');
  this.route('pesto-select');
  this.route('pesto-checkbox');
  this.route('pesto-checkbox-group');
  this.route('pesto-radio-button-group');
  this.route('pesto-button');
  this.route('pesto-form');
  this.route('sandbox');
});

export default Router;
