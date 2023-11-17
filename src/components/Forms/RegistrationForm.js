import { useContext, useState } from 'react';
// data
import { Context } from '../../index';
// firebase
import firebase from 'firebase/compat/app';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
// components
import Input from '../Input';
import Button from '../Button';
// css
import '../../styles/components/form.scss';
// icons
import smileIcon from '../../../src/images/smile.svg';
import showPasswordIcon from '../../../src/images/show-password-icon.svg';
import hidePasswordIcon from '../../../src/images/hide-password-icon.svg';
import googleIcon from '../../../src/images/google.svg';

const RegistrationForm = (props) => {
   const {auth} = useContext(Context)
   // email validation RegExp
   const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
   // data to send
   const [regName, setRegName] = useState('')
   const [regEmail, setRegEmail] = useState('')
   const [regPassword, setRegPassword] = useState('')
   // validation
   const [hideRegNameError, setRegNameError] = useState(true)
   const [hideRegEmailError, setRegEmailError] = useState(true)
   const [hideRegPasswordError, setRegPasswordError] = useState(true)
   const [hideGlobalRegError, setGlobalRegError] = useState(true)
   // icons
   const [passwordIcon, setPasswordIcon] = useState(showPasswordIcon)

   const loginWithGoogle = async () => {
      const provider = new firebase.auth.GoogleAuthProvider()
      const {user} = await auth.signInWithPopup(provider)
   }

   const registration = () => {
      if (!regName) {
         setRegNameError(false)
      } else if (!EMAIL_REGEXP.test(regEmail)) {
         setRegEmailError(false)
      } else if (regPassword.length < 6) {
         setRegPasswordError(false)
      } else {
         const authData = getAuth()

         createUserWithEmailAndPassword(authData, regEmail, regPassword)
         .then((userCredential) => {
            updateProfile(userCredential.user, {
               displayName: regName
            })
            setGlobalRegError(true)
          })
         .catch(() => {
            setGlobalRegError(false)
         })
      }
   }

   return (
      <div className='form'>
         <h2>Регистрация</h2>
         <div className="form__inputs">
            <Input placeholder='Ник' type='text' value={regName} onChange={e => {
               setRegNameError(e.target.value)
               setRegName(e.target.value)
            }} />
            <div className='form__error' hidden={hideRegNameError}>Поле не может быть пустым</div>
            <Input placeholder='Email' type='text' value={regEmail} onChange={e => {
               if (EMAIL_REGEXP.test(e.target.value)) setRegEmailError(true)
               setRegEmail(e.target.value)
            }} />
            <div className='form__error' hidden={hideRegEmailError}>Проверьте правильность введенных данных</div>
            <Input placeholder='Пароль' type={passwordIcon ===  showPasswordIcon ? 'text' : 'password'} value={regPassword} onChange={e => {
               setRegPasswordError(e.target.value.length > 5)
               setRegPassword(e.target.value)
            }} onClick={() => setPasswordIcon(passwordIcon === showPasswordIcon ? hidePasswordIcon : showPasswordIcon)} icon={passwordIcon} />
            <div className='form__error' hidden={hideRegPasswordError}>Минимум 6 символов</div>
         </div>
         <Button onClick={registration} text='Зарегистрироваться' />
         <div className='form__error form__error--mt' hidden={hideGlobalRegError}>Ошибка. Проверьте данные и повторите попытку</div>
         <div className='form__account form__account--border-bottom'>
            <button onClick={props.onClick}>
               <span>У меня есть аккаунт</span>   
               <img src={smileIcon} alt='#' />
            </button>
         </div>
         <Button onClick={loginWithGoogle} text='Войти через Google' icon={googleIcon} />
      </div>
   );
}
 
export default RegistrationForm;