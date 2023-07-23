import cls from './styles/App.module.scss'
import { useSpin } from './logics/useSpin'
import { SpinActions } from '@/features/SpinActions'
import { FilmCardAction } from '@/features/FilmCardAction'
import { PrepareToShow } from '@/features/PrepareToShow'

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
          {movieSpin
            ? <FilmCardAction movie={movieSpin} />
            : <PrepareToShow countSpin={countSpin} isShowSpiner={isDisableSpinBtn} />
          }
        </div>
      </div>
    </>
  )
}

export default App
