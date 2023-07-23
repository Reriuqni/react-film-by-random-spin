import { SPIN_TIME_SECONDS } from "@/shared/configs/constants";
import cls from './PrepareToShow.module.scss'
import { Preloader } from "@/widgets/Preloader/ui/Preloader";

interface PrepareToShowType {
    countSpin: number,
    isShowSpiner: boolean
}

export const PrepareToShow = ({ countSpin, isShowSpiner }: PrepareToShowType) => {
    const timerDown = SPIN_TIME_SECONDS - countSpin

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