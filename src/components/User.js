// css
import '../styles/components/user.scss';
// icons
import avatar from '../../src/images/avatar.svg';

function User(props) {
  return (
    <div className='user'>
      <div className='user__avatar'>
        <img src={props.user.photoURL ? props.user.photoURL : avatar} />
      </div>
      <div className='user__name'>{props.user.displayName}</div>
    </div>
  );
}

export default User;
