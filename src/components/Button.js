// css
import '../styles/components/button.scss';

const Button = (props) => {
   return (
      <button className={props.icon ? `main-btn main-btn--span-ml` : `main-btn`} onClick={props.onClick}>
         {props.icon && (
            <img src={props.icon} alt='#' />
         )}
         {props.text && (
            <span>{props.text}</span>
         )}
      </button>
   );
}
 
export default Button;