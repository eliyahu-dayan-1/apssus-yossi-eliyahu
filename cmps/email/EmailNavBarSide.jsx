
import { EmailStatus } from './EmailStatus.jsx';
import { eventBus } from '../../services/eventBusService.js';


export class EmailNavBarSide extends  React.Component {

    changeUrl = (value) => {
        this.props.history.push(`/${value}`)
        eventBus.emit('url-change', '')
    }

    addParam = (label, value) => {
       const {pathname} =  this.props.history.location
       console.log(this.props.history.location);
       
       this.props.history.push(`${pathname}?${label}=${value}`)
       eventBus.emit('url-change', '')
    }

    render() {

        const {changeUrl,addParam} = this;

        return (
            <div className="side-nav flex column"> 
                <div className="compose" onClick={ () => {addParam('compose' ,'newMessage')}}> + Compose</div>
                <div className="filter inbox" onClick={ () => {changeUrl('inbox')}}>inbox</div>
                <div className="filter outbox" onClick={ () => {changeUrl('outbox')}}>outbox</div>
                <div className="filter sarred" onClick={ () => {changeUrl('starred')}}>Satared</div>
                <div className="filter important" onClick={ () => {changeUrl('important')}}>Important</div>
                <div className="filter unread" onClick={ () => {changeUrl('unread')}}>Unread</div>
                <EmailStatus />
            </div>
        )
    }
}