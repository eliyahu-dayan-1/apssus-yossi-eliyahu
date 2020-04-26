const { Link } = ReactRouterDOM

export function EmailPreview(props) {
    const { email } = props

    function convertTimeStamp() {
        var date = new Date(email.sentAt);

        var day = date.getDate()

        var Month = date.getMonth() + 1

        var year = date.getFullYear()
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var clock = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        return `${day}/${Month}/${year} ${clock}`
    }
    console.log(email)

    return (<Link className="email-preview further-details flex space-between" to={`/email/${email.id}`} >
        <div className="choose"></div>
        <div className="star">*</div>
        <div className="bookmark">^</div>
        <div className="from"></div>
        <div className="subject">{email.subject}</div>
        <div className="body">{email.body}</div>}
        <div className="date">{convertTimeStamp()}</div>
    </Link>)
}