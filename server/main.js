import { Meteor } from 'meteor/meteor';

Meteor.publish('thePlayers', function(){
    var currentUserId = this.userId;
    return PlayersList.find({createdBy:currentUserId});
});

Meteor.methods({
    'insertPlayerData':function(playerNameVar){
        var currentUserId = Meteor.userId();
        PlayersList.insert({
            name:playerNameVar,
            score:0,
            createdBy:currentUserId});
            
            console.log(PlayersList.find().fetch());
            console.log("Inserirou por aqui");
    },

    'removePlayerData':function(selectedPlayer){
        PlayersList.remove(selectedPlayer);
        console.log("Deletou o arquivo");
    },

    'removeAllPosts': function () {

        return PlayersList.remove({});
    },

    'removeThis':function(){
        return PlayersList.remove({$where:function (){ return createBy!=""; }});
    },
    'click .increment': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        PlayersList.update(selectedPlayer, {$inc: {score: 5} });
    },
        'click .decrement': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        PlayersList.update(selectedPlayer, {$inc: {score: -5} });
    },

    'modifyPlayerScore': function(selectedPlayer, scoreValue){
        var currentUserId = Meteor.userId();
        PlayersList.update( {_id: selectedPlayer, createdBy: currentUserId},
        {$inc: {score: scoreValue} });
        }

});

Meteor.startup(() => {
    
});

