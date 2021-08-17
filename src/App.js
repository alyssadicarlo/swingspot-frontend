import { Route } from 'react-router-dom';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Header from './components/Header';
import TopicList from './components/TopicList';
import SearchForm from './components/SearchForm';
import Footer from './components/Footer';
import Home from './views/Home';
import Profile from './views/Profile';
import './App.css';
import { useState, useEffect } from 'react';
import AddTopicForm from './components/AddTopicForm';
import CommentList from './components/CommentList';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import CurrentUserProfile from './views/CurrentUserProfile';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {

  const token = localStorage.getItem("TOKEN");

  if (!!token) {
    store.dispatch({ type: 'ON_LOGGED_IN' });
  }

  const storedDarkMode = localStorage.getItem("DARK_MODE");

  const [darkMode, setDarkMode] = useState(storedDarkMode === "false" ? false : true);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    localStorage.setItem("DARK_MODE", darkMode);
  }, [darkMode]);


  return (
    <Provider store={store}>
      <div className={darkMode ? 'App list dark' : 'App list'} data-theme={darkMode ? 'dark' : 'light'}>
          <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>
          <main className="main">
            <Home />
            <Route exact path="/topics">
              <TopicList />
            </Route>
            <Route exact path="/topics/:slug">
              <CommentList />
            </Route>
            <Route exact path="/search">
              <SearchForm />
            </Route>
            <Route path={`/users/:username`}>
              <Profile />
            </Route>
            <Route exact path="/login">
              <LoginForm />
            </Route>
            <Route exact path="/signup">
              <SignupForm />
            </Route>
            <AuthenticatedRoute exact path="/add_topic">
              <AddTopicForm />
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path="/profile">
              <CurrentUserProfile />
            </AuthenticatedRoute>
          </main>
          <Footer />
      </div>
    </Provider>
  );
}

export default App;
