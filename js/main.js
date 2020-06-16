$(function () {
  let tempCalc = {
    first : '',
    op : '',
    last: ''
  };
  let tempCount = 0;
  let tablo = $('#calculation-result');

/* Функция проверки временного хранилища данных */
  function checkTemp() {
    if (tempCalc.first == '') return false;
    if ((tempCalc.first != '') && (tempCalc.op != '')) {
      return true;
    } else {return false;}
  }
/* Функция прибавления числа к числу в табло */
  function addNum(num) {
    let tablo = $('#calculation-result');
    let tempTabloValue = '';
    let newNumPart = num.getAttribute('data-int');
    let check = checkTemp();

    // Если первое число
    if (!check) {
      if (tablo.val().length > 14) return;
      if (tablo.val() == 0) {
        tablo.val(newNumPart);
        tempCalc.first = tablo.val();
      } else {
        tempTabloValue = tablo.val();
        tablo.val(tempTabloValue + newNumPart);
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

    // Если уже сработал знак операции в первый раз
    if ((check) && (tempCount == 0)) {
      tempCount = 1;
      tablo.val(newNumPart);
      tempCalc.last = tablo.val();
      tempTabloValue = '';
    }
    console.log(tempCalc);
  }

/* Функция сброса */
  function clear() {
    let tablo = $('#calculation-result');
    tablo.val('0');
    tempCalc.first = '';
    tempCalc.op = '';
    tempCalc.last = '';
    tablo.closest('.tablo').removeClass('zero-error');
    $('button').removeAttr('disabled');
  }

  /* Функция РАВНО */
  function equal() {
    let tablo = $('#calculation-result');
    switch (tempCalc.op) {
      case '+': 
        tablo.val(parseInt(+tempCalc.first + +tempCalc.last));
        break;
      case '-': 
        tablo.val(parseInt(+tempCalc.first - +tempCalc.last));
        break;
      case '*': 
        tablo.val(parseInt(+tempCalc.first * +tempCalc.last));
        break;
      case '/': 
      // debugger
        if (tempCalc.last == '0') {
          tablo.closest('.tablo').addClass('zero-error');
          $('button').attr('disabled','disabled');
          $('button[data-op="C"]').removeAttr('disabled');
        } else {
          tablo.val(parseInt(+tempCalc.first / +tempCalc.last));
        }
        break;
    }
   
  }
/* Функция определения операции */
  function operations(op) {
    let tablo = $('#calculation-result');
    let tempTabloValue = tablo.val();
    tempCount = 0;
    switch (op) {
      case '+':
        console.log('Plus');
        tempCalc.op = '+';
        break;
      case '-':
        console.log('minus');
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
    if ((char.keyCode == 187) || (char.keyCode == 107)) {
      tempCalc.op = '+';
    }
  });

  // Нажатия на клавишы калькулятора
  $('.numbers-button').on('click', function() {
    addNum(this);
  });

  $('.operations-button').on('click', function() {
    operations(this.getAttribute('data-op'));
  });
});