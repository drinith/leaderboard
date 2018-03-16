if (Meteor.isClient) {
    //Aqui so irá roda em um refresh da sessão
    Meteor.startup(function () {

        
            
            // PlayersList.insert({name:"Felipe",score:7});
            // PlayersList.insert({name:"Vinicius",score:7});
            // PlayersList.insert({name:"Aline",score:7});
            
        
    
    });
    console.log("Hello client");

    Template.addPlayerForm.events({
        'submit form':function(){
            //Essa função quebra os eventos padrões do formulário. Ele não faz mais submissão para algum lugar
            event.preventDefault();
            //Aqui estou pegando o valor do input que está no html no template , acessando seu valor
            var playerNameVar = event.target.playerName.value;
            //Pegar o valor do usuário logado para se tornar uma coluna na tabela
            var currentUserId=Meteor.userId();
            
            PlayersList.insert({name:playerNameVar,score:0,createdBy:currentUserId});
            
            //***deixar o campo em branco deopis do input
            event.target.playerName.value="";

        },

        'click .remove':function(){
            var selectedPlayer = Session.get("selectedPlayer");
            PlayersList.remove(selectedPlayer);
        }

    });
    

    Template.leaderboard.helpers({
        //code goes here
        'player': function () {
            var currentUserId = Meteor.userId();
            console.log(currentUserId);
            console.log(PlayersList.find({createdBy: currentUserId},{sort:{score:-1,name:1}}))
           
            console.log(PlayersList.find({createdBy: currentUserId},{sort:{score:-1,name:1}}).fetch());

            return PlayersList.find({createdBy: currentUserId},{sort:{score:-1,name:1}});
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
        },
        'showSelectedPlayer': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            return PlayersList.findOne(selectedPlayer);
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


//Não colocar o var aqui na frente pois perde a referencia
PlayersList = new Mongo.Collection('players');
