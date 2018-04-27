//Não colocar o var aqui na frente pois perde a referencia e coloque a criação da coleção no inicio do proejto
PlayersList = new Mongo.Collection('players');

if (Meteor.isClient) {
    //Trazendo do server a consulta do banco pois somente nele se tem acesso, atenção que o parametro é a chamada de uma função que tem tal retorno
    Meteor.subscribe('thePlayers');
    //Aqui so irá roda em um refresh da sessão
    Meteor.startup(function () {
            
        // PlayersList.insert({name:"Felipe",score:7});
        // PlayersList.insert({name:"Vinicius",score:7});
        // PlayersList.insert({name:"Aline",score:7});
    
    });
    console.log("Hello client");

    Template.addPlayerForm.events({
        //MOD aqui fiz uma modificação de passar eventos como parametro pois estava dando erro
        'submit form':function(event){
            //Essa função quebra os eventos padrões do formulário. Ele não faz mais submissão para algum lugar
            event.preventDefault();
            //Aqui estou pegando o valor do input que está no html no template , acessando seu valor
            var playerNameVar = event.target.playerName.value;
            //Pegar o valor do usuário logado para se tornar uma coluna na tabela, quando a responsabilidade foi para o servidor não foi mais necessário ser capturado aqui
            //var currentUserId=Meteor.userId();
            
            Meteor.call("insertPlayerData",playerNameVar);
            
            //***deixar o campo em branco deopis do input
            event.target.playerName.value="";

        },

        'click .remove':function(){
            var selectedPlayer = Session.get("selectedPlayer");
            
            Meteor.call("removePlayerData",selectedPlayer);
        }

    });
    

    Template.leaderboard.helpers({
        //code goes here
        'player': function () {
            var currentUserId = Meteor.userId();
            console.log(currentUserId);
            console.log(PlayersList.find({createdBy: currentUserId},{sort:{score:-1,name:1}}))
           
            console.log(PlayersList.find({createdBy: currentUserId},{sort:{score:-1,name:1}}).fetch());

            return PlayersList.find({},{sort:{score:-1,name:1}});
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
            Meteor.call('modifyPlayerScore', selectedPlayer, 5);

        },

        //código que aumenta a pontuação
        'click .decrement' : function(){
            var selectedPlayer = Session.get('selectedPlayer');
            Meteor.call('modifyPlayerScore', selectedPlayer, -5);

        }
    });
}//IF Client

if (Meteor.isServer) {
        
    //inicialização do server
  
}//IF Server
//Inserindo



