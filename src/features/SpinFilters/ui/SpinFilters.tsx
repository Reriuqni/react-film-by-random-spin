// import cls from '@/app/styles/app.module.scss'
import cls from './SpinFilters.module.scss'
import { Checkbox } from '@/widgets/Checkbox'
import { Select } from '@/widgets/Select'
import { useState } from 'react'

export interface SpinFiltersType {
    genres: string[],
    setSelectedGenre: React.Dispatch<React.SetStateAction<string>>,
    imdbList: string[],
    setSelectedImdb: React.Dispatch<React.SetStateAction<string>>,
    isDisableSpinBtn: boolean,
}

export const SpinFilters = ({
    genres,
    setSelectedGenre,
    imdbList,
    setSelectedImdb,
    isDisableSpinBtn
}: SpinFiltersType) => {
    const [isTypeMovie, setTypeMovie] = useState<boolean>(false)
    const [isTypeTVShow, setTypeTVShow] = useState<boolean>(false)

    return <>
        <div className={cls.rowsFilter}>
            <div>
                <label>genre</label>
                <Select list={genres} handleHook={setSelectedGenre} disabled={isDisableSpinBtn} />
            </div>
            <div>
                <label className={cls.label}>type</label>
                <div className={cls.wrapCheckboxes}>
                    <Checkbox label="Movies" value={isTypeMovie} onChange={() => setTypeMovie(!isTypeMovie)} />
                    <Checkbox label="TV Shows" value={isTypeTVShow} onChange={() => setTypeTVShow(!isTypeTVShow)} />
                </div>
            </div>
            <div>
                <label>imdb</label>
                <Select list={imdbList} handleHook={setSelectedImdb} prefixValue=" >= " disabled={isDisableSpinBtn} />
            </div>
        </div>
    </>
}