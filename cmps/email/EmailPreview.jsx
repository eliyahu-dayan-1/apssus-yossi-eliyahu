import { Loading } from "../Loading.jsx"
import { LongText } from "../LongText.jsx"

const { Link } = ReactRouterDOM

export class EmailPreview extends React.Component {

    state = {
        email: null
    }

    componentDidMount(){
        this.setState({email: this.props.email})
    }

    iconLink = (iconName) => {
        return <img src={`../../assets/img/icons/${iconName}`} alt="iconName" />
    }

    convertTimeStamp = () => {
        var date = new Date(this.state.email.sentAt);

        var day = date.getDate()
        var Month = date.getMonth() + 1
        var year = date.getFullYear()

        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var clock = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        return `${day}/${Month}/${year} ${clock}`
    }

    render() {

        const { email } = this.state;
        const { onSelectEmail } = this.props;
        const {iconLink, convertTimeStamp} = this;

        if(!email) return < Loading/>

        return (
            <Link className="email-preview further-details flex space-between" onClick={() => onSelectEmail(email.id)} >
                <div className="option flex">
                    <div className="icon choose">{(email.isChoose) ? iconLink("check-box-full.png") : iconLink("check-box-empty.png")}</div>
                    <div className="icon trash "> {iconLink("trash.png")}</div>
                    <div className="icon choose">{(email.isReaded) ? iconLink("message-full.png") : iconLink("message-empty.png")}</div>
                    <div className="icon star">{(email.isStared) ? iconLink("star-full.png") : iconLink("star-empty.png")}</div>
                    <div className="icon bookmark">{(email.isImportant) ? iconLink("bookmark-full.png") : iconLink("bookmark-empty.png")}</div>
                </div>
                <div className="from">{email.to}</div>
                <div className="subject">{email.subject}</div>
                <LongText className={'body'} howMuchLong={80} text={email.body}/>
                <div className="date">{convertTimeStamp()}</div>
            </Link>
        )
    }
}

