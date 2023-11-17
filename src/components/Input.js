// css
import '../styles/components/input.scss';

const Input = (props) => {
   return (
      <div className={props.placeholder === 'Пароль' ? 'main-input main-input--password' : 'main-input'}>
         <div className='main-input__inner'>
            <input placeholder={props.placeholder} type={props.type} value={props.name} onChange={props.onChange} />
            {props.placeholder === 'Пароль' && (
               <button onClick={props.onClick}>
                  <img src={props.icon} alt='#' />
               </button>
            )}
         </div>
      </div>
   );
}
 
export default Input;