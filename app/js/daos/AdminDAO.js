// factory
angular.module("catchaiApp.AdminDAO",['catchaiApp.AdminModel'])
.factory('AdminDAO', function($http,$q,ENV,AdminModel){ 
    return {
        login: function(usuario,contrasena){
            console.info("AdminDAO: login();");
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"iniciarSesion.php";
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
                console.log("AdminDAO.js: enviarComplete");
                console.log(json.data);
                if(json.data.result){
                    var admin = json.data.admin;
                    var model = new AdminModel(admin.idAdministrador,admin.nombre);
                    deferred.resolve({result:true,mensajes:json.data.mensajes,admin:model});
                } else {
                    deferred.reject({result:false,errores:json.data.errores});
                }
            }, function enviarError(data){
                console.error("AdminDAO.js: enviarError");
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
                console.log("AdminDAO.js: enviarComplete");
                console.log(json.data);
                if(json.data.result){
                    deferred.resolve({result:true,mensajes:json.data.mensajes});
                } else {
                    deferred.reject({result:false,errores:json.data.errores});
                }
            }, function enviarError(data){
                console.error("AdminDAO.js: enviarError");
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
        }
    };
});