import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return Ember.$.ajax({url: "https://tournamentrails.herokuapp.com/tournaments/all", dataType: "json", type: "GET"})
		// return $.get("http://localhost:3000/tournaments/all", function(res) {
		// 	console.log(res);
		// });
	},
	setupController: function(controller, model) {
    	controller.set('model', model.tournaments);
    	console.log(model);
	}
});
