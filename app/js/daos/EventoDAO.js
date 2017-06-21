// factory
angular.module("catchaiApp.EventoDAO",['ClienteModel'])
.factory('EventoDAO', function($http,$q,ENV,ClienteModel){ 
    return {
        obtenerConPagina: function(token,pagina){            
            console.info("clienteDAO: obtener();");
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"api/clientes?token="+token+"&pag="+pagina;
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
                console.info("clienteDAO.js: enviarComplete");
                console.info(json.data);
                if(json.data.result){
                    var clientes = [];
                    for(var i=0; i<json.data.clientes.length; i++) {
                        var row = json.data.clientes[i];
                        var model = new ClienteModel(row.idcliente,row.nombre,row.logo);
                        clientes.push(model);
                    }
                    if(clientes.length>0){
                        deferred.resolve({result:true,clientes:clientes,paginas:json.data.paginas});                            
                    } else {
                        deferred.reject({result:true,clientes:null});
                    }
                } else {
                    //console.info(json.data.errores);          
                    deferred.reject({result:false,errores:json.data.mensaje});
                }
            }, function enviarError(data){
                console.info("clienteDAO.js: enviarError");
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
        obtenerConID: function(token,idcliente){
            console.log("clienteDAO: obtenerConID();");
        },
        guardar: function(token,nombre,logoData){
            console.info("clienteDAO: guardar();");
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"api/clientes?token="+token;
            console.info(ruta);

            $http({
                method: 'POST',
                url: ruta,
                headers: {
                //'x-access-token': token,
                //'Content-Type': 'multipart/form-data'
                //'Content-Type': 'form-data',
                //'Content-Type': 'application/json',
                //'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Type': undefined
                },
                data: {
                    nombre: nombre,
                    logo: logoData
                },
                //withCredentials: true,
                //transformRequest: angular.identity
                transformRequest: function (data, headersGetter) {
                    console.log(data);
                    var formData = new FormData();
                    angular.forEach(data, function (value, key) {
                        formData.append(key, value);
                    });
                    //var headers = headersGetter();
                    //delete headers['Content-Type'];
                    return formData;
                }
            }).then(function enviarComplete(json) {
                console.info("clienteDAO.js: enviarComplete");
                console.info(json.data);
                if(json.data.result==1){
                    deferred.resolve({result:true,cliente:json.data.cliente,mensaje:json.data.mensaje});
                } else {
                    //console.info(json.data.errores);          
                    deferred.reject({result:false,errores:json.data.errores});
                }
            }, function enviarError(data){
                console.error("clienteDAO.js: enviarError");
                console.error(data);
                //console.log(data,data.statusText);
                //console.log(status);
                //console.log(headers);
                //console.log(config);
                deferred.reject({result:false,errores:"Hubo un error de conexión. Intenta más tarde"});
            });
            return deferred.promise;
        },
        editar: function(token,idcliente,nombre,logoData){
            console.info("clienteDAO: editar();");
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"api/clientes?token="+token;
            console.info(ruta);

            $http({
                method: 'PUT',
                url: ruta,
                headers: {
                //'x-access-token': token,
                //'Content-Type': 'multipart/form-data'
                //'Content-Type': 'form-data',
                //'Content-Type': 'application/json',
                //'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Type': undefined
                },
                data: {
                    //token: token,
                    idcliente: idcliente,
                    nombre: nombre,
                    logo: logoData
                },
                //withCredentials: true,
                //transformRequest: angular.identity
                transformRequest: function (data, headersGetter) {
                    console.log(data);
                    var formData = new FormData();
                    angular.forEach(data, function (value, key) {
                        formData.append(key, value);
                    });
                    //var headers = headersGetter();
                    //delete headers['Content-Type'];
                    return formData;
                }
            }).then(function enviarComplete(json) {
                console.info("clienteDAO.js: enviarComplete");
                console.info(json.data);
                if(json.data.result==1){
                    deferred.resolve({result:true,cliente:json.data.cliente,mensaje:json.data.mensaje});
                } else {
                    //console.info(json.data.errores);          
                    deferred.reject({result:false,errores:json.data.mensaje});
                }
            }, function enviarError(data){
                console.info("clienteDAO.js: enviarError");
                console.error(data);
                //console.log(data,data.statusText);
                //console.log(status);
                //console.log(headers);
                //console.log(config);
                deferred.reject({result:false,errores:"Hubo un error de conexión. Intenta más tarde"});
            });
            return deferred.promise;
        },
        eliminar: function(token,elID){
            console.log("clienteDAO: eliminar();");
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"api/clientes/"+elID+"?token="+token;
            //console.info(ruta);
            //console.info(elID);
            $http({
                method: 'DELETE',
                url: ruta,
                headers: {
                //'x-access-token': token,
                //'Content-Type': 'multipart/form-data'
                //'Content-Type': 'form-data',
                //'Content-Type': 'application/json',
                //'Content-Type': 'application/x-www-form-urlencoded',
                //'Content-Type': undefined
                },
                /*
                data: {
                    //token:token
                },*/
            }).then(function enviarComplete(json) {
                console.info("clienteDAO.js: enviarComplete");
                console.info(json.data);
                if(json.data.result==1){
                    deferred.resolve({result:true,mensaje:json.data.mensaje});
                } else {
                    deferred.reject({result:false,errores:json.data.errores});
                }
            }, function enviarError(data){
                console.error("clienteDAO.js: enviarError");
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