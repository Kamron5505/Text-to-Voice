let textArea = document.querySelector('#area');
let btn = document.querySelector('#btn');
let select = document.querySelector('#lang');

// Загружаем список голосов
function voiceText() {
    let voices = window.speechSynthesis.getVoices();
    select.innerHTML = ''; // Очищаем перед повторным добавлением

    for (const voice of voices) {
        const option = document.createElement("option");
        option.textContent = `${voice.name} (${voice.lang})`;

        if (voice.default) {
            option.textContent += " — DEFAULT";
        }

        option.setAttribute("data-lang", voice.lang);
        option.setAttribute("data-name", voice.name);
        select.appendChild(option);
    }
}

// Обновляем голоса при загрузке
speechSynthesis.onvoiceschanged = voiceText;

// Обработка клика по кнопке
btn.addEventListener('click', () => {
    let res = new SpeechSynthesisUtterance(textArea.value);
    let selectedOption = select.selectedOptions[0];
    
    let voiceName = selectedOption.getAttribute('data-name');
    
    let voices = speechSynthesis.getVoices();
    let selectedVoice = voices.find(voice => voice.name === voiceName);

    if (selectedVoice) {
        res.voice = selectedVoice;
    }

    speechSynthesis.speak(res);
});
