import { useCallback, useEffect, useRef, useState } from "react"


import { ANY_SCORE } from "@/shared/configs/constants"
import { useSpinNumberContext } from "@/shared/context/SpinNumberContext"
import { getRandomInt } from "@/utils"

import { Movie } from "./types"


const INIT_COUNT_SPIN = 0

// The click SPIN button and timer Functionality 

interface HookHandleSpinType {
    selectedImdb: string,
    setMovieSpin: React.Dispatch<React.SetStateAction<Movie | null>>,
    filteredMovieBySelectedGenre: Movie[],
}

export const useHandleSpin = ({
    selectedImdb,
    setMovieSpin,
    filteredMovieBySelectedGenre,
}: HookHandleSpinType) => {
    const [isChangeMsgBtn, setChangeMsgBtn] = useState<boolean>(false);
    const [isDisableSpinBtn, setDisaleSpinBtn] = useState<boolean>(false);
    const [countSpin, setCountSpin] = useState<number>(INIT_COUNT_SPIN)
    const countSpinRef = useRef<number>(INIT_COUNT_SPIN);

    const { spinNumber } = useSpinNumberContext()
    const SPIN_TIME = spinNumber

    useEffect(() => {
        countSpinRef.current = countSpin;
    }, [countSpin]);

    const handleSpin = () => {
        // Fix 1 sec delay in case when init spin time = 0
        if (SPIN_TIME === 0) {
            getRandomMovie()
        } else {
            setMovieSpin(null)
            setDisaleSpinBtn(true)
            handleTimer()
        }
    }

    const getRandomMovie = useCallback(() => {
        // Filtered Movies
        let fm = filteredMovieBySelectedGenre
        if (selectedImdb !== ANY_SCORE) {
            fm = fm.filter(m => m.rating_score >= parseInt(selectedImdb))
        }
        // Filtered Movies

        const rndIdx = getRandomInt(fm.length)
        const rndMovie = fm[rndIdx]
        setMovieSpin(rndMovie)
    }, [selectedImdb, filteredMovieBySelectedGenre, setMovieSpin])

    const handleTimer = useCallback(() => {
        const myInterval = setInterval(() => {
            // +1 for reason to fix delay by one second when timer is zero
            if (countSpinRef.current + 1 >= SPIN_TIME) {
                clearInterval(myInterval)     // Stop timer
                getRandomMovie()
                setCountSpin(INIT_COUNT_SPIN) // Reinit counters
                setDisaleSpinBtn(false)
                !isChangeMsgBtn && setChangeMsgBtn(true)
            } else {
                setCountSpin(++countSpinRef.current)
            }
        }, 1000)
    }, [getRandomMovie, isChangeMsgBtn, SPIN_TIME])


    return {
        countSpin,
        handleSpin,
        isChangeMsgBtn,
        isDisableSpinBtn,
    }
}