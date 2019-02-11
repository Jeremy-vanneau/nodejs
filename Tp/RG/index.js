const mysql = require('mysql');
const app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
const helmet = require('helmet');
const ent = require('ent');
app.use(helmet());

const bodyParser = require('body-parser');
// const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');


//'use strict';

/**
 * affichage des pages
 * 
 * securite helmet et mysql
 */

app.get('/', function (req, res) {
    let crud = new CrudPersonnage ('localhost', 'root', '', 'nodejs','personnage');
    crud.afficherPersonnage((err,results,fields)=>{
        //console.log(JSON.stringify(results));
        //console.log(results.length);
        let t_nom = [],t_classe=[],t_sante=[],t_arme=[];
        for (var i = 0 ; i < results.length ; i++)
        {
            t_nom.push(results[i].nom);
            t_arme.push(results[i].arme);
            t_classe.push(results[i].classe);
            t_sante.push(results[i].sante);
        }
        res.render('index',{nom:t_nom,classe:t_classe,sante:t_sante,arme:t_arme});
    });
});
app.get('/create', function(req, res){
    res.render('create',);
});
app.post('/butonCreate', function(req, res){
    //console.log('POST oh yeah !');
    //console.log(req.body.arme);
    
    let crud = new CrudPersonnage ('localhost', 'root', '', 'nodejs','personnage');

    crud.creerPersonnage(req.body.nom,req.body.classe,req.body.sante,req.body.arme,(err,results,fields)=>{
        console.log(results);
    });
});
app.get('/edit',function(req, res){
    let crud = new CrudPersonnage ('localhost', 'root', '', 'nodejs','personnage');
    crud.afficherPersonnage((err,results,fields)=>{
        //console.log(JSON.stringify(results));
        //console.log(results.length);
        let t_nom = [],t_classe=[],t_sante=[],t_arme=[],t_ID=[];
        for (var i = 0 ; i < results.length ; i++)
        {   console.log(results[i]);
            t_nom.push(results[i].nom);
            t_arme.push(results[i].arme);
            t_classe.push(results[i].classe);
            t_sante.push(results[i].sante);
            t_ID.push(results[i].ID);
        }
        res.render('edit',{nom:t_nom,classe:t_classe,sante:t_sante,arme:t_arme,ID:t_ID});
    });

});
app.post('/butonEdit', function(req, res){
    
    
    if (req.body.ID){
        console.log("ID: "+req.body.ID);

        if (req.body.nom){
            let crud = new CrudPersonnage ('localhost', 'root', '', 'nodejs','personnage');

            crud.modifierPersonnage('ID',req.body.ID,'nom',req.body.nom,(err,results,fields)=>{
                if (err){
                    throw err;
                } else console.log("modification nom OK")

            });
        }
        if (req.body.classe){
            let crud = new CrudPersonnage ('localhost', 'root', '', 'nodejs','personnage');

            crud.modifierPersonnage('ID',req.body.ID,'classe',req.body.classe,(err,results,fields)=>{
                if (err){
                    throw err;
                } else console.log("modification classe OK")

            });

        }
        if (req.body.sante){
            let crud = new CrudPersonnage ('localhost', 'root', '', 'nodejs','personnage');

            crud.modifierPersonnage('ID',req.body.ID,'sante',req.body.sante,(err,results,fields)=>{
                if (err){
                    throw err;
                } else console.log("modification sante OK")

            });

        }
        if (req.body.arme){
            let crud = new CrudPersonnage ('localhost', 'root', '', 'nodejs','personnage');

            crud.modifierPersonnage('ID',req.body.ID,'arme',req.body.arme,(err,results,fields)=>{
                if (err){
                    throw err;
                } else console.log("modification arme OK")

            });

        }
    }else console.log("manque ID pour modification");

});
app.get('/remove',function(req, res){
    let crud = new CrudPersonnage ('localhost', 'root', '', 'nodejs','personnage');
    crud.afficherPersonnage((err,results,fields)=>{
        //console.log(JSON.stringify(results));
        //console.log(results.length);
        let t_nom = [],t_classe=[],t_sante=[],t_arme=[],t_ID=[];
        for (var i = 0 ; i < results.length ; i++)
        {   console.log(results[i]);
            t_nom.push(results[i].nom);
            t_arme.push(results[i].arme);
            t_classe.push(results[i].classe);
            t_sante.push(results[i].sante);
            t_ID.push(results[i].ID);
        }
        res.render('remove',{nom:t_nom,classe:t_classe,sante:t_sante,arme:t_arme,ID:t_ID});
    });
});
app.post('/butonRemove',function(req, res){
    console.log("reception supp");
    if (req.body.ID){
        console.log("ID: "+req.body.ID);
        let crud = new CrudPersonnage ('localhost', 'root', '', 'nodejs','personnage');
        crud.supprimerPersonnage('ID',req.body.ID,(err,results,fields)=>{
            
            if (err){
                throw err;
            } else console.log("suppression OK")
        });

    }else console.log("manque ID pour modification");
});
app.get('/fight',function(req, res){

    res.sendfile(__dirname + '/fight.html');
});
http.listen(3010, function () {
    console.log('Listening on port 3010');
});

