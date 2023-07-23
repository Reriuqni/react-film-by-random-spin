import cls from './styles/App.module.scss'
import { useSpin } from './logics/useSpin'
import { SpinActions } from '@/features/SpinActions'
import { FilmCardAction } from '@/features/FilmCardAction'
import { SPIN_TIME_SECONDS } from '@/shared/configs/constants'

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

  const timerDown = SPIN_TIME_SECONDS - countSpin

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
          {movieSpin
            ? <FilmCardAction movie={movieSpin} />
            : timerDown + ' sec' + 'Let fate take the wheel!... Have a spin.'
          }
        </div>
      </div>
    </>
  )
}

export default App