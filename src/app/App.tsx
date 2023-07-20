import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './styles/App.css'
import { Checkbox } from '../widgets/Checkbox'
import { useSpin } from './hooks/useSpin'
import { Select } from '../widgets/Select'

function App() {
  const {
    movieSpin,
    countSpin,
    handleSpin,
    imdbList,
    genres,
    setSelectedGenre,
    setSelectedImdb,
  } = useSpin()

  const [isTypeMovie, setTypeMovie] = useState<boolean>(false)
  const [isTypeTVShow, setTypeTVShow] = useState<boolean>(false)

  return (
    <>
      <div>
        <div>
          genre
          <Select list={genres} handleHook={setSelectedGenre} />
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
          <Select list={imdbList} handleHook={setSelectedImdb} prefixValue=" >= " />
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