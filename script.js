
const paragraphs = [
`def example(x):
    if x < 5:
        print("Good Speed")
    else:
        print("Practice More")

    x = int(input())
example(x)`

];

const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector(".wrapper .input-field");
const tryAgainBtn = document.querySelector(".content button");
const timeTag = document.querySelector(".time span b");
const mistakeTag = document.querySelector(".mistake span");
const wpmTag = document.querySelector(".wpm span");
const accuracyTag = document.querySelector(".accuracy span");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;

function loadParagraph() {
    typingText.innerHTML = ""; 

    paragraphs[0].split("\n").forEach(line => {
        let lineDiv = document.createElement("div");
        line.split("").forEach(char => {
            let span = document.createElement("span");
            span.textContent = char;
            lineDiv.appendChild(span);
        });
        typingText.appendChild(lineDiv);
    });

    typingText.querySelectorAll("div")[0].querySelectorAll("span")[0].classList.add("active");

    document.addEventListener("keydown", handleKeydown);
    typingText.addEventListener("click", () => inpField.focus());
}

function handleKeydown(e) {
    const isModalOpen = modal.style.display === "block";
    
    if (isModalOpen && document.activeElement === customTextInput) {
        return;
    }

    if (e.key === "Tab") {
        e.preventDefault(); 
       
    } else {
        inpField.focus();
    }
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];

    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }

        characters.forEach(span => span.classList.remove("active"));
        if (charIndex < characters.length) {
            characters[charIndex].classList.add("active");
        }

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        let accuracy = Math.round(((charIndex - mistakes) / charIndex) * 100);
        accuracy = accuracy < 0 || !accuracy || accuracy === Infinity ? 0 : accuracy;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        accuracyTag.innerText = accuracy + "%";

        if (charIndex >= characters.length) {
            clearInterval(timer);
            inpField.value = "";
            alert("Practice More"); 
        }
    } else {
        clearInterval(timer);
        inpField.value = "";
     
        if (charIndex < characters.length) {
            alert("Finished");
        }
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
        inpField.value = "";
       
        if (charIndex < typingText.querySelectorAll("span").length) {
            alert("Practice More"); 
        }
    }
}


function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    accuracyTag.innerText = "0%"; 
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);


const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.querySelector(".modal .close");
const submitCustomTextBtn = document.getElementById("submitCustomText");
const customTextInput = document.getElementById("customTextInput");


openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
});


closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});


window.addEventListener("click", (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});


submitCustomTextBtn.addEventListener("click", () => {
    const customText = customTextInput.value;
    if (customText.trim()) {
        paragraphs.length = 0; // Clear existing paragraphs
        paragraphs.push(customText); 
        resetGame(); 
    }
    modal.style.display = "none";
    customTextInput.value = "";
});

document.addEventListener("keydown", handleKeydown);


document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.title');
    const text = title.textContent;
    const letterToKeep = 's'; 
    const spaceBefore = text.indexOf(letterToKeep) > 0;
    title.textContent = '';

    let i = 0;
    const typingSpeed = 100; 

    function typeWriter() {
        if (i < text.length) {
            
            if (text.charAt(i) !== letterToKeep && !(spaceBefore && text.charAt(i) === ' ' && text.charAt(i + 1) === letterToKeep)) {
                title.textContent += text.charAt(i);
            }
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else {
           
            setTimeout(() => {
                title.textContent = spaceBefore ? ' ' + letterToKeep : letterToKeep;
                i = 0;
                typeWriter();
            }, 1000); 
        }
    }

    
    title.textContent = spaceBefore ? ' ' + letterToKeep : letterToKeep;
    typeWriter();
});




