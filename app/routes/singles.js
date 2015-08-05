import Ember from 'ember';


export default Ember.Route.extend({
	model: function() {
		// return $.get("http://localhost:3000/messages", function(res) {
		// 	console.log(res);
		// });
	},
	setupController: function(controller, model) {
    	controller.set('model', model);
    	controller.set('myname', null);
    	controller.set('names', ["Ping Pong", "Fooseball", "Ping Pong Unrated", "Other"]);
    	// controller.set('content', []);
	},
	actions: {
		generateMap: function() {
			var self = this;
			var arr = this.controller.get('myname').split(',');
			var participants = [];
			var existing_participants = [];
			for(var i=0;i<arr.length;i++){
				participants.push(arr[i].trim());
				existing_participants.push('');
			}
			console.log(arr);
			console.log(participants);
			console.log(existing_participants);
			$.post(
				'http://localhost:3000/tournaments',
				{
					'Name':this.controller.get('tournament'),
					'Game':this.controller.get('type'),
					'participants':participants,
					'existing_participants':existing_participants,
					'Singles?':1
				},
				function(res) {
					if(res.results) {
						console.log(res);
						// self.transitionTo('tournaments');
						// map functions
						// var num = this.controller.get('n');
						// console.log("number", num);
						var world = document.getElementById('test');
						var n = res.count;
						var res_id = [];
						var count = 0;
						var x = Math.log2(n) + 1;
						var str = "";
						var arr = [];
						var player_id = [];

						for(var i=0; i<res.results.length;i++){
							if(res.results[i].Player_1A_name != null){
							arr.push(res.results[i].Player_1A_name);
							player_id.push(res.results[i].Player_1A_id + '|' + res.results[i].results_id);
							}else{
							arr.push('');
							}
							if(res.results[i].Player_2A_name != null){
							arr.push(res.results[i].Player_2A_name);
							player_id.push(res.results[i].Player_2A_id + '|' + res.results[i].results_id);
							}else{
							arr.push('');
							}
						}
						for(var i=0;i<arr.length;i++){
							res_id.push()
						}
						console.log("players", arr);
						console.log("ids", player_id);
						for(var i = 0; i < x; i++) {
							
							str += '<div class=' + 'round'+i + '>';
							// console.log(i);
							for(var j=0;j<n;j++){
			             		count ++
			             		if(arr[count-1] == ''){
			            		 str += '<div ondrop="drop(event)" ondragover="allowDrop(event)" id=' + 'player'+i + ' class="'+res.results[Math.floor((count-1)/2)].results_id+ '"><p></p></div>';
			            		}else{
			            		 str += '<div ondrop="drop(event)" ondragover="allowDrop(event)" id=' + 'player'+i + 'class="'+res.results[Math.floor((count-1)/2)].results_id+ '"><p id="drag'+count+ '" draggable="true" ondragstart="drag(event)" class="'+player_id[count-1]+ '">' + arr[count-1] +'</p></div>';
			            		}
			         		}
			         		str += '</div>';
			         		n = n/2
			         		
						}
						world.innerHTML = str;
						// console.log(str);
					} else {
						self.controller.set('errors', res.errors);
					}
				}
			);
			this.controller.set('tournament', null);
			this.controller.set('myname', null);
			this.controller.set('type', null);
		}
		// add: function(){
		// 	this.get('content').pushObject({name: ''});
		// }
	}
});
