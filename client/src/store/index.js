import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducer/index';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
export default store;


// Los middleware son la forma sugerida de extender Redux con funcionalidades personalizadas. 
// Redux Thunk se usa con mayor frecuencia para comunicarse de manera asíncrona con una API externa.
// Compose is used when you want to pass multiple store enhancers to the store. 