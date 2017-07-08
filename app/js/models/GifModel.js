angular.module('catchaiApp.GifModel', [])
.factory('GifModel', ['$http', function($http) {  
    function GifModel(idimagen,idevento,descripcion,ruta,valid) {
        this.idimagen = idimagen;
        this.idevento = idevento;
        this.descripcion = descripcion;
        this.ruta = ruta;
        this.valid = valid;
    };
    GifModel.prototype = {
        setData: function(claveData) {
            //console.log("ClaveModel: setData();");
            angular.extend(this, claveData);
        },
        getRuta: function(){
            return this.ruta;
        },
    };
    return GifModel;
}]);