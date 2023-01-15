import './style.css';
import './app.scss';
import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {GetApis, Joke} from '../wailsjs/go/main/App';
import Button from "./components/button";
import {
  getMouseEventButton
} from "@testing-library/user-event/system/pointer/buttons";

interface Api {
  name: string,
  title: string
}

export default function App() {

  let apis: Api[] = []

  function addResult(content) {
    let resultElement = document.getElementById("output");
    let errorElement = document.getElementById("error");
    let newResultElement = document.createElement('div')
    newResultElement.innerText = content
    resultElement.prepend(newResultElement)
    resultElement.scrollTo(0, 0)
  }

  useEffect(() => {
    const fetchApis = async () => {
      apis = await getApis() as Api[]
      if(!apis) return
      // buttonContainer.innerHTML = ''
      // apis.forEach((api) => {
      //   let button = document.createElement("button")
      //   console.log("api", api)
      //   button.innerText = api.title
      //   button.classList.add('btn')
      //   button.onclick = function() {joke(api.name)}
      //   buttonContainer.appendChild(button)
      // })
    }

    fetchApis()

  }, [apis])



  async function getApis() {
    try {
      let result = await GetApis()
      return result.apis
    } catch (err) {
      console.error(err);
    }
  }

  function joke(name: string) {
    let resultElement = document.getElementById("output");
    let errorElement = document.getElementById("error");
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
  }

  function showError(error) {
    let resultElement = document.getElementById("output");
    let errorElement = document.getElementById("error");
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
        <div id="button-list">
          {apis.map((api: Api) =>
             <Button key={api.title} apiTitle={api.title} apiName={api.name}/>
          )
          }
        </div>
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
