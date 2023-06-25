import React from 'react';
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux';

//components
import HomePage from './pages/home/index'
import LoginPage from './pages/login/index'
import AdminPage from './pages/admin/index'

//store
import store from './store/AuthStore'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route pathe='' />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/admin/dashboard' element={<AdminPage />} />
          {/* <Route path='*' element={<HomePage />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
