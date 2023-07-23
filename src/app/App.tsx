import { FilmCard } from '@/widgets/FilmCard'
import { InputSpin } from '@/widgets/InputSpin'
import { PrepareToShow } from '@/features/PrepareToShow'
import { SpinActions } from '@/features/SpinActions'
import cls from './styles/App.module.scss'
import { useSpin } from './logics/useSpin'

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
    <div className={cls.container}>
      <div className={cls.positionInput}>
        <InputSpin />
      </div>
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
          ? <FilmCard movie={movieSpin} />
          : <PrepareToShow countSpin={countSpin} isShowSpiner={isDisableSpinBtn} />
        }
      </div>
    </div>
  )
}

export default App
