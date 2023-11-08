// css
import '../styles/components/message.scss';
// icons
import avatar from '../../src/images/avatar.svg';

function Message(props) {
  return (
    <div className='message'>
      <div className='message__info'>
        <div className={props.message.photoURL ? `message__avatar` : `message__avatar message__avatar--default`}>
          <img src={props.message.photoURL ? props.message.photoURL : avatar} />
        </div>
        <div className='message__name'>{props.message.displayName}</div>
      </div>
      <div className='nes-balloon from-left'>
        <p>{props.message.text}</p>
      </div>
    </div>
  );
}

export default Message;
