$(function () {
  let tempCalc = {
    first : '',
    op : '',
    last: ''
  };
  let tempCount = 0;
  let tablo = $('#calculation-result');
  let isEqual = false;
  let tempTablo;

/* Функция проверки временного хранилища данных */
  function checkTemp() {
    if (tempCalc.first == '') return false;
    if ((tempCalc.first != '') && (tempCalc.op != '')) {
      return true;
    } else {return false;}
  }

/* Функция проверки на число с плавющей запятой*/
  function checkFloat() {
    let tab = tablo.val()
    if (tab.contains('.')) {

    }
  }
/* Функция прибавления числа к числу в табло */
  function addNum(numObj) {
    let tempTabloValue = '';
    let newNumPart = numObj.getAttribute('data-int');
    let check = checkTemp();


    if (isEqual) {
      clear()
      isEqual = false
    }

    tempTablo = tablo.val()

    if (tempTablo.includes('.') && (newNumPart == '.')) {
      // debugger
      if (check) {
        return
      }
      newNumPart = ''
    }

    function checkDot(newNumPart) {
      if (((tempTablo == 0) && (newNumPart == '.')) || (newNumPart == '.')){
        return newNumPart = '0.'
      } else {
        return newNumPart;
      }
    }
// debugger
    // Если первое число
    if (!check) {
      // debugger
      if (tablo.val().length > 14) return;
      if ((tablo.val() == '0') && (newNumPart != '.')){
        console.log('tablo =',tablo.val());
        tablo.val(checkDot(newNumPart));
        tempCalc.first = tablo.val();
      } else {
        tempTabloValue = tablo.val();
        tempTablo = tempTabloValue + newNumPart

        tablo.val(tempTablo);
        tempCalc.first = tablo.val();
      }
    }

    // Если уже сработал знак операции
    if ((check) && (tempCount == 1)) {
      if (tablo.val().length > 14) return;
      tempTabloValue = tablo.val();

      tablo.val(tempTabloValue + newNumPart);
      tempCalc.last = tablo.val();
    }

    // // Если уже сработал знак операции в первый раз
    if ((check) && (tempCount == 0)) {
      tempCount = 1;
      if (tempCalc.first == '0') {

      }
      debugger
      console.log('tablo =',tablo.val());
      tablo.val(checkDot(newNumPart));
      tempCalc.last = tablo.val();
      tempTabloValue = '';
    }

    console.log(tempCalc);
  }

/* Функция вычисления процентов */
  function percent() {
    return tempCalc.first * (100-tempCalc.last) / 100; 
  }

/* Функция сброса */
  function clear() {
    tablo.val('0');
    tempCalc.first = '';
    tempCalc.op = '';
    tempCalc.last = '';
    tablo.closest('.tablo').removeClass('zero-error');
    $('button').removeAttr('disabled');
  }

  /* Функция РАВНО */
  function equal() {
    isEqual = true;
    let result;

    if (!checkTemp()) {
      // debugger
      clear()
      return
    }

    switch (tempCalc.op) {
      case '+':
        result = +tempCalc.first + +tempCalc.last;
        break;
      case '-':
        result = +tempCalc.first - +tempCalc.last;
        break;
      case '*':
        result = +tempCalc.first * +tempCalc.last;
        break;
      case '/':
        if (tempCalc.last == '0') {
          tablo.closest('.tablo').addClass('zero-error');
          $('button').attr('disabled','disabled');
          $('button[data-op="C"]').removeAttr('disabled');
        } else {
          result = +tempCalc.first / +tempCalc.last;
        }
        break;
      case '%':
        result = percent();
        break;
    }
    tablo.val(result)
    tempCalc.first = result;
    tempCalc.op = '';
    tempCalc.last = '';
    console.log(tempCalc);
    console.log(isEqual);

  }

/* Функция определения операции */
  function operations(op) {
    tempCount = 0;

    if (isEqual) {
      isEqual = false
    }

    switch (op) {
      case '+':
        console.log('Plus');
        tempCalc.op = '+';
        break;
      case '-':
        console.log('Minus');
        tempCalc.op = '-';
        break;
      case '*':
        console.log('Mult');
        tempCalc.op = '*';
        break;
      case '/':
        console.log('Divide');
        tempCalc.op = '/';
        break;
      case '%':
        console.log('Percent');
        tempCalc.op = '%';
        break;
      case 'C':
        console.log('Clear');
        clear();
        break;
      case '=':
        console.log('Equal');
        equal();
        break;
    }
  }

  /* Ввод с клавиатуры */
  tablo.on('change', function() {
    if (tempCalc.op == '') {
      tempCalc.first = tablo.val();
    } else {
      tempCalc.last = tablo.val();
    }
    // if ((char.keyCode == 187) || (char.keyCode == 107)) {
    //   tempCalc.op = '+';
    // }
  });

  // Нажатия на клавишы калькулятора
  $('.numbers-button').on('click', function() {
    addNum(this);
  });

  $('.operations-button').on('click', function() {
    operations(this.getAttribute('data-op'));
  });
});