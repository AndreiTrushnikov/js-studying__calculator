$(function () {
  let tempCalc = {
    first : '',
    op : '',
    last: ''
  }

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
    let tempTabloValue;
    let newNumPart = num.getAttribute('data-int');
    let check = checkTemp();
    let tempCount = 0;

    // Если первое число
    if (!check) {
      if (tablo.val().length > 14) return
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
    if ((check) && (tempCount == 0)) {
      tempCount = 1;
      tablo.val('0');
      if (tablo.val().length > 14) return
      if (tablo.val() == 0) {
        tablo.val(newNumPart);
        tempCalc.last = tablo.val();
      } else {
        if (tempCount == 0) {
          tempTabloValue = tablo.val();
          tablo.val(tempTabloValue + newNumPart);
          tempCalc.last = tablo.val();
        } else {

        }
      }
    }

    if ((check) && (tempCount == 1)) {
      if (tablo.val().length > 14) return
      if (tablo.val() == 0) {
        tablo.val(newNumPart);
        tempCalc.last = tablo.val();
      } else {
        if (tempCount == 0) {
          tempTabloValue = tablo.val();
          tablo.val(tempTabloValue + newNumPart);
          tempCalc.last = tablo.val();
        } else {

        }
      }
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
        tempCalc.op = '=';
        break;
    }
  }

    $('.numbers-button').on('click', function() {
      addNum(this);
    })
    
    $('.operations-button').on('click', function() {
      operations(this.getAttribute('data-op'));
    })
});