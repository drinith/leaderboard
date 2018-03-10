if (Meteor.isClient) {
    //Aqui so irá roda em um refresh da sessão
    console.log("Hello client");

    Template.leaderboard.helpers({
        //code goes here
        'player': function () {
            console.log(PlayersList.find().fetch());
            return PlayersList.find();
        },
        'otherHelperFunction': function () {
            return "Some other funtion"
        },
        'selectedClass': function () {
            var playerId = this._id;
            var selectedPlayer = Session.get('selectedPlayer');
            // Aqui é testado se quem foi clicado é o selecionado
            if(playerId == selectedPlayer){
            return 'selected';
            }
        }
    });

    Template.leaderboard.events({
        'click .player': function() {
            var playerId = this._id;
            Session.set('selectedPlayer', playerId);
        },

        //código que aumenta a pontuação
        'click .increment' : function(){
            var selectedPlayer = Session.get('selectedPlayer');
            //$set seta um valor sem trocar o elemento por inteiro e o $inc incrementa esse campo.
            PlayersList.update(selectedPlayer, {$inc: {score: 5}});

            //Forma tradicionald
            // PlayersList.update(selectedPlayer, {name:"Felipe", score: 5});

        },

        //código que aumenta a pontuação
        'click .decrement' : function(){
            var selectedPlayer = Session.get('selectedPlayer');
            //$set seta um valor sem trocar o elemento por inteiro e o $inc incrementa esse campo.
            PlayersList.update(selectedPlayer, {$inc: {score: -5}});

            //Forma tradicionald
            // PlayersList.update(selectedPlayer, {name:"Felipe", score: 5});

        }
    });
}//IF Client

if (Meteor.isServer) {

    //inicialização do server
    Meteor.startup(function () {

        return Meteor.methods({
            //metodo de deletar todo banco
            removeAllPosts: function () {

                return PlayersList.remove({});
            }
        });
    });

}//IF Server
//Inserindo

var PlayersList = new Mongo.Collection('players');

//Inserindo


