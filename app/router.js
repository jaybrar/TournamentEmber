import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('singles');
  this.route('home', {path: '/'});
  this.route('doubles');
  this.route('tournaments');
  this.route('show_tournament', {path: ':tournament_id'});
});

export default Router;
