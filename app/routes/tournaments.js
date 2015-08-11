import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return Ember.$.ajax({url: "https://tournamentrails.herokuapp.com/tournaments/all", dataType: "json", type: "GET"})
	},
	setupController: function(controller, model) {
    	controller.set('model', model.tournaments);
	}
});
