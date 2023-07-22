import cls from './styles/App.module.scss'
import { useSpin } from './logics/useSpin'
import { SPIN_TIME_MILISECONDS } from '../shared/configs/constants'
import { SpinActions } from '@/features/SpinActions'

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

  const timerDown = SPIN_TIME_MILISECONDS - countSpin

  return (
    <>
      <div className={cls.container}>
        <div className={cls.cardSpin}>
          <SpinActions
            genres={genres}
            setSelectedGenre={setSelectedGenre}
            imdbList={imdbList}
            setSelectedImdb={setSelectedImdb}
            isDisableSpinBtn={isDisableSpinBtn}
            onClick={handleSpin}
            disabled={isDisableSpinBtn}
            label={isChangeMsgBtn ? 'spin again' : 'spin'}
          />
          <div>
            {timerDown} sec
          </div>
          {movieSpin && JSON.stringify(movieSpin, null, 2)}
          <div>
            {!movieSpin && 'Let fate take the wheel!... Have a spin.'}
          </div>
        </div>
      </div>
    </>
  )
}

export default App