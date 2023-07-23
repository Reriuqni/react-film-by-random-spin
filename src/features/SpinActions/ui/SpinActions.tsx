import { SpinFilters, SpinFiltersType } from '@/features/SpinFilters/index'
import { Button, ButtonType } from '@/widgets/Button/index'


import cls from './SpinActions.module.scss'


type SpinActionsType = SpinFiltersType & ButtonType

export const SpinActions = ({
    genres,
    setSelectedGenre,
    imdbList,
    setSelectedImdb,
    isDisableSpinBtn,
    // Btn
    onClick,
    label,
}: SpinActionsType) => {
    return <>
        <div className={cls.wrapFilters}>
            <SpinFilters
                genres={genres}
                setSelectedGenre={setSelectedGenre}
                imdbList={imdbList}
                setSelectedImdb={setSelectedImdb}
                isDisableSpinBtn={isDisableSpinBtn}
            />
            <Button
                onClick={onClick}
                disabled={isDisableSpinBtn}
                label={label}
            />
        </div>
    </>
}