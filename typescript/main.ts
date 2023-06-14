var minhaVariavel = 'minha variavel';

function minhaFuncao(x, y){
    return x+y;
}

let num = 2;
const PI = 3.14;

var numeros = [1, 2, 3];
/*numeros.map(function(valor){
    return valor * 2;
});*/ //sem arrow function

numeros.map(valor => valor * 2); //ES 2015

class Matematica{
    soma(x,y){
        return x+y;
    }
}

var n1: any = 'e3er34r';
n1 = 4;