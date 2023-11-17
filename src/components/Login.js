import { useState } from 'react';
// components
import Logo from './Logo';
import RegistrationForm from './Forms/RegistrationForm';
import LoginForm from './Forms/LoginForm';
// css
import '../styles/components/login.scss';

const Login = () => {
   // screen picker
   const [screen, setScreen] = useState('registration')

   return (
      <div className='chat-container chat-container--login'>
         <div className="login">
            <div className="login__container">
               <div className="login__inner">
                  <Logo color='#fff' />
                  {screen == 'registration' ? (
                     <RegistrationForm onClick={() => setScreen('account')} />
                  ) : (
                     <LoginForm onClick={() => setScreen('registration')} />
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
export default Login;
