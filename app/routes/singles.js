import Ember from 'ember';

function world(res){
	var world = document.getElementById('test');
    var n = res.count;
    // var res_id = [];
    var count = 0;
    var x = Math.log2(n) + 1;
    var str = '<button class="btn waves-effect" id="undo_button" onclick="undoDrag()">Undo Drag</button><br>';
    var arr = [];
    var player_id = [];
    var player_rating = [];
    var player_score = [];
    var seed = [];
    for(var i=0; i<res.results.length;i++){
    	if(res.results[i].Player_1_score != null){
    		player_score.push(res.results[i].Player_1_score);
    	}else{
    		player_score.push("");
    	}
    	if(res.results[i].Player_2_score != null){
    		player_score.push(res.results[i].Player_2_score);
    	}else{
    		player_score.push("");
    	}
    }
    for(var i=0; i<res.results.length;i++){
      if(res.results[i].Player_1A_name != null){
      arr.push(res.results[i].Player_1A_name);
      player_id.push(res.results[i].Player_1A_id + '|' + res.results[i].results_id);
      player_rating.push(res.results[i].Player_1A_rating);
      seed.push(res.results[i].low_seed);
      }else{
      arr.push('');
      player_rating.push('');
      seed.push('');
      player_id.push('');
      }
      if(res.results[i].Player_2A_name != null){
      arr.push(res.results[i].Player_2A_name);
      player_id.push(res.results[i].Player_2A_id + '|' + res.results[i].results_id);
      player_rating.push(res.results[i].Player_2A_rating);
      seed.push(res.results[i].high_seed);
      }else{
      arr.push('');
      player_rating.push('');
      seed.push('');
      player_id.push('');
      }
    }
    for(var i = 0; i < x; i++) {
      
      str += '<div class=' + 'round'+i + '>';
      for(var j=0;j<n;j++){
              count ++
      if(arr[count-1] == ''){
       str += '<div ondrop="drop(event)" ondragover="allowDrop(event)" id=' + 'player'+i + ' class="'+res.results[Math.floor((count-1)/2)].results_id+ '"></div>';
      }else{
       str += '<div id=' + '"player'+i + '" class="'+res.results[Math.floor((count-1)/2)].results_id+ '"><p id="drag'+count+ '" draggable="true" ondragstart="drag(event)" class="'+player_id[count-1]+ '"><span id="a-score">'+player_score[count-1] + ' </span><span id="b-name">' + arr[count-1] + ' (' + player_rating[count-1] + ') </span><span id="b-name">s:' + seed[count-1] +'</span></p><form id="score"><input id="number" name="score" type="text" /><input id="score-user-id" name="user_id" type="hidden" value="'+player_id[count-1]+'"/></form></div>';
          }
          }
          str += '</div>';
          n = n/2
          
    }
	    world.innerHTML = str;
        if(res.results[res.results.length-1].Player_1A_name){
            document.getElementById("winner").innerHTML = "<div id='win'><h3>Congratulations!</h3><h3>" + res.results[res.results.length-1].Player_1A_name + "</h3></div>";
          }
}
export default Ember.Route.extend({
	
	model: function() {
		
	},
	setupController: function(controller, model) {
    	controller.set('model', model);
    	controller.set('myname', null);
    	controller.set('names', ["Ping Pong", "Fooseball", "Ping Pong Unrated", "Other"]);
    	// controller.set('content', []);
	},
	actions: {
		generateMap: function() {
			document.getElementById("winner").innerHTML = "";
			var self = this;
			var arr = this.controller.get('myname').split(',');
			var participants = [];
			var existing_participants = [];
			for(var i=0;i<arr.length;i++){
				participants.push(arr[i].trim());
				existing_participants.push('');
			}
			$.post(
				'https://tournamentrails.herokuapp.com/tournaments',
				{
					'Name':this.controller.get('tournament'),
					'Game':this.controller.get('type'),
					'participants':participants,
					'existing_participants':existing_participants,
					'Singles?':1
				},
				function(res) {
					if(res.results) {
		            world(res);
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
