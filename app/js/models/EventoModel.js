angular.module('catchaiApp.EventoModel', [])
.factory('EventoModel', ['$http', function($http) {  
    function EventoModel(idevento,idadministrador,fecha,nombre,valid) {
        this.idevento = idevento;
        this.idadministrador = idadministrador;
        this.fecha = fecha;
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