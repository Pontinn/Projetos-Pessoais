const form = document.querySelector("form");

let height 
let heightStart
let weight

form.addEventListener("submit", function (event) {
  event.preventDefault();

  getInfo()

  //Atribuindo o resultado da função a uma variável
  let finalCalcIMC = imcCalculator(weight, heightStart);

  imcResults(finalCalcIMC)
 
});

//Coleta de dados
function getInfo(){

  height = document.querySelector('input[name = "height"]').value;

  //Convertendo String em Number Float e acrescentando um . após o primeiro numero para que o cálculo funcione
  heightStart = Number.parseFloat(height.slice(0, 1) + "." + height.slice(1));

  weight = Number.parseFloat(document.querySelector('input[name = "weight"]').value);

}

//Calculo IMC
function imcCalculator(weight, heightStart) {

  let calcImc = weight / Math.pow(heightStart, 2);

  return calcImc;
}

  const calculatorSection = document.querySelector(".calculator-section")

//Resultado Final
function imcResults(finalCalcIMCResults){

  let roundIMCResults = Math.round(finalCalcIMCResults)
  let textResult = "";

  if (finalCalcIMCResults < 18.4) {

    textResult = "Seu IMC é: " + roundIMCResults + " e você está abaixo do peso ideal";

    if(calculatorSection.classList.contains("color-ideal-weight")){
      calculatorSection.classList.remove("color-ideal-weight")

    } else if (calculatorSection.classList.contains("color-overweight")){
      calculatorSection.classList.remove("color-overweight")
    }

    calculatorSection.classList.toggle("color-underweight")  
    
  } else if (finalCalcIMCResults >= 18.5 && finalCalcIMCResults < 25) {

    textResult = "Seu IMC é: " + roundIMCResults + " Parabéns! Você está no peso ideal";

    if(calculatorSection.classList.contains("color-underweight")){
      calculatorSection.classList.remove("color-underweight")

    } else if (calculatorSection.classList.contains("color-overweight")){
      calculatorSection.classList.remove("color-overweight")
    }

    calculatorSection.classList.toggle("color-ideal-weight")
    
  } else if (finalCalcIMCResults >= 25) {

    textResult = "Seu IMC é: " + roundIMCResults + " Cuidado! Você está acima do peso";

    if(calculatorSection.classList.contains("color-underweight")){
      calculatorSection.classList.remove("color-underweight")

    } else if (calculatorSection.classList.contains("color-ideal-weight")){
      calculatorSection.classList.remove("color-ideal-weight")
    }

    calculatorSection.classList.toggle("color-overweight")

  }

  //Acrescentando a variável textResult para facilitar a escrita
  document.querySelector(".number-result").textContent = textResult;

}