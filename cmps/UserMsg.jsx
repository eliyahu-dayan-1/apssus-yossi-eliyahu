import { eventBus } from '../services/eventBusService.js';

export default class UserMsg extends React.Component {
    state = {
      msg: '',
      type: '',
    }

    componentDidMount() {
      this.unsubscribeFromEventBus = eventBus.on('show-msg', (msg) => {
        // console.log('OK, on it!', msg.txt);
        const delay = 3000;
        this.setState({ msg });
        setTimeout(() => {
          this.setState({ msg: null });
        }, delay);
      });
    }

    componentWillUnmount() {
      // Note: for demo purpose,
      // this will never happen, as the UserMsg is always there
      this.unsubscribeFromEventBus();
    }

    render() {
      const { msg } = this.state;
      if (msg) {
        const { txt, type } = msg;
        const classColor = type === 'success' ? 'green' : 'red';
        return (
          <section className={ `user-msg ${classColor}` }>
              <button onClick={ () => {
                  this.setState({ msg: null });
              } }>x</button>
              {txt}
          </section>
        );
      }
      return '';
    }
}
