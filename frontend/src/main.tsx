import './style.css';
import './app.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';

import {GetApis, Joke} from '../wailsjs/go/main/App';


function App() {


  let resultElement = document.getElementById("output");
  let errorElement = document.getElementById("error");

  function addResult(content) {
    let newResultElement = document.createElement('div')
    newResultElement.innerText = content
    resultElement.prepend(newResultElement)
    resultElement.scrollTo(0, 0)
  }

  let buttonContainer = document.getElementById("button-list");

  window.addEventListener('load', async () => {
    const apis = await getApis()
    if(!apis || !buttonContainer) return
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

  function joke(name: string) {
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

  return (
    <div className="App">
      <div className="error-box" id="error"></div>
      <div className="input-box" id="input">
        <h1>😆 Go grab a joke !! 😆</h1>
        <div id="button-list"></div>
      </div>
      <div className="output-box" id="output"></div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
