// factory
angular.module("catchaiApp.UsuarioDAO",[])
.factory('UsuarioDAO', function($http,$q,ENV){ 
    return {
        login: function(usuario,contrasena,onComplete){
            console.info("usuarioDAO: login();");
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"login/";
            console.info(ruta);
            $http({
                withCredentials: true,
                method: 'POST',
                url: ruta,
                headers: {
                //'x-access-token': token,
                //'Content-Type': 'form-data',
                //'Content-Type': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: {
                    usuario:usuario,
                    contrasena:contrasena,
                },
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
            }).then(function enviarComplete(json) {
                console.info("usuarioDAO.js: enviarComplete");
                //console.info(json.data);
                if(json.data.result){
                    deferred.resolve({result:true,token:json.data.token,mensaje:json.data.mensaje,usuario:json.data.usuario});
                } else {
                    deferred.reject({result:false,errores:json.data.errores});
                }
            }, function enviarError(data){
                console.error("usuarioDAO.js: enviarError");
                console.error(data);
                //console.log(data,data.statusText);
                /*
                console.info(status);
                console.info(headers);
                console.info(config);
                */
                deferred.reject({result:false,errores:"Hubo un error de conexión. Intenta más tarde"});
            });
            return deferred.promise;
        },
        session: function(usuario){
            //console.info("usuarioDAO.js: session();");
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"session/";
            //console.info(ruta);
            $http({
                withCredentials: true,
                method: 'GET',
                url: ruta,
                headers: {
                    //'x-access-token': token,
                    //'Content-Type': 'form-data',
                    //'Content-Type': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: {
                },
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
            }).then(function enviarComplete(json) {
                //console.info("usuarioDAO.js: enviarComplete();");
                //console.info(json.data);
                if(json.data.result){
                    deferred.resolve({result:true,mensaje:json.data.mensaje,usuario:json.data.usuario});
                } else {
                    deferred.reject({result:false,errores:json.data.errores});
                }
            }, function enviarError(data){
                //console.error("usuarioDAO.js enviarError();");
                //console.error(data);
                //console.log(data,data.statusText);
                /*
                console.info(status);
                console.info(headers);
                console.info(config);
                */
                deferred.reject({result:false,errores:"Hubo un error de conexión. Intenta más tarde"});
            });
            return deferred.promise;
        },
        logout: function(){
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"logout/";
            //console.info(ruta);
            $http({
                withCredentials: true,
                method: 'POST',
                url: ruta,
                headers: {
                    //'x-access-token': token,
                    //'Content-Type': 'form-data',
                    //'Content-Type': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: {
                },
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
            }).then(function enviarComplete(json) {
                //console.info("usuarioDAO.js: enviarComplete");
                //console.info(json.data);
                if(json.data.result){
                    deferred.resolve({result:true,mensaje:json.data.mensaje});
                } else {
                    deferred.reject({result:false,errores:json.data.errores});
                }
            }, function enviarError(data){
                //console.error("factoryUsuario.js: enviarError");
                //console.error(data);
                //console.log(data,data.statusText);
                /*
                console.info(status);
                console.info(headers);
                console.info(config);
                */
                deferred.reject({result:false,errores:"Hubo un error de conexión. Intenta más tarde"});
            });
            return deferred.promise;
        },
        guardar: function(usuario){
            localStorage.setItem("usuario",JSON.stringify(usuario));
            return true;
        },
        obtener: function(){
            var usuario = localStorage.getItem("usuario");
            return usuario;
        }, 
        borrar: function(){
            localStorage.removeItem("usuario");
            return true;
        },
        guardarToken: function(token){
            localStorage.setItem("token",token);
            return true;
        },
        obtenerToken: function(){
            var usuario = localStorage.getItem("token");
            return usuario;
        },        
        borrarToken: function(){
            localStorage.removeItem("token");
            return true;
        }       

    };
});