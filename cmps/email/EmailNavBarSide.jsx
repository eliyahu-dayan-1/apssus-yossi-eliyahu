import { EmailStatus } from './EmailStatus.jsx';


export class EmailNavBarSide extends  React.Component {

    render() {
        return (
            <div className="side-nav flex column"> 
                <div className="compose"> + Compose</div>
                <div className="filter inbox">inbox</div>
                <div className="filter sarred">Sarred</div>
                <div className="filter snoozed">Snoozed</div>
                <div className="filter important">Important</div>
                <EmailStatus />
            </div>
        )
    }
}