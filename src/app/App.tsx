import { useState } from 'react'
import { Checkbox } from '../widgets/Checkbox'
import { useSpin } from './hooks/useSpin'
import { Select } from '../widgets/Select'
import cls from './styles/app.module.scss'
import { SPIN_TIME_MILISECONDS } from '../configs/constants'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './styles/App.css'
// import './styles/index.css'

function App() {
  const {
    movieSpin,
    handleSpin,
    imdbList,
    genres,
    setSelectedGenre,
    setSelectedImdb,
    countSpin,
    isDisableSpinBtn,
    isChangeMsgBtn,
  } = useSpin()

  const [isTypeMovie, setTypeMovie] = useState<boolean>(false)
  const [isTypeTVShow, setTypeTVShow] = useState<boolean>(false)

  const timerDown = SPIN_TIME_MILISECONDS - countSpin

  return (
    <>
      <div className={cls.container}>
        <div className={cls.card}>
          <div>
            <div>
              genre
              <Select list={genres} handleHook={setSelectedGenre} disabled={isDisableSpinBtn} />
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
              <Select list={imdbList} handleHook={setSelectedImdb} prefixValue=" >= " disabled={isDisableSpinBtn} />
            </div>
          </div>
          <button onClick={() => handleSpin()} disabled={isDisableSpinBtn}>
            {isChangeMsgBtn ? 'spin again' : 'spin'}
          </button>
          <div>
            {timerDown} sec
          </div>
          <div>
            {movieSpin && JSON.stringify(movieSpin, null, 2)}
          </div>
        </div>
      </div>
    </>
  )
}

export default App