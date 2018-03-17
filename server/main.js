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
            createBy:currentUserId});
            
            console.log("passou por aqui");
    }
    
});


Meteor.startup(() => {
    
});

