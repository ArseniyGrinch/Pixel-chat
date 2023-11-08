// css
import '../styles/components/button.scss';

const Button = (props) => {
   return (
      <button className='main-btn' onClick={props.onClick}>
         {props.icon && (
            <img src={props.icon} />
         )}
         {props.text && (
            <span>{props.text}</span>
         )}
      </button>
   );
}
 
export default Button;