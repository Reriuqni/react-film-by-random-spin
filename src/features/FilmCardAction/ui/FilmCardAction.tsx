import { FilmCard, FilmCardType } from "@/widgets/FilmCard"
import cls from './FilmCardAction.module.scss'

export const FilmCardAction = ({ movie }: FilmCardType) => {
    return <>
        <div className={cls.filmCardAction}>
            <FilmCard movie={movie} />
        </div>
    </>
}