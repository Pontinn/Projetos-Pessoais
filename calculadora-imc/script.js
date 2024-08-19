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

//Trocar de cor
function colorUpdate(newClass){
  const classes = ["color-ideal-weight", "color-overweight", "color-underweight"]
  //Verifica cada classe do array e remove qualquer classe que não seja a nova
  classes.forEach(classe => {
    if (calculatorSection.classList.contains(classe) && classe !== newClass) {
        calculatorSection.classList.remove(classe);
    }
})
  //Adiciona a nova classe
  calculatorSection.classList.add(newClass)     
}

//Resultado Final
function imcResults(finalCalcIMCResults){

  let roundIMCResults = Math.round(finalCalcIMCResults)
  let textResult = "";

  if (finalCalcIMCResults < 18.4) {

    textResult = "Seu IMC é: " + roundIMCResults + " e você está abaixo do peso ideal";

    colorUpdate("color-underweight")
    
  } else if (finalCalcIMCResults >= 18.5 && finalCalcIMCResults < 25) {

    textResult = "Seu IMC é: " + roundIMCResults + " Parabéns! Você está no peso ideal";

    colorUpdate("color-ideal-weight")
    
  } else if (finalCalcIMCResults >= 25) {

    textResult = "Seu IMC é: " + roundIMCResults + " Cuidado! Você está acima do peso";

    colorUpdate("color-overweight")
  }

  //Acrescentando a variável textResult para facilitar a escrita
  document.querySelector(".number-result").textContent = textResult;

}