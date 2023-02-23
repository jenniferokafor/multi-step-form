import checked from '../../../assets/checked.svg'
import unchecked from '../../../assets/unchecked.svg'

const AddOns = ({ inputs, setInputs }) => {
    const handleChange = index => {
        const newAddOns = [...inputs.addOns]
        newAddOns[index].checked = !newAddOns[index].checked
        setInputs({ ...inputs, addOns: newAddOns })
    }
    return (
        <div className="add-ons-wrapper">
            {inputs?.addOns?.map((item, i) => (
                <div
                    key={i}
                    className="add-on"
                    style={
                        item.checked === true
                            ? {
                                  border: '1px solid #483EFF',
                                  background: '#F8F9FF',
                              }
                            : {}
                    }
                >
                    <label htmlFor={`custom-checkbox-${i}`}>
                        <input
                            type="checkbox"
                            id={`custom-checkbox-${i}`}
                            name={item.title}
                            value={item.title}
                            checked={item.checked[i]}
                            onChange={() => handleChange(i)}
                        />
                        <img
                            src={item.checked === true ? checked : unchecked}
                            alt={
                                item.checked === true
                                    ? 'checked icon'
                                    : 'unchecked icon'
                            }
                            className="add-on-label-img"
                        />
                        <span className="add-on-label-span">
                            {item.title}
                            <br />
                            <span>{item.description}</span>
                        </span>

                        <p>
                            +&#x24;
                            {inputs.billingCycle === 'Monthly'
                                ? `${item.monthlyPrice}`
                                : `${item.yearlyPrice}`}
                            /{inputs.billingCycle === 'Monthly' ? 'mo' : 'yr'}
                        </p>
                    </label>
                </div>
            ))}
        </div>
    )
}
export default AddOns
