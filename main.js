const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');

let input = '';

for (let key of keys) {
  const value = key.dataset.key;

  key.addEventListener('click', () => {
    if (value == 'clear') {
      input = '';
      display_input.innerHTML = '';
      display_output.innerHTML = '';
    } else if (value == 'backspace') {
      input = input.slice(0, -1);
      display_input.innerHTML = CleanInput(input);
    } else if (value == '=') {
      let result = eval(PerpareInput(input)); //evaluates the specified string as javscript code and executes it.

      display_output.innerHTML = CleanOutput(result);
    } else if (value == 'brackets') {
      if (
        input.indexOf('(') == -1 ||
        (input.indexOf('(') != -1 &&
          input.indexOf(')') != -1 &&
          input.lastIndexOf('(') < input.lastIndexOf(')')) //The indexOf() method returns the position of the first occurrence of a value in a string.It also returns -1 if the value is not found.lastIndexOf() function Search for the last occurrence of string. Basically the above condition checks if there is no opening brackets it will add opening bracket or if the last brackets is closed then only it will add another opening bracket.
      ) {
        input += '(';
      } else if (
        (input.indexOf('(') != -1 && input.indexOf(')') == -1) ||
        (input.indexOf('(') != -1 &&
          input.indexOf(')') != -1 &&
          input.lastIndexOf('(') > input.lastIndexOf(')')) //The above condition checks if the opening bracket is present and closing is not present then add closing bracket or if both the brackets are present and index of opening is > then closing then add closing bracket.
      ) {
        input += ')';
      }

      display_input.innerHTML = CleanInput(input);
    } else {
      if (ValidateInput(value)) {
        input += value;
        display_input.innerHTML = CleanInput(input);
      }
    }
  });
}

function CleanInput(input) {
  let input_array = input.split(''); // The split() method divides a string into substrings and put these substrings into an array and returns the array.From this we will get every single character.
  let input_array_length = input_array.length;

  for (let i = 0; i < input_array_length; i++) {
    if (input_array[i] == '*') {
      input_array[i] = ` <span class="operator">x</span> `;
    } else if (input_array[i] == '/') {
      input_array[i] = ` <span class="operator">÷</span> `;
    } else if (input_array[i] == '+') {
      input_array[i] = ` <span class="operator">+</span> `;
    } else if (input_array[i] == '-') {
      input_array[i] = ` <span class="operator">-</span> `;
    } else if (input_array[i] == '(') {
      input_array[i] = `<span class="brackets">(</span>`;
    } else if (input_array[i] == ')') {
      input_array[i] = `<span class="brackets">)</span>`;
    } else if (input_array[i] == '%') {
      input_array[i] = `<span class="percent">%</span>`;
    }
  } //Basically we have done this to make the operators look more clean and of different colour.

  return input_array.join('');
}

function CleanOutput(output) {
  //this function is to add commas after three decimal places.
  let output_string = output.toString();
  let decimal = output_string.split('.')[1];
  output_string = output_string.split('.')[0];

  let output_array = output_string.split('');

  if (output_array.length > 3) {
    for (let i = output_array.length - 3; i > 0; i -= 3) {
      output_array.splice(i, 0, ',');
    }
  }

  if (decimal) {
    output_array.push('.');
    output_array.push(decimal);
  }

  return output_array.join('');
}

function ValidateInput(value) {
  let last_input = input.slice(-1);
  let operators = ['+', '-', '*', '/'];

  if (value == '.' && last_input == '.') {
    return false;
  }

  if (operators.includes(value)) {
    if (operators.includes(last_input)) {
      return false;
    } else {
      return true;
    }
  }

  return true;
}

function PerpareInput(input) {
  let input_array = input.split('');

  for (let i = 0; i < input_array.length; i++) {
    if (input_array[i] == '%') {
      input_array[i] = '/100';
    }
  }

  return input_array.join('');
}
