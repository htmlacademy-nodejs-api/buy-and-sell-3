import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import UserProvider from './context/userProvider';
import App from './components/app/app';
import {store} from './store';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  checkAuthAction,
  fetchCategoriesAction,
  fetchTicketsAction
} from './store/api-actions';

store.dispatch(checkAuthAction());
store.dispatch(fetchCategoriesAction());
store.dispatch(fetchTicketsAction());

const container = document.getElementById('root');

const root = createRoot(container as Element);

root.render(
  <Provider store={store}>
    <UserProvider>
      <ToastContainer />
      <App />
    </UserProvider>
  </Provider>,
);
