import check from '../../../assets/Check.svg'
import './styles.scss'

const Success = () => {
    return (
        <div className="success-wrapper">
            <img src={check} alt="checked" />
            <h3>Thank you!</h3>
            <p>
                Thanks for confirming your subscription! We hope you have fun
                using our platform. If you ever need support, please feel free
                to email us at support@loremgaming.com.
            </p>
        </div>
    )
}

export default Success
