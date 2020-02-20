// const initialState = {
//   customers: [
//     {
//       name: 'John Doe',
//       phone: '123456',
//       address: 'dfdsfdsf',
//       membership: 'Platinum',
//       id: 1
//     }
//   ],
//   loading: false,
//   loaded: true
// };

// export function customerReducer(state = initialState, action) {
//   switch (action.type) {
//     case 'LOAD_CUSTOMER': {
//       return {
//         ...state,
//         loading: true,
//         loaded: false
//       };
//     }
//     default: {
//       return state;
//     }
//   }

// }

import * as customerActions from './customer.actions';
import * as fromRoot from '../../state/app-state';
import { Customer} from '../customer.model';
import { createFeatureSelector, createSelector, State} from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';


// export interface CustomerState {
//   customers: Customer[];
//   loading: boolean;
//   loaded: boolean;
//   error: string;
// }

export interface CustomerState extends EntityState<Customer> {
  selectedCustomerId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  customers: CustomerState;
}

export const customerAdapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();
export const defaultCustomer: CustomerState ={
  ids: [],
  entities: {},
  selectedCustomerId: null,
  loaded: false,
  loading: false,
  error: ''
}

// export const initialState: CustomerState = {
//   customers: [
//     {
//       name: 'John Doe',
//       phone: '123456',
//       address: 'dfdsfdsf',
//       membership: 'Platinum',
//       id: 1
//     }
//   ],
//   loading: false,
//   loaded: true,
//   error: ''
// };

export const initialState = customerAdapter.getInitialState(defaultCustomer);

export function customerReducer(
  state = initialState,
  action: customerActions.action): CustomerState {
   switch (action.type) {
    //  case customerActions.CustomerActionTypes.LOAD_CUSTOMERS: {
    //    return {
    //      ...state,
    //      loading: true
    //    };
    //  }

     case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS: {
      // return {
      //   ...state,
      //   loading: false,
      //   loaded: true,
      //   customers: action.payload
      // };
      return customerAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_FAIL: {
      // return {
      //   ...state,
      //   customers: [],
      //   loading: false,
      //   loaded: false,
      //   error: action.payload
      // };
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    case customerActions.CustomerActionTypes.LOAD_CUSTOMER_SUCCESS: {
     return customerAdapter.addOne(action.payload, {
       ...state,
       selectedCustomerId: action.payload.id,
     });
   }

   case customerActions.CustomerActionTypes.LOAD_CUSTOMER_FAIL: {
     return {
       ...state,
       error: action.payload
     };
   }

   case customerActions.CustomerActionTypes.CREATE_CUSTOMER_SUCCESS: {
    return customerAdapter.addOne(action.payload, state);
  }

  case customerActions.CustomerActionTypes.CREATE_CUSTOMER_FAIL: {
    return {
      ...state,
      error: action.payload
    };
  }

  case customerActions.CustomerActionTypes.UPDATE_CUSTOMER_SUCCESS: {
    console.log(action.payload);
    return customerAdapter.updateOne(action.payload, state);
  }

  case customerActions.CustomerActionTypes.UPDATE_CUSTOMER_FAIL: {
    return {
      ...state,
      error: action.payload
    };
  }

  case customerActions.CustomerActionTypes.DELETE_CUSTOMER_SUCCESS: {
    return customerAdapter.removeOne(action.payload, state);
  }

  case customerActions.CustomerActionTypes.DELETE_CUSTOMER_FAIL: {
    return {
      ...state,
      error: action.payload
    };
  }

    default: {
      return state;
    }
   }
}

const getCustomerFeatureState = createFeatureSelector<CustomerState>('customers');
export const getCustomers = createSelector(
  getCustomerFeatureState,
  // (state: CustomerState) => state.customers
  customerAdapter.getSelectors().selectAll
);

export const getCustomersLoading = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.loading
);

export const getCustomersLoaded = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.loaded
);

export const getError = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.error
);

export const getCurrentCustomerId = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.selectedCustomerId
);

export const getCurrentCustomer = createSelector(
  getCustomerFeatureState,
  getCurrentCustomerId,
  state => state.entities[state.selectedCustomerId]
);
