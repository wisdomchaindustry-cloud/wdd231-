// ==========================================
// UYO CHAMBER OF COMMERCE
// Mobile Navigation
// WDD 231
// ==========================================

// Select Elements
const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#navigation");

// Toggle Navigation Menu
menuButton.addEventListener("click",() =>{

    navigation.classList.toggle("open");

    if(navigation.classList.contains("open")){
        menuButton.textContent = "✕";
        menuButton.setAttribute("aria-label","Close Navigation Menu");
    }else{
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label","Open Navigation Menu");
    }

});// ==========================================
// UYO CHAMBER OF COMMERCE
// Mobile Navigation
// WDD 231
// ==========================================

// Select Elements
const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#navigation");

// Toggle Navigation Menu
menuButton.addEventListener("click",() =>{

    navigation.classList.toggle("open");

    if(navigation.classList.contains("open")){
        menuButton.textContent = "✕";
        menuButton.setAttribute("aria-label","Close Navigation Menu");
    }else{
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label","Open Navigation Menu");
    }

});