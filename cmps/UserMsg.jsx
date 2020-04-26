import {eventBus} from '../services/eventBusService.js'


export class UserMsg extends React.Component {
    state = {msg: null}
    
    componentDidMount() {
        this.unsubscribeFromEventBus = eventBus.on('show-msg', (msg)=>{
            console.log('OK, on it!', msg.txt);
            const delay = 2000;
            this.setState({msg})
            setTimeout(()=>{
                this.setState({msg: null})
            }, delay)
        })
    }
    componentWillUnmount() {
        // Note: for demo purpose, 
        // this will never happen, as the UserMsg is always there
        this.unsubscribeFromEventBus();
    }
    render() {
        const {msg} = this.state
        return (!msg)? '' : <section className="user-msg">
            <button onClick={()=>{
                this.setState({msg: null})
            }}>x</button>
            {msg.txt}
        </section>
    }
}