/**
 * evenement socket.io
 */
// io.on('connection', function(socket){
//     console.log('a user connected');
//     socket.on('disconnect', function(){
//         console.log('user disconnected');
//     });

//     socket.on('message', function(msg){
//         console.log('message: ' + msg);
//     });
//   });

  


io.sockets.on('connection', function (socket, pseudo) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('nouveau_client', (pseudo)=> {
        //pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        socket.broadcast.emit('nouveau_client', pseudo);
        console.log('connexion: '+pseudo)
    });

    // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
    socket.on('message', function (message) {
        message = ent.encode(message);
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    });
});

/**
 * Classe crud table personnages
 */



class CrudPersonnage{

    constructor(p_host, p_user, p_password, p_database, p_table){
        console.log('new instance');

        this.connexion = mysql.createConnection({
            host     : p_host,
            user     : p_user,
            password : p_password,
            database : p_database
          });
          this.table = p_table;
          
    }


    afficherPersonnage(callback){
        this.connexion.connect((err)=>{
            if(err) throw err;
            this.connexion.query(

                "SELECT * FROM "+this.table, 
                
                (err, results, fields)=>{
                if(err) throw err;
                callback(err,results,fields);
                this.connexion.end(()=>{
                    console.log('disconnect');
                });
            });
        });
    }
    
    
    creerPersonnage(nom,classe,sante,arme,callback){
        this.connexion.connect((err)=>{
            if(err) throw err;
            console.log("INSERT INTO "+this.table+" (nom, classe, sante, arme) VALUES ("+nom+","+classe+","+sante+","+arme+")");
            this.connexion.query(
                
                "INSERT INTO "+this.table+" (nom, classe, sante, arme) VALUES ('"+nom+"','"+classe+"','"+sante+"','"+arme+"')",
                
                (err, results, fields)=>{
                if(err) throw err;
                callback(err,results,fields);
                // this.connexion.end(()=>{
                //     console.log('disconnect');
                // });
            });
        });
    }
    
    modifierPersonnage(champ_tri,valeur_tri,champ_modif,valeur_modif,callback){
        this.connexion.connect((err)=>{
            if(err) throw err;
            console.log();
            this.connexion.query(
                
                "UPDATE "+this.table+" SET "+champ_modif+" = '"+valeur_modif+"' WHERE "+this.table+"."+champ_tri+" = '"+valeur_tri+"'",
                
                (err, results, fields)=>{
                if(err) throw err;
                callback(err,results,fields);
                this.connexion.end(()=>{
                    console.log('disconnect');
                });
            });
        });
    }
    
    supprimerPersonnage(champ,valeur,callback){
           this.connexion.connect((err)=>{
            if(err) throw err;
            this.connexion.query(
                
                "DELETE FROM "+this.table+" WHERE "+this.table+"."+champ+" = '"+valeur+"'",
                
                (err, results, fields)=>{
                if(err) throw err;
                callback(err,results,fields);
                this.connexion.end(()=>{
                    console.log('disconnect');
                });
            });
        });
    }
}

/**
 * utilisation de ApiCrudPersonnage
 * 
 * afficherPersonnage()
 * creerPersonnage(nom,classe,sante,arme)
 * modifierPersonnage(champ_tri,valeur_tri,champ_modif,valeur_modif)
 * supprimerPersonnage(champ,valeur)
 * 
 * let api = new ApiCrudPersonnage ('localhost', 'root', '', 'nodejs');
 */

// let api = new ApiCrudPersonnage ('localhost', 'root', '', 'nodejs');


// api.afficherPersonnage((err,results,fields)=>{
//     console.log(results);
// });


// api.creerPersonnage('jeremy','breton','150','gourdin',(err,results,fields)=>{
//     console.log(results);
// });

// api.creerPersonnage('jeremy','breton','150','gourdin',(err,results,fields)=>{
//     console.log(results);
// });

// api.modifierPersonnage('nom','jeremy','sante','20',(err,results,fields)=>{
//         console.log(results);
//     });

// api.supprimerPersonnage('nom','jeremy',(err,results,fields)=>{
//     console.log(results);
// });


// let api = new ApiCrudPersonnage ('localhost', 'root', '', 'nodejs');