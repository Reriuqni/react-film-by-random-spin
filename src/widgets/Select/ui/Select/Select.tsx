import { useState } from "react"
import { ALL_GENRE } from "../../../../configs/constants"

interface SelectType {
    list: string[],
    // handleHook?: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    handleHook?: React.Dispatch<React.SetStateAction<string>>,
    prefixValue?: string,
    disabled?: boolean,
}

export const Select = ({ list, handleHook, prefixValue, disabled = false }: SelectType) => {
    const [select, setSelect] = useState<string>(ALL_GENRE)

    const hanleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelect(e.target.value)
        handleHook && handleHook(e.target.value)
    }

    return <>
        <select value={select} onChange={hanleSelect} disabled={disabled}>
            {list.map((_, idx) => <option key={idx} value={_}>
                {
                    prefixValue && idx ? ' >= ' + _ : _
                }
            </option>)}
        </select>
    </>
}
