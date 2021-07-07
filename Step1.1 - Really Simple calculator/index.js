let num1 = prompt("Enter a Value", "0");
let num2 =  prompt("Enter a Value", "0");

document.getElementById("num1-el").textContent = num1
document.getElementById("num2-el").textContent = num2

resultat = document.getElementById("result-el")

function calcul (operation){
    switch (operation) {
        case '+':
            calculResult = parseInt(num1) + parseInt(num2)
            resultat.textContent = "Sum : "+ calculResult
            break
        case '-':
            calculResult = num1 - num2
            resultat.textContent = "Diff : "+ calculResult
            break
        case '/':
            calculResult = num1 / num2
            resultat.textContent = "Div : "+ calculResult
            break
        case '*':
            calculResult = num1 * num2
            resultat.textContent = "Mult : "+ calculResult
            break
        default:
            calculResult = 69420
            break
    }
}


