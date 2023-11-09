import { useContext, useState } from 'react';
// data
import { Context } from '../index';
// firebase
import firebase from 'firebase/compat/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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
   // account data to send
   const [accountEmail, setAccountEmail] = useState('')
   const [accountPassword, setAccountPassword] = useState('')

   const loginWithGoogle = async () => {
      const provider = new firebase.auth.GoogleAuthProvider()
      console.log(provider, 'provider')
      const {user} = await auth.signInWithPopup(provider)
   }

   const registration = () => {
      const authData = getAuth()

      createUserWithEmailAndPassword(authData, regEmail, regPassword)
      .then((e) => {

      })
      .catch(e => {

      })
   }
  
   const loginWithEmailAndPassowrd = () => {
      const authData = getAuth()
      signInWithEmailAndPassword(auth, accountEmail, accountPassword)
      .then(e => {
         console.log(e, 'e')
      })
      .catch(e => {
         console.log(e, 'e')
      })
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
                           <Input placeholder='Ник' type='text' value={regName} onChange={e => setRegName(e.target.value)} />
                           <Input placeholder='Email' type='text' value={regEmail} onChange={e => setRegEmail(e.target.value)} />
                           <Input placeholder='Пароль' type={passwordIcon ==  showPasswordIcon ? 'text' : 'password'} value={regPassword} onChange={e => setRegPassword(e.target.value)} onClick={() => setPasswordIcon(passwordIcon == showPasswordIcon ? hidePasswordIcon : showPasswordIcon)} icon={passwordIcon} />
                        </div>
                        <Button onClick={registration} text='Зарегистрироваться' />
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
                           <Input placeholder='Email' type='text' value={accountEmail} onChange={e => setAccountEmail(e.target.value)} />
                           <Input placeholder='Пароль' type={passwordIcon ==  showPasswordIcon ? 'text' : 'password'} value={accountPassword} onChange={e => setAccountPassword(e.target.value)} onClick={() => setPasswordIcon(passwordIcon == showPasswordIcon ? hidePasswordIcon : showPasswordIcon)} icon={passwordIcon} />
                        </div>
                        <Button onClick={loginWithEmailAndPassowrd} text='Войти' />
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
