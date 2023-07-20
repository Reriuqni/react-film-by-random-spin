import { useState } from "react"
import { ALL_GENRE } from "../../../../app/hooks/useSpin"

interface SelectType {
    list: string[],
    // handleHook?: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    handleHook?: React.Dispatch<React.SetStateAction<string>>,
    prefixValue?: string,
}

export const Select = ({ list, handleHook, prefixValue }: SelectType) => {
    const [select, setSelect] = useState<string>(ALL_GENRE)

    const hanleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelect(e.target.value)
        handleHook && handleHook(e.target.value)
    }

    return <>
        <select value={select} onChange={hanleSelect}>
            {list.map((_, idx) => <option key={idx} value={_}>
                {
                    prefixValue && idx ? ' >= ' + _ : _
                }
            </option>)}
        </select>
    </>
}
