import './style.css';
import './app.css';

import logo from './assets/images/logo-universal.png';
import {Joke} from '../wailsjs/go/main/App';

document.querySelector('#app').innerHTML = `
      <div class="input-box" id="input">
      <h1>😆 Go grab a joke 😆</h1>
        <button class="btn" onclick="joke('chuck-noris') ">Chuck Noris</button>
        <button class="btn" onclick="joke('bread')">Bread</button>
        <button class="btn" onclick="joke('jokeapi-single')">Joke API</button>
        <button class="btn" onclick="joke('yomomma')">Yo Momma</button>
      </div>
      <div class="output-box" id="output">
      </div>
    </div>
`;

let resultElement = document.getElementById("output");

function addResult(content) {
    let newResultElement = document.createElement('div')
    newResultElement.innerText = content
    resultElement.prepend(newResultElement)
    resultElement.scrollTo(0,0)
}

window.joke = function (name) {
    try {
        Joke(name)
            .then((result) => {
                addResult(result)
                const results = resultElement.children
                if(results.length > 5) {
                    resultElement.removeChild(resultElement.lastElementChild)
                }
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (err) {
        console.error(err);
    }
};