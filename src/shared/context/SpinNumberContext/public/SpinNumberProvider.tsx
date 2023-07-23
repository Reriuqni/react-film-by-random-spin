import { ReactNode, useState } from "react";
import { SpinNumberContex } from "../inner/SpinNumberContex";
import { SPIN_TIME_SECONDS } from "@/shared/configs/constants";

type Props = {
    children?: ReactNode,
}

export const SpinNumberProvider = ({ children }: Props) => {
    const [spinNumber, setSpinNumber] = useState(SPIN_TIME_SECONDS)

    return (
        <SpinNumberContex.Provider value={{ spinNumber, setSpinNumber }}>
            {children}
        </SpinNumberContex.Provider>
    )
}