// icons
import logo from '../../src/images/logo.svg';
// css
import '../styles/components/logo.scss';

const Logo = (props) => {
  return (
    <div className='logo'>
      <img src={logo} alt="#"/>
      <h1 style={{color: props.color}}>Pixel.Chat</h1>
    </div>
  );
 }
 
 export default Logo;