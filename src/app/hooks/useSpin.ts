import { useEffect, useRef, useState } from "react"
import { useFetch } from "../../shared/hooks/useFetch"
import { getRandomInt, splitIntoWholeNumbers } from "../../utils"
import { ALL_GENRE, ANY_SCORE, SPIN_TIME_MILISECONDS } from "../../configs/constants"

const INIT_COUNT_SPIN = 0

interface Movie {
    id: number,
    title: string,
    year: number,
    description: string,
    image_path: string,
    genre_type: string,
    rating_score: number
}

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


    const countSpinRef = useRef<number>(INIT_COUNT_SPIN);
    useEffect(() => {
        countSpinRef.current = countSpin;
    }, [countSpin]);

    const [isDisableSpinBtn, setDisaleSpinBtn] = useState<boolean>(false);
    const [isChangeMsgBtn, setChangeMsgBtn] = useState<boolean>(false);

    const handleSpin = () => {
        setMovieSpin(null)
        setDisaleSpinBtn(true)

        const myInterval = setInterval(() => {

            if (countSpinRef.current >= SPIN_TIME_MILISECONDS) {
                // Stop timer
                clearInterval(myInterval);
                getRandomMovie()

                // Reinit counters
                setCountSpin(INIT_COUNT_SPIN)

                setDisaleSpinBtn(false)
                !isChangeMsgBtn && setChangeMsgBtn(true)
            } else {
                setCountSpin(++countSpinRef.current)
            }

        }, 1000)
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