// factory
angular.module("catchaiApp.EventoDAO",['catchaiApp.EventoModel'])
.factory('EventoDAO', function($http,$q,ENV,EventoModel){ 
    return {
        obtenerConPagina: function(pagina,idadmin){            
            console.info("EventoDAO: obtener();");
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"obtenerEventos.php?idadmin="+idadmin+"&pag="+pagina;
            console.info(ruta);
            $http({
                method: 'GET',
                url: ruta,
                headers: {
                    //'x-access-token': token,
                    //'Content-Type': 'form-data',
                    //'Content-Type': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: {
                    //token:token
                },
            }).then(function enviarComplete(json) {
                console.info("EventoDAO.js: enviarComplete");
                console.info(json.data);
                if(json.data.result){
                    var eventos = [];
                    for(var i=0; i<json.data.eventos.length; i++) {
                        var row = json.data.eventos[i];
                        var model = new EventoModel(row.idEvento,row.idAdministrador,row.fecha,row.nombre,row.valid);
                        eventos.push(model);
                    }
                    if(eventos.length>0){
                        deferred.resolve({result:true,eventos:eventos,paginas:json.data.totalPaginas,mensajes:json.data.mensajes});                            
                    } else {
                        deferred.reject({result:true,eventos:null,errores:json.data.errores});
                    }
                } else {
                    //console.info(json.data.errores);          
                    deferred.reject({result:false,errores:json.data.errores});
                }
            }, function enviarError(data){
                console.info("EventoDAO.js: enviarError");
                console.error(data);
                //console.log(data,data.statusText);
                /*
                console.log(status);
                console.log(headers);
                console.log(config);
                */
                deferred.reject({result:false,errores:"Hubo un error de conexión. Intenta más tarde"});
            });
            return deferred.promise;
        },
        guardar: function(model){
            console.info("EventoDAO: guardar();");
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"guardarEvento.php";
            console.info(ruta);

            $http({
                method: 'POST',
                url: ruta,
                headers: {
                    //'x-access-token': token,
                    //'Content-Type': 'multipart/form-data'
                    //'Content-Type': 'form-data',
                    //'Content-Type': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    //'Content-Type': undefined
                },
                data: {                    
                    idadmin: model.idadministrador,
                    nombre: model.nombre,
                    fecha: model.fecha,
                },
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
            }).then(function enviarComplete(json) {
                console.info("EventoDAO.js: enviarComplete");
                console.info(json.data);
                if(json.data.result){
                    deferred.resolve({result:true,evento:json.data.evento,mensajes:json.data.mensajes});
                } else {
                    //console.info(json.data.errores);          
                    deferred.reject({result:false,errores:json.data.errores});
                }
            }, function enviarError(data){
                console.error("EventoDAO.js: enviarError");
                console.error(data);
                //console.log(data,data.statusText);
                //console.log(status);
                //console.log(headers);
                //console.log(config);
                deferred.reject({result:false,errores:"Hubo un error de conexión. Intenta más tarde"});
            });
            return deferred.promise;
        },
        editar: function(model){
            console.info("EventoDAO: editar();");
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"editarEvento.php";
            console.info(ruta);
            $http({
                method: 'POST',
                url: ruta,
                headers: {
                //'x-access-token': token,
                //'Content-Type': 'multipart/form-data'
                //'Content-Type': 'form-data',
                //'Content-Type': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                //'Content-Type': undefined
                },
                data: {
                    idevento: model.idevento,
                    idadmin: model.idadministrador,
                    nombre: model.nombre,
                    fecha: model.fecha,
                    valid: model.valid,
                },
               transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
            }).then(function enviarComplete(json) {
                console.info("EventoDAO.js: enviarComplete");
                console.info(json.data);
                if(json.data.result){
                    deferred.resolve({result:true,evento:json.data.evento,mensajes:json.data.mensajes});
                } else {
                    //console.info(json.data.errores);          
                    deferred.reject({result:false,errores:json.data.errores});
                }
            }, function enviarError(data){
                console.error("EventoDAO.js: enviarError");
                console.error(data);
                //console.log(data,data.statusText);
                //console.log(status);
                //console.log(headers);
                //console.log(config);
                deferred.reject({result:false,errores:"Hubo un error de conexión. Intenta más tarde"});
            });
            return deferred.promise;
         },
        eliminar: function(elID){
            console.log("EventoDAO: eliminar();");
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"eliminarEvento.php";
            //console.info(ruta);
            //console.info(elID);
            $http({
                method: 'POST',
                url: ruta,
                headers: {
                //'x-access-token': token,
                //'Content-Type': 'multipart/form-data'
                //'Content-Type': 'form-data',
                //'Content-Type': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                //'Content-Type': undefined
                },
                data: {
                    idevento:elID
                },
               transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
            }).then(function enviarComplete(json) {
                console.info("EventoDAO.js: enviarComplete");
                console.info(json.data);
                if(json.data.result){
                    deferred.resolve({result:true,mensajes:json.data.mensajes});
                } else {
                    deferred.reject({result:false,errores:json.data.errores});
                }
            }, function enviarError(data){
                console.error("EventoDAO.js: enviarError");
                console.error(data);
                //console.error(data,data.statusText);
                //console.error(status);
                //console.error(headers);
                //console.error(config);
                deferred.reject({result:false,errores:"Hubo un error de conexión. Intenta más tarde"});
            });
            return deferred.promise;  

        },
    };
});