// factory
angular.module("catchaiApp.GifDAO",['catchaiApp.GifModel','catchaiApp.EventoModel'])
.factory('GifDAO', function($http,$q,ENV,GifModel,EventoModel){ 
    return {
        obtenerConPagina: function(pagina,eventoModel){            
            console.info("GifDAO: obtenerConPagina();");
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"obtenerImagenesTodas.php?pag="+pagina+"&idevento="+eventoModel.idevento;
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
                console.info("GifDAO.js: enviarComplete");
                console.info(json.data);
                if(json.data.result){
                    var imagenes = [];
                    for(var i=0; i<json.data.imagenes.length; i++) {
                        var row = json.data.imagenes[i];
                        var model = new GifModel(row.idImagen,row.idEvento,row.descripcion,row.ruta,row.valid);
                        imagenes.push(model);
                    }
                    if(imagenes.length>0){
                        deferred.resolve({result:true,imagenes:imagenes,paginas:json.data.totalPaginas,mensajes:json.data.mensajes});                            
                    } else {
                        deferred.reject({result:false,imagenes:null,errores:json.data.mensaje});
                    }
                } else {
                    //console.info(json.data.errores);          
                    deferred.reject({result:false,errores:json.data.errores});
                }
            }, function enviarError(data){
                console.info("GifDAO.js: enviarError");
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
        darAlta: function(gifModel){            
            console.info("GifDAO: obtenerConPagina();");
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"darAltaImagen.php";
            console.info(ruta);
            $http({
                method: 'POST',
                url: ruta,
                headers: {
                    //'x-access-token': token,
                    //'Content-Type': 'form-data',
                    //'Content-Type': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: {
                    idimagen:gifModel.idimagen
                },                
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
            }).then(function enviarComplete(json) {
                console.info("GifDAO.js: enviarComplete");
                console.info(json.data);
                if(json.data.result){
                    deferred.resolve({result:true,mensajes:json.data.mensajes});                            
                } else {
                    //console.info(json.data.errores);          
                    deferred.reject({result:false,errores:json.data.errores});
                }
            }, function enviarError(data){
                console.info("GifDAO.js: enviarError");
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
        darBaja: function(gifModel){            
            console.info("GifDAO: obtenerConPagina();");
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"darBajaImagen.php";
            console.info(ruta);
            $http({
                method: 'POST',
                url: ruta,
                headers: {
                    //'x-access-token': token,
                    //'Content-Type': 'form-data',
                    //'Content-Type': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: {
                    idimagen:gifModel.idimagen
                },
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
            }).then(function enviarComplete(json) {
                console.info("GifDAO.js: enviarComplete");
                console.info(json.data);
                if(json.data.result){
                    deferred.resolve({result:true,mensajes:json.data.mensajes});                            
                } else {
                    //console.info(json.data.errores);          
                    deferred.reject({result:false,errores:json.data.mensajes});
                }
            }, function enviarError(data){
                console.info("GifDAO.js: enviarError");
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
    };
});