import './style.css';
import './app.scss';
import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom/client';
import {GetApis, Joke} from '../wailsjs/go/main/App';
import Button from "./components/button";
import JokeElement from "./components/joke";
import {api} from "../wailsjs/go/models";

interface Api {
  name: string,
  title: string
}

const exceptedApis = [
  'yomomma', 'chuck-noris', 'dad-jokes', 'jokeapi-single'
]

export default function App() {
  const [apis, setApis] = useState<Api[]>([])
  const [jokes, setJokes] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)


  const jokeRef = useRef<null | HTMLDivElement>(null)

  function addResult(content: string) {
    if (jokes.length > 4) {
      jokes.pop()
    }

    setJokes([content, ...jokes])
  }

  useEffect(() => {
    const fetchApis = async () => {
      const response = await getApis() as Api[]
      if (!response) return
      const apisToDisplay = response.filter(api => exceptedApis.includes(api.name))
      setApis(apisToDisplay)
    }

    fetchApis()

    if (jokeRef.current) {
      jokeRef.current.scrollIntoView(
        {
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
    }
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
          setError(null)
          addResult(result)
        })
        .catch((err) => {
          setError(err)
        });
    } catch (err: any) {
      setError(err)
    }
  }

  return (
    <div className="App" ref={jokeRef}>
      {error && <div className="error-box" id="error">{error}</div>}
      <div className="input-box" id="input">
        <h1>😆 Go grab a joke !! 😆</h1>
        <div id="button-list">
          {apis?.map((api: Api) =>
            <Button key={api.title} apiTitle={api.title} apiName={api.name}
                    onClick={() => joke(api.name)}/>
          )
          }
        </div>
      </div>
      <div className="output-box" id="output">
        {jokes?.map((joke: string) =>
          <JokeElement value={joke}/>
        )
        }
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)
