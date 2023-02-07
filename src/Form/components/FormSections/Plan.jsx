import { planData } from '../../data'
import './styles.scss'
import { Switch } from 'antd'

const Plan = ({ inputs, setInputs }) => {
    const onChange = () => {
        if (inputs.billingCycle === 'Monthly') {
            setInputs({ ...inputs, billingCycle: 'Yearly' })
        } else {
            setInputs({ ...inputs, billingCycle: 'Monthly' })
        }
    }

    const planClick = item => {
        setInputs({ ...inputs, plan: item.title })
    }
    return (
        <>
            <div className="plans-wrapper">
                {planData.map((plan, i) => (
                    <div
                        key={i}
                        className="plan"
                        onClick={() => planClick(plan)}
                        style={
                            inputs.plan === plan.title
                                ? {
                                      backgroundColor: '#F8F9FF',
                                      border: '1px solid #483EFF',
                                      borderRadius: '8px',
                                  }
                                : {}
                        }
                    >
                        <img src={plan?.icon} alt="icon" />
                        <h3>{plan?.title}</h3>
                        <p>
                            &#x24;
                            {inputs.billingCycle === 'Monthly'
                                ? plan?.monthlyPrice
                                : plan?.yearlyPrice}
                            /{inputs.billingCycle === 'Monthly' ? 'mo' : 'yr'}
                        </p>
                        {inputs.billingCycle === 'Monthly' ? (
                            <></>
                        ) : (
                            <span>2 months free</span>
                        )}
                    </div>
                ))}
            </div>
            <div className="toggle-wrapper">
                <div className="toggle-content">
                    <p
                        style={{
                            color:
                                inputs.billingCycle === 'Monthly'
                                    ? '#022959'
                                    : '#9699AA',
                        }}
                    >
                        Monthly
                    </p>
                    <Switch defaultChecked onChange={onChange} />
                    <p
                        style={{
                            color:
                                inputs.billingCycle === 'Yearly'
                                    ? '#022959'
                                    : '#9699AA',
                        }}
                    >
                        Yearly
                    </p>
                </div>
            </div>
        </>
    )
}
export default Plan
