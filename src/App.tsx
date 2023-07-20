import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { type Movie } from './types'
import { Checkbox } from './widgets/Checkbox'
import { getRandomInt, splitIntoWholeNumbers } from './utils'
import { useFetch } from './hooks/useFetch'

const ALL_GENRE = 'All Genres'
const ANY_SCORE = 'Any Score'

function App() {
  const { data } = useFetch<any>('./movies_list.json')

  const [movies, setMovies] = useState<Movie[]>([])
  const [movieSpin, setMovieSpin] = useState<Movie | null>(null)
  const [genres, setGenres] = useState<string[]>([ALL_GENRE])
  const [imdbList, setImdbList] = useState<string[]>([ANY_SCORE])

  const [selectedGenre, setSelectedGenre] = useState<string>(ALL_GENRE)
  const [selectedImdb, setSelectedImdb] = useState<string>(ANY_SCORE)

  const [isTypeMovie, setTypeMovie] = useState<boolean>(false)
  const [isTypeTVShow, setTypeTVShow] = useState<boolean>(false)
  const [countSpin, setCountSpin] = useState<number>(0)

  useEffect(() => {
    data && setMovies(data?.movies_list || [])
  }, [data])

  useEffect(() => {
    getGenre()
    getIMDB()
  }, [movies])

  useEffect(() => {
    getIMDB()
  }, [selectedGenre])

  const getGenre = () => {
    if (movies.length) {
      const genreList = movies.map(m => m.genre_type)

      const _genre = [...new Set(genreList)].sort()
      _genre.unshift(ALL_GENRE)

      setGenres(_genre)
    } else {
      console.log('No movies object')
    }
  }

  const filterBySelectedGenre = () => {
    let _movies = [...movies]
    if (selectedGenre !== ALL_GENRE) {
      _movies = movies.filter(m => m.genre_type === selectedGenre)
    }
    return _movies
  }

  const getIMDB = () => {
    const _movies = filterBySelectedGenre()

    const _ratingScoreNumbers = _movies.map(m => m.rating_score).sort()
    const wholeNumbers = splitIntoWholeNumbers(_ratingScoreNumbers)

    if (selectedImdb !== ANY_SCORE && !wholeNumbers.includes(parseInt(selectedImdb))) {
      setSelectedImdb(ANY_SCORE)
    }

    const _ratingScore: string[] = wholeNumbers.map(n => n.toString())
    const _imdbList = [...new Set(_ratingScore)].sort()
    _imdbList.unshift(ANY_SCORE)

    setImdbList(_imdbList)
  }

  const handleSpin = () => {
    setCountSpin(prev => prev + 1)
    getRandomMovie()
  }

  const getRandomMovie = () => {
    // Filtered Movies
    let fm = filterBySelectedGenre()
    if (selectedImdb !== ANY_SCORE) {
      fm = fm.filter(m => m.rating_score >= parseInt(selectedImdb))
    }
    // Filtered Movies

    const rndIdx = getRandomInt(fm.length)
    const rndMovie = fm[rndIdx]

    setMovieSpin(rndMovie)
  }

  return (
    <>
      <div>
        <div>
          genre
          <select value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)} style={{ textTransform: "capitalize" }}>
            {genres.map((_, idx) => <option key={idx} value={_}>{_}</option>)}
          </select>
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
          <select value={selectedImdb} onChange={e => setSelectedImdb(e.target.value)}>
            {imdbList.map((_, idx) => <option key={idx} value={_}>{
              idx ? ' >= ' + _ : _
            }</option>)}
          </select>
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