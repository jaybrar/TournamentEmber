import Ember from 'ember';

export default Ember.Route.extend({
	name: ['sdfsf', "kaflksjdfl"],
	model: function() {
		// return $.get("http://localhost:3000/messages", function(res) {
		// 	console.log(res);
		// });
	},
	setupController: function(controller, model) {
    	controller.set('model', model);
    	controller.set('names', ["Ping Pong", "Fooseball", "Ping Pong Unrated", "Other"]);
	},
	actions: {
		generateMap: function() {
			var num = this.controller.get('n');
			console.log("number", num);
			var world = document.getElementById('test');
			var n = num;
			var count = 0;
			var x = Math.log2(n) + 1;
			var str = "";
			var arr = ["mike", 'sam', "jau", "jay", "jogn", "bill", "ben", "gerg"];

			for(var i = 0; i < x; i++) {
				str += '<div class=' + 'rest'+i + '>';
				console.log(i);
				for(var j=0;j<n;j++){
             		count ++
            		 str += '<div class=' + 'test'+i + '>'+ arr[count-1] + '</div>';
         		}
         		str += '</div>';
         		n = n/2
			}
			world.innerHTML = str;
			console.log(str);
		}
	}
});
