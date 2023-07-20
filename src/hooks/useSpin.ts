import { useEffect, useState } from "react"
import { Movie } from "../types"
import { useFetch } from "./useFetch"
import { getRandomInt, splitIntoWholeNumbers } from "../utils"

export const ALL_GENRE = 'All Genres'
export const ANY_SCORE = 'Any Score'

export const useSpin = () => {
    const { data } = useFetch<any>('./movies_list.json')

    const [movies, setMovies] = useState<Movie[]>([])
    const [genres, setGenres] = useState<string[]>([ALL_GENRE])

    const [movieSpin, setMovieSpin] = useState<Movie | null>(null)
    const [imdbList, setImdbList] = useState<string[]>([ANY_SCORE])

    const [selectedGenre, setSelectedGenre] = useState<string>(ALL_GENRE)
    const [selectedImdb, setSelectedImdb] = useState<string>(ANY_SCORE)

    const [countSpin, setCountSpin] = useState<number>(0)

    useEffect(() => {
        data && setMovies(data?.movies_list || [])
    }, [data])

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

    useEffect(() => {
        getGenre()
        getIMDB()
    }, [movies])

    useEffect(() => {
        getIMDB()
    }, [selectedGenre])

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

    const handleSelectGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGenre(e.target.value)
    }

    const handleSelectImdb = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedImdb(e.target.value)
    }

    return {
        genres,
        movieSpin,
        imdbList,
        countSpin,
        handleSpin,
        selectedGenre,
        handleSelectGenre,
        selectedImdb,
        handleSelectImdb,
    }
}