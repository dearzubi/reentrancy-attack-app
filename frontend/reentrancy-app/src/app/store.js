import { configureStore } from '@reduxjs/toolkit'
import blockchainStoreReducer from './blockchainStoreSlice'

export default configureStore({
  reducer: {
    blockchainStore: blockchainStoreReducer
  }
})