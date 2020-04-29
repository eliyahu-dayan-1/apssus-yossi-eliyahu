export class NewEmail extends React.Component {
    state = {
        email: {
            to: "",
            subject: "",
            body: "",
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? parseInt(target.value) : target.value

        this.setState(prevState => ({ email: { ...prevState.filter, [field]: value } }))
    }

    onExit = () => {
        
    }

    onSend = () => {

    }

    render() {

        const { to, subject, body } = this.state.email
        const { onExit, onSend } = this

        return (

            <div className="new-email flex column">
                <div className="message-header flex space-between">
                    <div>new-message</div>
                    <div className="exit" onClick={() => onExit()}>✖️</div>
                </div>
                <form className="message-body flex column grow-1" onSubmit={this.onSend}>
                        <div className="to">to: <input type="email" name='to' value={to} onChange={this.handleChange} /> </div>

                        <div className="subject">subject: <input type="text" name='subject' value={subject} onChange={this.handleChange} /></div>

                        <div className="body grow-1">body: 
                        <textarea type="text" name='body' value={body} onChange={this.handleChange} ></textarea>
                        </div>
                        
                </form>
                <div className="message-footer">
                    <div className="send" onClick={() => onSend()}><img className="icon" src="../../assets/img/icons/send.png" alt="send" /></div>
                </div>
            </div>
        )
    }
}