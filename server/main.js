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
    'modifyPlayerScore': function(selectedPlayer, scoreValue){
        PlayersList.update(selectedPlayer, {$inc: {score: scoreValue} });
    }
});

Meteor.startup(() => {

});