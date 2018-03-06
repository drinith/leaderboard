if (Meteor.isClient) {

    //Aqui so irá roda em um refresh da sessão
    console.log("Hello client");

    Template.leaderboard.helpers({
        //code goes here
        'player': function () {
            return PlayersList.find()
        },
        'otherHelperFunction': function () {
            return "Some other funtion"
        }

    });

    Template.leaderboard.events({
        'click .player': function () {
            // Session.set('selectedPlayer', 'session value test');
            // Session.get('selectedPlayer');
            // console.log('Cliquei');
            // var selectedPlayer = Session.get('selectedPlayer');
            // console.log(selectedPlayer);
            var playerId = this._id;
            Session.set('SelectPlayer', playerId);
            var selectedPlayer = Session.get('SelectPlayer');

            console.log(selectedPlayer);


            Meteor.call('removeAllPosts');
            var lista = PlayersList.find().fetch();
            console.log(lista[0]);



        }
    });
}//IF Client

if (Meteor.isServer) {

    // Meteor.startup(function() {

    //     return Meteor.methods({

    //       removeAllPosts: function() {


    //     console.log("Foi para o servidor")
    //         return PlayersLists.remove({});

    //       }

    //     });

    //   });





}//IF Server

//Inserindo

PlayersList = new Mongo.Collection('players');

//Inserindo
// PlayersList.insert([{
//     name: "David",
//     score: 0
// }, {
//     name: "Bob",
//         score: 1
//     }]);

