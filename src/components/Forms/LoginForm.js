import { useContext, useState } from 'react';
// data
import { Context } from '../../index';
// firebase
import firebase from 'firebase/compat/app';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
// components
import Input from '../Input';
import Button from '../Button';
// css
import '../../styles/components/form.scss';
// icons
import showPasswordIcon from '../../../src/images/show-password-icon.svg';
import hidePasswordIcon from '../../../src/images/hide-password-icon.svg';
import googleIcon from '../../../src/images/google.svg';

const LoginForm = (props) => {
   const {auth} = useContext(Context)
   // email validation RegExp
   const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
   // data to send   
   const [accountEmail, setAccountEmail] = useState('')
   const [accountPassword, setAccountPassword] = useState('')
   // validation
   const [hideLoginEmailError, setLoginEmailError] = useState(true)
   const [hideLoginPasswordError, setLoginPasswordError] = useState(true)
   const [hideGlobalLoginError, setGlobalLoginError] = useState(true)
   // icons
   const [passwordIcon, setPasswordIcon] = useState(showPasswordIcon)

   const loginWithGoogle = async () => {
      const provider = new firebase.auth.GoogleAuthProvider()
      const {user} = await auth.signInWithPopup(provider)
   }

   const loginWithEmailAndPassowrd = () => {
      if (!EMAIL_REGEXP.test(accountEmail)) {
         setLoginEmailError(false)
      } else if (accountPassword.length < 6) {
         setLoginPasswordError(false)
      } else {
         const authData = getAuth()
         signInWithEmailAndPassword(auth, accountEmail, accountPassword)
         .then(() => {
            setGlobalLoginError(true)
         })
         .catch(() => {
            setGlobalLoginError(false)
         })
      }
   }

   return (
      <div className='form'>
         <Button onClick={loginWithGoogle} text='Войти через Google' icon={googleIcon} />
         <div className='form__account form__account--border-top'>
            <span>Или</span>
         </div>
         <div className="form__inputs">
            <Input placeholder='Email' type='text' value={accountEmail} onChange={e => {
               if (EMAIL_REGEXP.test(e.target.value)) setLoginEmailError(true)
               setAccountEmail(e.target.value)
            }} />
            <div className='form__error' hidden={hideLoginEmailError}>Проверьте правильность введенных данных</div>
            <Input placeholder='Пароль' type={passwordIcon ==  showPasswordIcon ? 'text' : 'password'} value={accountPassword} onChange={e => {
               setLoginPasswordError(e.target.value.length > 5)
               setAccountPassword(e.target.value)
            }} onClick={() => setPasswordIcon(passwordIcon == showPasswordIcon ? hidePasswordIcon : showPasswordIcon)} icon={passwordIcon} />
            <div className='form__error' hidden={hideLoginPasswordError}>Минимум 6 символов</div>
         </div>
         <Button onClick={loginWithEmailAndPassowrd} text='Войти' />
         <div className='form__error form__error--mt' hidden={hideGlobalLoginError}>Ошибка. Проверьте данные и повторите попытку</div>
         <div className='form__account form__account--margin-top'>
            <button onClick={props.onClick}>
               <span>Регистрация</span>   
            </button>
         </div>
      </div>
   );
}
 
export default LoginForm;