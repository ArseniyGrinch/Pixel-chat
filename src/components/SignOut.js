import { useContext } from "react";
// data
import { Context } from '../index';
// css
import '../styles/components/out.scss';

const SignOut = (props) => {
   const {auth} = useContext(Context)

   const signOut = () => {
      auth.signOut()
   }

   return (
      <div className="sign-out">
         <button onClick={signOut}>
            {props.text && (
               <span>{props.text}</span>
            )}
            {props.icon && (
               <img src={props.icon} />
            )}
         </button>
      </div>
   )
}

export default SignOut;