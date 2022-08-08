import './style.css';
import './app.css';

import {GetApis, Joke} from '../wailsjs/go/main/App';

document.querySelector('#app').innerHTML = `
      <div class="error-box" id="error"></div>
      <div class="input-box" id="input">
      <h1>😆 Go grab a joke 😆</h1>
        <div id="button-list"></div>
      </div>
      <div class="output-box" id="output"></div>
    </div>
`;

let resultElement = document.getElementById("output");
let errorElement = document.getElementById("error");

function addResult(content) {
    let newResultElement = document.createElement('div')
    newResultElement.innerText = content
    resultElement.prepend(newResultElement)
    resultElement.scrollTo(0, 0)
}

let buttonContainer = document.getElementById("button-list");

window.addEventListener('load', async function () {
    const apis = await getApis()
    apis.forEach((api) => {
        let button = document.createElement("button")
        button.innerText = api.title
        button.classList.add('btn')
        button.onclick = function() {joke(api.name)}
        buttonContainer.appendChild(button)
    })
})


async function getApis() {
    try {
        let result = await GetApis()
        return result.apis
    } catch (err) {
        console.error(err);
    }
}

window.joke = function (name) {
    try {
        Joke(name)
            .then((result) => {
                errorElement.innerText = ""
                addResult(result)
                const results = resultElement.children
                if (results.length > 5) {
                    resultElement.removeChild(resultElement.lastElementChild)
                }
            })
            .catch((err) => {
                showError(err)
            });
    } catch (err) {
        showError(err)
    }
};

function showError(error) {
    console.error(error);
    errorElement.style.display = "block"
    errorElement.innerText = error
    setTimeout(() => errorElement.style.display = "none", 3000);
}