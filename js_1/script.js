function przelicz() {
    var value1 = parseFloat(document.getElementById("value1").value);
    var value2 = parseFloat(document.getElementById("value2").value);
    var value3 = parseFloat(document.getElementById("value3").value);
    var value4 = parseFloat(document.getElementById("value4").value);
    
    // Sprawdzenie czy wartości są liczbami, jeśli nie, ustawienie na zero
    value1 = isNaN(value1) ? 0 : value1;
    value2 = isNaN(value2) ? 0 : value2;
    value3 = isNaN(value3) ? 0 : value3;
    value4 = isNaN(value4) ? 0 : value4;
    
    var sum = value1 + value2 + value3 + value4;
    var average = sum / 4;
    var min = Math.min(value1, value2, value3, value4);
    var max = Math.max(value1, value2, value3, value4);
    
    var wynikiDiv = document.getElementById("wyniki");
    wynikiDiv.innerHTML = "Suma: " + sum + "<br>";
    wynikiDiv.innerHTML += "Średnia: " + average + "<br>";
    wynikiDiv.innerHTML += "Minimum: " + min + "<br>";
    wynikiDiv.innerHTML += "Maksimum: " + max + "<br>";
}
