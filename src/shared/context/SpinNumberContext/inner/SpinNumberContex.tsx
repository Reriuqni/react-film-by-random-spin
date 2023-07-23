import { createContext } from "react";

import { SpinNumberType } from "./useSpinNumberType";


export const SpinNumberContex = createContext<SpinNumberType>({} as SpinNumberType);