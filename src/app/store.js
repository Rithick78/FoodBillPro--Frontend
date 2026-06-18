import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import productReducer from '../features/products/productSlice'
import billingReducer from '../features/billing/billingSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    billing: billingReducer,
  },
})

export default store