const { Link } = ReactRouterDOM


export function EmailPreview(props) {
    const { email, onSelectEmail } = props

    function iconLink(iconName) {
        return <img src={`../../assets/img/icons/${iconName}`} alt="iconName" />
    }

    

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

    return (
        <Link className="email-preview further-details flex space-between" onClick={() => onSelectEmail(email.id)} >
            <div className="icon choose">{(email.isMark) ? iconLink("check-box-full.png") : iconLink("check-box-empty.png")}</div>
            <div className="icon choose">{(email.isReaded) ? iconLink("message-full.png") : iconLink("message-empty.png")}</div>
            <div className="icon star">{(email.isStared) ? iconLink("star-full.png") : iconLink("star-empty.png")}</div>
            <div className="icon bookmark">{(email.isImportant) ? iconLink("bookmark-full.png") : iconLink("bookmark-empty.png")}</div>
            <div className="from">{email.from}</div>
            <div className="subject">{email.subject}</div>
            <div className="body">{email.body}</div>
            <div className="date">{convertTimeStamp()}</div>
        </Link>
    )

}