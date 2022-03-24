const express = require("express");
var cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());

app.get(`/eval/:expression`, (req, res) => {
  let answer = calculate(req.params.expression);
  res.json(answer);
});

const calculate = (expression) => {
  const expressionArr = expression.split("");

  let currentNum = "";

  let arrNumbers = [];
  for (let i = 0; i < expressionArr.length; i++) {
    if (expressionArr[i] == "-" && expressionArr[i + 1] == "-") {
      expressionArr[i + 1] = "+";
      expressionArr.splice(i, 1);
    }
    if (
      expressionArr[i] == "-" &&
      expressionArr[i - 1] != "d" &&
      expressionArr[i - 1] != "*" &&
      expressionArr[i - 1] != "+" &&
      i != 0
    ) {
      arrNumbers.push(currentNum);
      arrNumbers.push("+");
      currentNum = "";
    }
    if (
      expressionArr[i] != "+" &&
      expressionArr[i] != "d" &&
      expressionArr[i] != "*"
    ) {
      currentNum += expressionArr[i];
    } else {
      if (currentNum.length >= 1) {
        arrNumbers.push(currentNum);
        currentNum = "";
      }
      arrNumbers.push(expressionArr[i]);
    }
  }
  arrNumbers.push(currentNum);

  // at this stage the string is converted into an array of numbers and operators

  let a = 0;
  let b = 2;
  let operator = 1;
  while (b < arrNumbers.length) {
    if (arrNumbers[operator] == "d") {
      arrNumbers[b] = arrNumbers[a] / arrNumbers[b];
      arrNumbers.splice(a, 2);
    }
    if (arrNumbers[operator] == "*") {
      arrNumbers[b] = arrNumbers[a] * arrNumbers[b];
      arrNumbers.splice(a, 2);
    }
    if (arrNumbers[operator] == "+" || arrNumbers[operator] == "-") {
      a += 2;
      b += 2;
      operator += 2;
    }
  }
  // now all the multiplication and division has been done

  answer = 0;
  for (let i = 0; i < arrNumbers.length; i += 2) {
    answer += parseFloat(arrNumbers[i]);
  }

  // to handle common math errors
  if (answer == Infinity) {
    return "Division By 0";
  } else if (isNaN(answer)) {
    return "Math Error";
  } else {
    return answer;
  }
};

app.listen(process.env.PORT || 5000, () => {});
