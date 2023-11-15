import { useContext, useState } from 'react';
// data
import { Context } from '../index';
// firebase
import firebase from 'firebase/compat/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
// components
import Logo from './Logo';
import Button from './Button';
import Input from './Input';
// css
import '../styles/components/login.scss';
// icons
import smileIcon from '../../src/images/smile.svg';
import showPasswordIcon from '../../src/images/show-password-icon.svg';
import hidePasswordIcon from '../../src/images/hide-password-icon.svg';
import googleIcon from '../../src/images/google.svg';

const Login = () => {
   const {auth} = useContext(Context)
   // screen picker
   const [screen, setScreen] = useState('registration')
   // icons data
   const [passwordIcon, setPasswordIcon] = useState(showPasswordIcon)
   // reg data to send
   const [regName, setRegName] = useState('')
   const [regEmail, setRegEmail] = useState('')
   const [regPassword, setRegPassword] = useState('')
   // reg validation
   const [hideRegNameError, setRegNameError] = useState(true)
   const [hideRegEmailError, setRegEmailError] = useState(true)
   const [hideRegPasswordError, setRegPasswordError] = useState(true)
   const [hideGlobalRegError, setGlobalRegError] = useState(true)
   // email validation RegExp
   const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
   // account data to send
   const [accountEmail, setAccountEmail] = useState('')
   const [accountPassword, setAccountPassword] = useState('')
   // login validation
   const [hideLoginEmailError, setLoginEmailError] = useState(true)
   const [hideLoginPasswordError, setLoginPasswordError] = useState(true)
   const [hideGlobalLoginError, setGlobalLoginError] = useState(true)

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
      <div className='chat-container'>
         <div className="login">
            <div className="login__container">
               <div className="login__inner">
                  <Logo color='#fff' />
                  {screen == 'registration' ? (
                     <div className='login__form'>
                        <h2>Регистрация</h2>
                        <div className="login__inputs">
                           <Input placeholder='Ник' type='text' value={regName} onChange={e => {
                              setRegNameError(e.target.value)
                              setRegName(e.target.value)
                           }} />
                           <div className='login__error' hidden={hideRegNameError}>Поле не может быть пустым</div>
                           <Input placeholder='Email' type='text' value={regEmail} onChange={e => {
                              if (EMAIL_REGEXP.test(e.target.value)) setRegEmailError(true)
                              setRegEmail(e.target.value)
                           }} />
                           <div className='login__error' hidden={hideRegEmailError}>Проверьте правильность введенных данных</div>
                           <Input placeholder='Пароль' type={passwordIcon ==  showPasswordIcon ? 'text' : 'password'} value={regPassword} onChange={e => {
                              setRegPasswordError(e.target.value.length > 5)
                              setRegPassword(e.target.value)
                           }} onClick={() => setPasswordIcon(passwordIcon == showPasswordIcon ? hidePasswordIcon : showPasswordIcon)} icon={passwordIcon} />
                           <div className='login__error' hidden={hideRegPasswordError}>Минимум 6 символов</div>
                        </div>
                        <Button onClick={registration} text='Зарегистрироваться' />
                        <div className='login__error login__error--mt' hidden={hideGlobalRegError}>Ошибка. Проверьте данные и повторите попытку</div>
                        <div className='login__account login__account--border-bottom'>
                           <button onClick={() => setScreen('account')}>
                              <span>У меня есть аккаунт</span>   
                              <img src={smileIcon} />
                           </button>
                        </div>
                        <Button onClick={loginWithGoogle} text='Войти через Google' icon={googleIcon} />
                     </div>
                  ) : (
                     <div className='login__form'>
                        <Button onClick={loginWithGoogle} text='Войти через Google' icon={googleIcon} />
                        <div className='login__account login__account--border-top'>
                           <span>Или</span>
                        </div>
                        <div className="login__inputs">
                           <Input placeholder='Email' type='text' value={accountEmail} onChange={e => {
                              if (EMAIL_REGEXP.test(e.target.value)) setLoginEmailError(true)
                              setAccountEmail(e.target.value)
                           }} />
                           <div className='login__error' hidden={hideLoginEmailError}>Проверьте правильность введенных данных</div>
                           <Input placeholder='Пароль' type={passwordIcon ==  showPasswordIcon ? 'text' : 'password'} value={accountPassword} onChange={e => {
                              setLoginPasswordError(e.target.value.length > 5)
                              setAccountPassword(e.target.value)
                           }} onClick={() => setPasswordIcon(passwordIcon == showPasswordIcon ? hidePasswordIcon : showPasswordIcon)} icon={passwordIcon} />
                           <div className='login__error' hidden={hideLoginPasswordError}>Минимум 6 символов</div>
                        </div>
                        <Button onClick={loginWithEmailAndPassowrd} text='Войти' />
                        <div className='login__error login__error--mt' hidden={hideGlobalLoginError}>Ошибка. Проверьте данные и повторите попытку</div>
                        <div className='login__account login__account--margin-top'>
                           <button onClick={() => setScreen('registration')}>
                              <span>Регистрация</span>   
                           </button>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
export default Login;
