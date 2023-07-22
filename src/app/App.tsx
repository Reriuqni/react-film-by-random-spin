import cls from './styles/App.module.scss'
import { useSpin } from './logics/useSpin'
import { SpinActions } from '@/features/SpinActions'
import { FilmCardAction } from '@/features/FilmCardAction'

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
          <FilmCardAction
            movie={movieSpin}
            countSpin={countSpin}
          />
        </div>
      </div>
    </>
  )
}

export default App