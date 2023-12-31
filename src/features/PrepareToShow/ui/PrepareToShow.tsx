import { useSpinNumberContext } from '@/shared/context/SpinNumberContext';
import { Preloader } from "@/widgets/Preloader/ui/Preloader";

import cls from './PrepareToShow.module.scss'


interface PrepareToShowType {
    countSpin: number,
    isShowSpiner: boolean
}

export const PrepareToShow = ({ countSpin, isShowSpiner }: PrepareToShowType) => {
    const { spinNumber } = useSpinNumberContext()
    const timerDown = spinNumber - countSpin

    return <>
        <div className={cls.wrapMsg}>
            <h2>{timerDown}</h2>
            <h3>Let fate take the wheel!... Have a spin.</h3>
            {
                isShowSpiner && <Preloader />
            }
        </div>
    </>
}