import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Checkbox } from './widgets/Checkbox'
import { useSpin } from './hooks/useSpin'
import { Select } from './widgets/Select'

function App() {
  const {
    movieSpin,
    countSpin,
    handleSpin,
    imdbList,
    handleSelectImdb,
    genres,
    handleSelectGenre,
  } = useSpin()

  const [isTypeMovie, setTypeMovie] = useState<boolean>(false)
  const [isTypeTVShow, setTypeTVShow] = useState<boolean>(false)

  return (
    <>
      <div>
        <div>
          genre
          <Select list={genres} handleHook={handleSelectGenre} />
        </div>
        <div style={{ display: 'flex' }}>
          <div>type</div>
          <div>
            <Checkbox label="Movies" value={isTypeMovie} onChange={() => setTypeMovie(!isTypeMovie)} />
            <Checkbox label="TV Shows" value={isTypeTVShow} onChange={() => setTypeTVShow(!isTypeTVShow)} />
          </div>
        </div>
        <div>
          imdb
          <Select list={imdbList} handleHook={handleSelectImdb} prefixValue=" >= " />
        </div>
      </div>
      <button onClick={() => handleSpin()}>
        {countSpin ? 'spin again' : 'spin'}
      </button>
      <div>
        {movieSpin && JSON.stringify(movieSpin, null, 2)}
      </div>
    </>
  )
}

export default App