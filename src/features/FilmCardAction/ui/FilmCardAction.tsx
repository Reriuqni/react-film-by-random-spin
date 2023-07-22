import { SPIN_TIME_MILISECONDS } from "@/shared/configs/constants"
import { FilmCard, FilmCardType } from "@/widgets/FilmCard"

interface FilmCardActionType extends FilmCardType {
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
        <FilmCard movie={movie} />
    </>
}