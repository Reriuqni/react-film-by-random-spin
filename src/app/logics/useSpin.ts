import { useEffect, useRef, useState } from "react"
import { useFetch } from "../../shared/hooks/useFetch"
import { getRandomInt, splitIntoWholeNumbers } from "../../utils"
import { ALL_GENRE, ANY_SCORE, SPIN_TIME_SECONDS } from "../../shared/configs/constants"
import { Movie } from "./types"

const INIT_COUNT_SPIN = 0

export const useSpin = () => {
    const { data } = useFetch<any>('./movies_list.json')

    const [movies, setMovies] = useState<Movie[]>([])
    const [genres, setGenres] = useState<string[]>([ALL_GENRE])

    const [movieSpin, setMovieSpin] = useState<Movie | null>(null)
    const [imdbList, setImdbList] = useState<string[]>([ANY_SCORE])

    const [selectedGenre, setSelectedGenre] = useState<string>(ALL_GENRE)
    const [selectedImdb, setSelectedImdb] = useState<string>(ANY_SCORE)

    const [countSpin, setCountSpin] = useState<number>(INIT_COUNT_SPIN)

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


    // The click SPIN button and timer Functionality 

    const countSpinRef = useRef<number>(INIT_COUNT_SPIN);
    useEffect(() => {
        countSpinRef.current = countSpin;
    }, [countSpin]);

    const [isDisableSpinBtn, setDisaleSpinBtn] = useState<boolean>(false);

    // The hook to change the label of the SPIN button if the spin button pressed more than ones
    const [isChangeMsgBtn, setChangeMsgBtn] = useState<boolean>(false);

    const handleSpin = () => {
        // Fix 1 sec delay in case when init spin time = 0
        if (SPIN_TIME_SECONDS === 0) {
            getRandomMovie()
        } else {
            setMovieSpin(null)
            setDisaleSpinBtn(true)
            handleTimer()
        }

        function handleTimer() {
            const myInterval = setInterval(() => {
                // +1 for reason to fix delay by one second when timer is zero
                if (countSpinRef.current + 1 >= SPIN_TIME_SECONDS) {
                    clearInterval(myInterval)     // Stop timer
                    getRandomMovie()
                    setCountSpin(INIT_COUNT_SPIN) // Reinit counters
                    setDisaleSpinBtn(false)
                    !isChangeMsgBtn && setChangeMsgBtn(true)
                } else {
                    setCountSpin(++countSpinRef.current)
                }
            }, 1000)
        }
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

    // The click SPIN button and timer Functionality 


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