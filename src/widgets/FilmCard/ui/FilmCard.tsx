import { Movie } from "@/app/logics/types"
import cls from './FilmCard.module.scss'
import { getRandomInt } from "@/utils"
import { Button, ButtonSize, ButtonStyle } from "@/widgets/Button"
import { useState } from "react"

export interface FilmCardType {
    movie: Movie,
}

export const FilmCard = ({ movie }: FilmCardType) => {
    const [isShowMore, setShowMore] = useState<boolean>(true)

    return <>
        <div className={cls.filmCard}>
            <div>
                <img src={movie?.image_path} alt={movie?.title} />
            </div>

            <div className="wrapFilmInfoAction" style={{ height: '100%' }}>
                <div className="wrapInfo">
                    <h3 className={cls.filmTitle}>{movie?.title}</h3>
                    <p className={cls.filmParams}>
                        <span>{movie.year}</span>
                        <span>IMDB: {movie.rating_score}/10</span>
                        <span>RG: {getRandomInt(100)}</span>
                        <span>{getRandomInt(2)}h {getRandomInt(59)}m</span>
                    </p>
                    <p className={cls.filmDescription}>
                        <span className={[isShowMore && cls.lineClamp].join(' ')}>
                            {movie.description}
                            Nam congue eu nisl a venenatis. Nulla id felis pellentesque, malesuada eros id, accumsan lorem.
                        </span>
                        <span onClick={() => setShowMore(!isShowMore)}>
                            <Button
                                label={isShowMore ? 'Show more' : 'Show less'}
                                size={ButtonSize.MICRO}
                                buttonStyle={ButtonStyle.DARK}
                            />
                        </span>
                    </p>
                </div>
                <div className={cls.filmAction}>
                    <div className={cls.wrapFavorite}>
                        <Button label={"+ Want to See"} buttonStyle={ButtonStyle.DARK} />
                        <Button label={"Seen It"} buttonStyle={ButtonStyle.DARK} />
                    </div>
                    <Button label={"watch now"} />
                </div>
            </div>

        </div>
    </>
}