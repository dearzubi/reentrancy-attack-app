import { createSlice } from '@reduxjs/toolkit'

export const blockchainStoreSlice = createSlice({
    name: 'blockchainStore',
    initialState: {
      address: null,
      balance: 0,
      bankAddress: null,
      bankBalance: '0',
      attackerAddress: null,
      attackerBalance: '0',
      numberOfAttackRuns: 0
    },
    reducers: {
      setAccountDetails: (state, action) => {
        state.balance = action.payload.balance ? action.payload.balance : state.balance;
        state.address = action.payload.address ? action.payload.address : state.address;
        
      },
      setContractDetails: (state, action) => {
        state.bankBalance = action.payload.bankBalance ? action.payload.bankBalance : state.bankBalance;
        state.bankAddress = action.payload.bankAddress ? action.payload.bankAddress : state.bankAddress;
        state.attackerBalance = action.payload.attackerBalance ?  action.payload.attackerBalance : state.attackerBalance;
        state.attackerAddress = action.payload.attackerAddress ? action.payload.attackerAddress : state.attackerAddress;

      },
      setAttackDetails: (state, action) => {
        state.numberOfAttackRuns = action.payload.numberOfAttackRuns ? action.payload.numberOfAttackRuns : state.numberOfAttackRuns;
      }
    }
  });
  
  // Action creators are generated for each case reducer function
  export const { setAccountDetails, setContractDetails, setAttackDetails } = blockchainStoreSlice.actions
  
  export default blockchainStoreSlice.reducer