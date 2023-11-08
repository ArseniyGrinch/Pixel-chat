// css
import '../styles/components/header.scss';
// components
import Logo from './Logo';

const Header = () => {
  return (
    <header className='header'>
      <Logo color="#1C0B26" />
    </header>
  );
}

export default Header;
