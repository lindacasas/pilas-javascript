// Función para extraer elementos de una pila
function extractElements() {
    let inputStack = document.getElementById("ex1-input1").value;
    let numElements = parseInt(document.getElementById("ex1-input2").value);
    let stack = inputStack.split(",").map(item => item.trim());
    
    if (inputStack.trim()==="") {
        alert("Debe ingresar nombres de alimentos separados por comas");
        document.getElementById("result-ex1").innerHTML = "";
        return;
    }

    if (isNaN(numElements) || numElements <= 0 || numElements > stack.length) {
        alert(`Debe ingresar un número válido y que sea menor o igual al número de alimentos ingresados (<= ${stack.length})`);
        document.getElementById("result-ex1").innerHTML = "";
        return;
    }

    let result = extractFromStack(stack, numElements);
    document.getElementById("result-ex1").innerHTML = `Los alimentos son: <br> ${result.join(", ")}`;
}

function extractFromStack(stack, numElements) {
    let result = [];
    for (let i = 0; i < numElements; i++) {
        result.push(stack[i]);
    }
    return result;
}

document.getElementById("form-ex1").addEventListener("submit", (event) => {
    event.preventDefault();
    extractElements();
});

function validateInputText(input) {
    const regex = /^[a-zA-Z\s,]*$/;
    let valInput = input.value;
    if (!regex.test(valInput)) {
        input.value = valInput.replace(/[^a-zA-Z\s,]/g, '');
    }
}
function validateInputNumber(input) {
    const regex = /^[0-9\s,]*$/;
    let valInput = input.value;
    if (!regex.test(valInput)) {
        input.value = valInput.replace(/[^0-9\s,]/g, '');
    }
}

// Función para reemplazar un elemento en una pila
function replace() {
    let inputStack = document.getElementById("ex2-input1").value;
    let inputValues = document.getElementById("ex2-input2").value;

    if (inputStack.trim()==="") {
        alert("Debe ingresar numeros separados por comas");
        document.getElementById("result-ex2").innerHTML = "";
        return;
    }
    let stack = inputStack.split(",").map(item => parseInt(item.trim()));
    let valuesNewOld=inputValues.split(",").map(item => parseInt(item.trim()));
    
    if (inputValues.trim()==="" || valuesNewOld.length!=2 || stack.includes(valuesNewOld[1])===false) {
        alert(`Debe ingresar dos numeros separados por comas, el primer numero es un valor nuevo y el segundo numero es un valor que ya existe dentro del conjunto de numeros ingresados anteriormente, que pueden ser: [${stack}]`);
        document.getElementById("result-ex2").innerHTML = "";
        return;
    }
    //let [newValue, oldValue] = inputValues.split(",").map(item => parseInt(item.trim()));
  
    let modifiedStack = replaceInStack(stack, valuesNewOld[0], valuesNewOld[1]);
  
    document.getElementById("result-ex2").textContent = modifiedStack.join(", ");
}
  
function replaceInStack(stack, newValue, oldValue) {
    let result = [];
    let replaced = false;
    while (stack.length > 0) {
        let element = stack.pop();
        if(replaced){
            result.push(element);
        }
        if (element === oldValue && !replaced){
            result.push(newValue);
            replaced = true;
        }
    }
    return result.reverse();
}
  
document.getElementById("form-ex2").addEventListener("submit", (event) => {
    event.preventDefault();
    replace();
});

// Función para mostrar el recorrido de ida y vuelta entre pueblos
function roundTrip() {
    let originTown = document.getElementById("ej3-sel1").value;
    let destinationTown = document.getElementById("ej3-sel2").value;
  
    if (originTown === destinationTown) {
        alert("El pueblo origen y destino deben ser diferentes.");
        document.getElementById("result-ex3").textContent = "";
        return;
    }
  
    let [tripToDestination, tripBack] = showRoundTrip(originTown, destinationTown);

    document.getElementById("result-ex3").innerHTML = `Recorrido: ${tripToDestination.join(" → ")} <br>Regreso: ${tripBack.join(" → ")}`;
}
  
function showRoundTrip(originTown, destinationTown) {
    let towns = ['Samaipata', 'Sucre', 'Potosí', 'Uyuni', 'Copacabana'];
    let originIndex = towns.indexOf(originTown);
    let destinationIndex = towns.indexOf(destinationTown);
  
    let tripToDestination = [];
    let tripBack = [];
  
    if (originIndex < destinationIndex) {
      tripToDestination = towns.slice(originIndex, destinationIndex + 1);
      tripBack = towns.slice(originIndex, destinationIndex + 1).reverse();
    } else {
      tripToDestination = towns.slice(destinationIndex, originIndex + 1).reverse();
      tripBack = towns.slice(destinationIndex, originIndex + 1);
    }
  
    return [tripToDestination, tripBack];
}
  
document.getElementById("button-ex3").addEventListener("click", (event) => {
    event.preventDefault();
    roundTrip();
});

// Función para retirar un contenedor específico de una pila
function removeContainer() {
    let inputContainers = document.getElementById("ex4-input1").value;
    let containerNumber = parseInt(document.getElementById("ex4-input2").value);

    if (inputContainers.trim()==="") {
        alert("Debe ingresar numeros separados por comas");
        document.getElementById("result-ex2").innerHTML = "";
        return;
    }
    let stack = inputContainers.split(",").map(item => parseInt(item.trim()));

    if(isNaN(containerNumber) || containerNumber <=0 || stack.includes(containerNumber)===false){
        alert(`Debe ingresar el número del contenedor que desea retirar, los contenedores existentes son: [${stack}]`);
        document.getElementById("result-ex1").innerHTML ="";
        return;
    }

    let removedContainer = removeFromStack(stack, containerNumber);
  
    document.getElementById("result-ex4").innerHTML = `Contenedor retirado: ${removedContainer}<br>Contenedores existentes: ${stack.join(", ")}`;
}
  
function removeFromStack(stack, containerNumber) {
    let auxiliaryStack = [];
    let removedContainer = null;
  
    while (stack.length > 0) {
        let container = stack.pop();
        if (container === containerNumber) {
            removedContainer = container;
            break;
        } else {
            auxiliaryStack.push(container);
        }
    }
  
    while (auxiliaryStack.length > 0) {
        stack.push(auxiliaryStack.pop());
    }
  
    return removedContainer;
}
  
document.getElementById("form-ex4").addEventListener("submit", (event) => {
    event.preventDefault();
    removeContainer();
});
