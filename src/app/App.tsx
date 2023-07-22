import cls from './styles/App.module.scss'
import clsBtn from './styles/Button.module.scss'
import { useSpin } from './hooks/useSpin'
import { SPIN_TIME_MILISECONDS } from '../shared/configs/constants'
import { SpinFilters } from '@/features/SpinFilters'

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
          <div className={cls.wrapFilters}>
            <SpinFilters
              genres={genres}
              setSelectedGenre={setSelectedGenre}
              imdbList={imdbList}
              setSelectedImdb={setSelectedImdb}
              isDisableSpinBtn={isDisableSpinBtn}
            />
            <button
              className={clsBtn.button}
              onClick={() => handleSpin()}
              disabled={isDisableSpinBtn}
            >
              {isChangeMsgBtn ? 'spin again' : 'spin'}
            </button>
          </div>

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