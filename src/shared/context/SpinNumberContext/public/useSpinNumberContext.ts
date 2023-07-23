import { useContext } from "react";
import { SpinNumberType } from "../inner/useSpinNumberType";
import { SpinNumberContex } from "../inner/SpinNumberContex";

export const useSpinNumberContext = () => useContext<SpinNumberType>(SpinNumberContex)