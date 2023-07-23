import { useEffect, useRef, useState } from "react"
import { getRandomInt } from "../../utils"
import { ANY_SCORE, SPIN_TIME_SECONDS } from "../../shared/configs/constants"
import { Movie } from "./types"

const INIT_COUNT_SPIN = 0

// The click SPIN button and timer Functionality 

interface HookHandleSpinType {
    selectedImdb: string,
    setMovieSpin: React.Dispatch<React.SetStateAction<Movie | null>>,
    filterBySelectedGenre: Movie[],
}

export const useHandleSpin = ({
    selectedImdb,
    setMovieSpin,
    filterBySelectedGenre,
}: HookHandleSpinType) => {

    const [isChangeMsgBtn, setChangeMsgBtn] = useState<boolean>(false);
    const [isDisableSpinBtn, setDisaleSpinBtn] = useState<boolean>(false);


    const [countSpin, setCountSpin] = useState<number>(INIT_COUNT_SPIN)

    const countSpinRef = useRef<number>(INIT_COUNT_SPIN);
    useEffect(() => {
        countSpinRef.current = countSpin;
    }, [countSpin]);

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
        let fm = filterBySelectedGenre
        if (selectedImdb !== ANY_SCORE) {
            fm = fm.filter(m => m.rating_score >= parseInt(selectedImdb))
        }
        // Filtered Movies

        const rndIdx = getRandomInt(fm.length)
        const rndMovie = fm[rndIdx]
        setMovieSpin(rndMovie)
    }

    return {
        countSpin,
        handleSpin,
        isChangeMsgBtn,
        isDisableSpinBtn,
    }
}