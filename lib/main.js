if (Meteor.isClient) {

    //Aqui so irá roda em um refresh da sessão
    console.log("Hello client");

    Template.leaderboard.helpers({
        //code goes here
        'player': function () {
            
            console.log(PlayersList.find().fetch());
            return PlayersList.find().fetch();;

        },
        'otherHelperFunction': function () {
            return "Some other funtion"
        },
        'selectedClass': function(){
            return 'selected';
        }

    });

    Template.leaderboard.events({
        'click .player': function () {
        
            var playerId = this._id;
            Session.set('SelectPlayer', playerId);
            
        
        }
    });
}//IF Client

if (Meteor.isServer) {
    Meteor.startup(function() {

        return Meteor.methods({
    
          removeAllPosts: function() {
    
            return PlayersList.remove({});
    
          }
    
        });
    
      });

}//IF Server

//Inserindo

PlayersList = new Mongo.Collection('players');

//Inserindo


