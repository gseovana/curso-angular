var minhaVariavel = 'minha variavel';
function minhaFuncao(x, y) {
    return x + y;
}
var num = 2;
var PI = 3.14;
/*var numeros = [1, 2, 3];
numeros.map(function(valor){
    return valor * 2;
});*/ //sem arrow function
numeros.map(function (valor) { return valor * 2; }); //ES 2015
var Matematica = /** @class */ (function () {
    function Matematica() {
    }
    Matematica.prototype.soma = function (x, y) {
        return x + y;
    };
    return Matematica;
}());
