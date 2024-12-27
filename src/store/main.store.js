import { configureStore } from '@reduxjs/toolkit'
import authState from './auth.store'
import visitorInfo from './visitorInfo.store'
export const store = configureStore({
  reducer: {
    auth: authState,
    visitor: visitorInfo,
  }
})