
// css
import '../styles/components/header.scss';
// components
import Logo from './Logo';
import SignOut from './SignOut';

const Header = () => {
  return (
    <header className='header'>
      <Logo color="#1C0B26" />
      <SignOut text='Выйти' />
    </header>
  );
}

export default Header;
