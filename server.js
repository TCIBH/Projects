const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 3000;
let result = "";
function calculateExpression(expression) {
  const operate = (a, b, operator) => {
      switch (operator) {
          case '+': 
          return a + b;
          case '-': 
          return a - b;
          case '*':
             return a * b;
          case '/':
            if(b===0){
              return 0;
            }
            else{
              return a / b;
            }
             
          default: return NaN; 
      }
  };
  const precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2
  };
  let operands = [];
  let operators = [];
  let index = 0;

  while (index < expression.length) {
      const char = expression[index];

      if (!isNaN(char) || char === '.') {
          let operand = '';
          while (index < expression.length && (!isNaN(expression[index]) || expression[index] === '.')) {
              operand += expression[index];
              index++;
          }
          operands.push(parseFloat(operand));
      } else if (char === '(') {
          operators.push(char);
          index++;
      } else if (char === ')') {
          while (operators.length > 0 && operators[operators.length - 1] !== '(') {
              const operator = operators.pop();
              const b = operands.pop();
              const a = operands.pop();
              operands.push(operate(a, b, operator));
          }
          operators.pop();
          index++;
      } else {
          while (operators.length > 0 && precedence[operators[operators.length - 1]] >= precedence[char]) {
              const operator = operators.pop();
              const b = operands.pop();
              const a = operands.pop();
              operands.push(operate(a, b, operator));
          }
          operators.push(char);
          index++;
      }
  }
  while (operators.length > 0) {
      const operator = operators.pop();
      const b = operands.pop();
      const a = operands.pop();
      operands.push(operate(a, b, operator));
  }

  return operands[0];
}

app.use(bodyParser.json());
//  app.use(cors);
app.use(cors());
app.get("/", (req, res) => {
  res.send({ message: "Data received successfully" });
});
app.post("/data", (req, res) => {
  const receivedData = req.body.data;
  result = receivedData;
  console.log("Received data:", receivedData);
  // Process the received data as needed
  res.send({
    message: "data recieved succesfull",
    "data":receivedData,
  });
});
app.get("/data", (req, resp) => {
  resp.send({
    "data":calculateExpression(result),
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});







// // Example usage:
// const expression = "3+(4*2)/(1-5)^2";
// const result = calculateExpression(expression);
// console.log("Result:", result); // Output: Result: -0.125

// Example usage:
// const expression = "3+4*2/(1-5)^2";
// const result = calculateExpression(expression);
// console.log("Result:", result); // Output: Result: 7

// function mathematics(string){
//   var operatorIndex = string.search(/[+\-*%\/]/);
//   var operator = string.charAt(operatorIndex);
//   var operands = string.split(operator);
//   var num1 = parseInt(operands[0]);
//   var num2 = parseInt(operands[1]);
//   if(operator ==='+'){
//     return num1+num2;
//   }
//   else if(operator ==='-'){
//     return num1-num2;
//   }
//   else if(operator ==='*'){
//     return num1*num2
//   }
//   else if(operator ==='%'){
//     return (num2/100)*num1;
//   }
//   else{
//     return num1/num2
//   }
// }