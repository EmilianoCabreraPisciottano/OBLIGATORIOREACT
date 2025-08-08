import './App.css';
import './bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Login from './componentes/Login';
import Registro from './componentes/Registro';
import Clima from './componentes/Clima';
import Menu from './componentes/Menu';
import Dashboard from './componentes/Dashboard';
import ListaEvaluaciones from './componentes/ListaEvaluaciones';
import { BrowserRouter, Routes, Route } from 'react-router';

const App = () => {

  return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/registrar' element={<Registro/>}/>
              <Route path='/menu' element={<Menu/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/agregarevaluacion' element={<agregarEvaluacion/>}/>
              <Route path='/clima' element={<Clima/>}/>
              <Route path='/evaluaciones' element={<ListaEvaluaciones/>}/>
          </Routes>
        </BrowserRouter>

      </Provider>
  );
}

export default App;
