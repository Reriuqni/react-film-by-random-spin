import { ReactNode, useState } from "react";


import { SPIN_TIME_SECONDS } from "@/shared/configs/constants";


import { SpinNumberContex } from "../inner/SpinNumberContex";



type Props = {
    children?: ReactNode,
}

// export const SpinNumberProvider: React.FC<Props> = ({ children }) => {
export const SpinNumberProvider = ({ children }: Props) => {
    const [spinNumber, setSpinNumber] = useState(SPIN_TIME_SECONDS)

    return (
        <SpinNumberContex.Provider value={{ spinNumber, setSpinNumber }}>
            {children}
        </SpinNumberContex.Provider>
    )
}