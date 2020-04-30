
import { EmailStatus } from './EmailStatus.jsx';
import { eventBus } from '../../services/eventBusService.js';
const { Link } = ReactRouterDOM;



export class EmailNavBarSide extends  React.Component {

    changeUrl = (value) => {
        this.props.history.push(`/${'email'}/${value}`)
        eventBus.emit('url-change', '')
    }

    addParam = (label, value) => {
       const {pathname} =  this.props.history.location
       
       this.props.history.push(`${pathname}?${label}=${value}`)
       eventBus.emit('url-change', '')
    }

    render() {

        const {changeUrl,addParam} = this;
        const {emails} = this.props;

        return (
            <div className="side-nav flex column"> 

                {/* <Link to="/outbox">outbox</Link> */}
                <div className="compose" onClick={ () => {addParam('compose' ,'newMessage')}}> <img className="icon" src="./assets/img/icons/plus.png" alt="plus"/> Compose</div>
                <div className="filter inbox" onClick={ () => {changeUrl('inbox')}}>Inbox</div>
                <div className="filter outbox" onClick={ () => {changeUrl('outbox')}}>Outbox</div>
                <div className="filter sarred" onClick={ () => {changeUrl('star')}}>Satred</div>
                <div className="filter important" onClick={ () => {changeUrl('important')}}>Important</div>
                <div className="filter draft" onClick={ () => {changeUrl('draft')}}>Draft</div>
                <div className="filter trash" onClick={ () => {changeUrl('trash')}}>Trash</div>
                <EmailStatus emails={emails}/>
            </div>
        )
    }
}