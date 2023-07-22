import { Movie } from "@/app/logics/types"
import { SPIN_TIME_MILISECONDS } from "@/shared/configs/constants"

interface FilmCardActionType {
    movie: Movie | null,
    countSpin: number,
}

export const FilmCardAction = ({ movie, countSpin }: FilmCardActionType) => {
    const timerDown = SPIN_TIME_MILISECONDS - countSpin

    return <>
        <div>
            {timerDown} sec
        </div>
        <div>
            {!movie && 'Let fate take the wheel!... Have a spin.'}
        </div>
        {movie && JSON.stringify(movie, null, 2)}
    </>
}