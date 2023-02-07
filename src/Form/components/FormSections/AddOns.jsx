import { addOnsData } from '../../data'
import { useState } from 'react'

const AddOns = () => {
    const [checkedState, setCheckedState] = useState(
        new Array(addOnsData.length).fill(false),
    )
    console.log(checkedState)
    const handleChange = i => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === i ? !item : item,
        )

        setCheckedState(updatedCheckedState)
    }
    return (
        <div>
            {addOnsData.map((item, i) => (
                <div key={i}>
                    <input
                        type="checkbox"
                        id={`custom-checkbox-${i}`}
                        name={item.title}
                        value={item.title}
                        checked={checkedState[i]}
                        onChange={() => handleChange(i)}
                    />
                    <label htmlFor={`custom-checkbox-${i}`}>{item.title}</label>
                </div>
            ))}
        </div>
    )
}
export default AddOns
