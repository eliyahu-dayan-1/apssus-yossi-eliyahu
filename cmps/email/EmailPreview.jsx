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

        return `${day}/ ${day} Month/ ${day}year + " " + clock`
    }

    return (<Link className="email-preview further-details flex" to={`/email/${email.id}`} >
        <div className="readBox"></div>
        <div className="star"></div>
        <div className="bookmark"></div>
        <p><span>subject:</span> {email.subject}</p>
        <p><span>body:</span> {email.body}</p>
        <div className="date">{convertTimeStamp()}</div>
    </Link>)
}