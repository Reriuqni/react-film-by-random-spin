import { useCallback, useEffect, useMemo, useState } from "react"
import { useFetch } from "../../shared/hooks/useFetch"
import { splitIntoWholeNumbers } from "../../utils"
import { ALL_GENRE, ANY_SCORE } from "../../shared/configs/constants"
import { Movie } from "./types"
import { useHandleSpin } from "./useHandleSpin"

export const useSpin = () => {
    const { data } = useFetch<any>('./movies_list.json')

    const [movies, setMovies] = useState<Movie[]>([])
    const [genres, setGenres] = useState<string[]>([ALL_GENRE])

    const [movieSpin, setMovieSpin] = useState<Movie | null>(null)
    const [imdbList, setImdbList] = useState<string[]>([ANY_SCORE])

    const [selectedGenre, setSelectedGenre] = useState<string>(ALL_GENRE)
    const [selectedImdb, setSelectedImdb] = useState<string>(ANY_SCORE)

    useEffect(() => {
        data && setMovies(data?.movies_list || [])
    }, [data])

    const updateGenre = useMemo(() => {
        if (movies.length) {
            // Get unique genres
            const genreList = movies.map(m => m.genre_type)
            // Sort genres in alphabetical order
            const _genre = [...new Set(genreList)].sort()
            // Add constant in to the first index
            _genre.unshift(ALL_GENRE)

            setGenres(_genre)
        } else {
            console.log('No movies object')
        }
    }, [movies])

    useEffect(() => {
        updateGenre
        updateIMDB()
    }, [movies])

    useEffect(() => {
        updateIMDB()
    }, [selectedGenre])

    const filterBySelectedGenre = useMemo(() => {
        let _movies = [...movies]
        if (selectedGenre !== ALL_GENRE) {
            _movies = movies.filter(m => m.genre_type === selectedGenre)
        }
        return _movies
    }, [movies, selectedGenre])

    const updateIMDB = useCallback(() => {
        const _movies = filterBySelectedGenre

        const _ratingScoreNumbers = _movies.map(m => m.rating_score).sort()
        const wholeNumbers = splitIntoWholeNumbers(_ratingScoreNumbers)

        if (selectedImdb !== ANY_SCORE && !wholeNumbers.includes(parseInt(selectedImdb))) {
            setSelectedImdb(ANY_SCORE)
        }

        const _ratingScore: string[] = wholeNumbers.map(n => n.toString())
        const _imdbList = [...new Set(_ratingScore)].sort()
        _imdbList.unshift(ANY_SCORE)

        setImdbList(_imdbList)
    }, [filterBySelectedGenre])

    const {
        countSpin,
        handleSpin,
        isChangeMsgBtn,
        isDisableSpinBtn
    }
        = useHandleSpin({ selectedImdb, setMovieSpin, filterBySelectedGenre })


    return {
        genres,
        movieSpin,
        imdbList,
        handleSpin,
        selectedGenre,
        selectedImdb,
        setSelectedGenre,
        setSelectedImdb,
        countSpin,
        isDisableSpinBtn,
        isChangeMsgBtn,
    }
}

