import { useState, useEffect } from 'react'
import './styles.scss'

const Finishing = ({ inputs, changePlan }) => {
    const [checkedAddOns, setCheckedAddOns] = useState([])
    const [costs, setCosts] = useState({ planCost: 0, addOnsCost: 0, total: 0 })

    useEffect(() => {
        setCheckedAddOns(inputs?.addOns.filter(addOn => addOn.checked === true))
        //get plan cost
        const planCost =
            inputs?.billingCycle === 'Monthly'
                ? inputs?.plan?.monthlyPrice
                : inputs?.plan?.yearlyPrice
        //get add ons cost
        let totalAddOns = 0
        for (let i = 0; i < inputs?.addOns.length; i++) {
            if (inputs?.addOns[i].checked) {
                if (inputs?.billingCycle === 'Monthly') {
                    totalAddOns += inputs?.addOns[i].monthlyPrice
                } else if (inputs?.billingCycle === 'Yearly') {
                    totalAddOns += inputs?.addOns[i].yearlyPrice
                }
            }
        }
        //get total cost
        const total = planCost + totalAddOns
        setCosts({ planCost, addOnsCost: totalAddOns, total })
    }, [inputs])
    return (
        <div>
            <div className="finishing-wrapper">
                <div className="finishing-plan-details">
                    <span className="finishing-plan">
                        {inputs.plan.title}({inputs.billingCycle})
                        <span onClick={changePlan}>
                            <br />
                            Change
                        </span>
                    </span>
                    <p className="finishing-plan-total">
                        &#x24;
                        {costs.planCost}/
                        {inputs.billingCycle === 'Monthly' ? 'mo' : 'yr'}
                    </p>
                </div>

                {checkedAddOns?.length !== 0 && (
                    <div className="finishing-plan-line"></div>
                )}

                {checkedAddOns?.map((addOn, i) => (
                    <div key={i} className="finishing-add-on">
                        <p>{addOn.title}</p>
                        <span>
                            +&#x24;
                            {inputs.billingCycle === 'Monthly'
                                ? addOn.monthlyPrice
                                : addOn.yearlyPrice}
                            /{inputs.billingCycle === 'Monthly' ? 'mo' : 'yr'}
                        </span>
                    </div>
                ))}
            </div>

            <div className="finishing-overall-total">
                <p>Total (per year)</p>
                <span>
                    &#x24;{costs.total}/
                    {inputs.billingCycle === 'Monthly' ? 'mo' : 'yr'}
                </span>
            </div>
        </div>
    )
}
export default Finishing
