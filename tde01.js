function somar(a, b) {
    return a + b;
}

function subtrair(a, b) {
    return a - b;
}

const multiplicar = (a, b) => a * b;

const dividir = function(a, b) {
    if (b === 0) {
        return "Erro: Divisão por zero!";
    }
    return a / b;
};

function calcularMedia(numeros) {
    if (numeros.length === 0) {
        return 0;
    }
    const soma = numeros.reduce((acumulador, atual) => acumulador + atual, 0);
    return soma / numeros.length;
}

const filtrarPares = (numeros) => {
    return numeros.filter(numero => numero % 2 === 0);
};

function executarOperacao(a, b, operacaoCallback) {
    console.log(`Executando operação com a=${a} e b=${b}...`);
    const resultado = operacaoCallback(a, b);
    return resultado;
}

const num1 = 10;
const num2 = 5;
const arrayDeNumeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("--- Operações Básicas ---");
console.log(`Soma (${num1} + ${num2}): ${somar(num1, num2)}`);
console.log(`Subtração (${num1} - ${num2}): ${subtrair(num1, num2)}`);
console.log(`Multiplicação (${num1} * ${num2}): ${multiplicar(num1, num2)}`);
console.log(`Divisão (${num1} / ${num2}): ${dividir(num1, num2)}`);
console.log(`Divisão por zero (${num1} / 0): ${dividir(num1, 0)}`);

console.log("\n--- Manipulação de Array ---");
console.log(`Array original: [${arrayDeNumeros.join(', ')}]`);
console.log(`Média: ${calcularMedia(arrayDeNumeros)}`);
console.log(`Números pares: [${filtrarPares(arrayDeNumeros).join(', ')}]`);

console.log("\n--- Função com Callback ---");
const resultadoCallbackSoma = executarOperacao(20, 15, somar);
console.log(`Resultado da Soma via Callback: ${resultadoCallbackSoma}`);

const resultadoCallbackMultiplicacao = executarOperacao(4, 3, multiplicar);
console.log(`Resultado da Multiplicação via Callback: ${resultadoCallbackMultiplicacao}`);

const resultadoCallbackAnonima = executarOperacao(50, 5, function(x, y) {
    return x / y;
});
console.log(`Resultado da Divisão via Função Anônima (Callback): ${resultadoCallbackAnonima}`);

const resultadoCallbackArrow = executarOperacao(100, 10, (x, y) => x % y);
console.log(`Resultado do Resto da Divisão via Arrow Function (Callback): ${resultadoCallbackArrow}`);