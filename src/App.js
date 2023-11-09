import { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
// components
import AppRouter from './components/AppRouter';
import Header from './components/Header';
import Loader from './components/Loader';
// firebase
import { Context } from './index';
import { useAuthState } from 'react-firebase-hooks/auth'

function App() {
  const {auth} = useContext(Context)
  const [user, loading, error] = useAuthState(auth)

  if (loading) {
    return <Loader />
  }

  return (
    <BrowserRouter>
      {user && (
        <Header/>
      )}
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
