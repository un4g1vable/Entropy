let fs = require('fs');
let arg = process.argv;
let str;
let entropy = 0;

function count(string) { // функция считает количество каждого элемента строки
    return string.split("").reduce((a, letter) => { // разбиваем строку посимвольно и вызываем функцию обрат.вызова один раз для каждого элемента массива в порядке возрастания индекса
        var currentCount = a[letter];
        if (currentCount) {
            currentCount = currentCount + 1; // если ранее считалось + 1
        } else {
            currentCount = 1; // иначе инициализировать с первым появлением
        }
        a[letter] = currentCount; //заводим новый отсчёт
        return a;
    }, {});
}
// ^ по завершению функции получаем объект, состоящий из элементов типа ключ:свойство (буква: кол-во)

function makingarray(string){
    return Object.values(string)}
// ^ забираем свойства объекта в массив (только количества букв, ибо сами буквы нам уже не важны)

function entropycounter(array, logbase, amountofletters){
    for (let i = 0; i<array.length; i++){
        entropy += (array[i] / amountofletters) * (Math.log((array[i] / amountofletters)) / Math.log(logbase))
    }
    entropy *= (-1)
}
// ^ функция считает энтропию

fs.readFile(arg[2], (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    str = data.toString();
    // ^ чтение файла и запись в переменную
    let strlength = str.length;
    // ^ находим количество букв в строке (нужно для функции энтропии)
    let freq = count(str);
    // ^ записываем частоты встречаемости букв в freq
    let table = Object.entries(freq).map((val) => val.join(": ")).join("\n")
    console.log(table)
    // ^ выводим частотность
    let freqnums = makingarray(freq)
    // ^ создаём массив только с встречаемостью

    let base;
    if (isFinite(arg[3]))
        base = Number(arg[3]);
    else
        base = freqnums.length;
    // ^ определяем основание логарифма для нашей формулы(либо количество разных букв, либо задаётся юзером)

    entropycounter(freqnums,base,strlength);
    // ^ вызываем функцию расчёта энтропии для нашей строки

    console.log("Энтропия для строки", str, "равна:", Math.floor(entropy * 100) / 100)
})
