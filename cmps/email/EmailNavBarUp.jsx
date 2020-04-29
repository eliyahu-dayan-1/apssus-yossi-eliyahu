export class EmailNavBarUp extends React.Component {


    iconLink = (iconName) => {
        return <img className="icon" src={`./assets/img/icons/${iconName}`} alt={iconName} />
    }


    render() {
        const email = true;
        const { iconLink } = this

        return (
            <div className="navbar-up flex space-between">
                <div className="icon selectAll">{(email.isMark) ? iconLink("check-box-full.png") : iconLink("check-box-empty.png")}</div>
                <div className="arrow flex">
                    <div className="icon back">{iconLink("back.png")}</div>
                    <div className="icon next">{iconLink("next.png")}</div>
                </div>
            </div>
        )
    }
}