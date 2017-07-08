angular.module('catchaiApp.AdminModel', [])
.factory('AdminModel', ['$http', function($http) {  
    function AdminModel(idadministrador,nombre) {
        this.idadministrador = idadministrador;
        this.nombre = nombre;
    };
    AdminModel.prototype = {
        setData: function(claveData) {
            //console.log("ClaveModel: setData();");
            angular.extend(this, claveData);
        },
        getNombre: function(){
            return this.usuario;
        },
    };
    return AdminModel;
}]);