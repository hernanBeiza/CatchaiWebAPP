angular.module('catchaiApp.EventoModel', [])
.factory('EventoModel', ['$http', function($http) {  
    function EventoModel(idevento,nombre,valid) {
        //console.log("ClaveModel: ClaveModel();");
        //console.log(idclave,idtipo,host,usuario,contrasena,comentarios,tipo);
        this.idevento = idevento;
        this.nombre = nombre;
        this.valid = valid;
    };
    EventoModel.prototype = {
        setData: function(claveData) {
            //console.log("ClaveModel: setData();");
            angular.extend(this, claveData);
        },
        getNombre: function(){
            return this.usuario;
        },
    };
    return EventoModel;
}]);