// Kita gunakan objek ini sebagai tempat menyimpan data dan kondisi pada calculator, 
// di mana angka yang muncul pada layar kalkulator selalu diambil dari data calculator.displayNumber.
// Nilai dari properti operator dan firstNumber diberikan null dulu karena akan diberikan nilai ketika pengguna melakukan aksi.
// Properti isWaitForSecondNumber merupakan kondisi di mana kalkulator sedang menunggu pengguna menentukkan angka kedua dalam melakukan perhitungan.
const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    isWaitForSecondNumber: false,
};
// Setelah membuat object calculator, selanjutnya kita buat fungsi-fungsi umum yang dilakukan kalkulator 
// seperti me-update angka pada layar dan menghapus data pada kalkulator.
function updateDisplay() {
    document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}
function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.isWaitForSecondNumber = false;
}
// Lalu, kita buat juga fungsi untuk memasukkan angka ke dalam nilai 
// displayNumber kalkulator.
// Saat ini kalkulator masih dapat menampilkan angka 0 di awal bilangan, 
// hal itu tentu aneh dan tidak pernah terjadi pada kalkulator manapun, kecuali menampilkan bilangan desimal. 
// Untuk memperbaikinya, tambahkan sebuah kondisi dimana jika displayNumber bernilai ‘0’ di fungsi inputDigit() 
// sehingga angka yang pertama dimasukkan pengguna akan menggantikan keseluruhan nilai displayNumber. 
// Selain itu, lakukan seperti biasanya. Untuk melakukannya kita gunakan if-else statement.
function inputDigit(digit) {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}
function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}
function handleOperator(operator) {
    if (!calculator.isWaitForSecondNumber) {
        calculator.operator = operator;
        calculator.isWaitForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    } else {
        alert('Operator sudah ditetapkan');
    }
}
function performCalculation(params) {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert('Anda belum menetapkan operator');
        return;
    }

    let result = 0;
    if (calculator.operator === '+') {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);

    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);

    } calculator.displayNumber = result;
}
// Kemudian, kita buat variabel buttons dengan menginisialisasikan nilai seluruh elemen button yang ada 
// dan berikan event click pada tiap elemennya.

// Untuk menangkap semua elemen div.button 
// kita gunakan querySelectorAll("div.button") dan kita looping nilainya 
// untuk diberikan event click di setiap elemen button - nya.
const buttons = document.querySelectorAll('.button');

//ini for of
for (const button of buttons) {
    button.addEventListener('click', function (event) {
        // Mendapat objek elemen yang diklik
        const target = event.target;

        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }
        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;

        }
        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;

        }
        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();

    });
}
