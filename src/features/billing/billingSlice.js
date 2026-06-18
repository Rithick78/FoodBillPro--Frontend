import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createBillApi, getDashboardApi, resetDashboardApi } from '../../api/billingApi'

export const createBill = createAsyncThunk(
  'billing/create',
  async (billData, thunkAPI) => {
    try {
      const res = await createBillApi(billData)
      return res.data
    } catch {
      return thunkAPI.rejectWithValue('Failed to create bill')
    }
  }
)

export const fetchDashboard = createAsyncThunk(
  'billing/dashboard',
  async (_, thunkAPI) => {
    try {
      const res = await getDashboardApi()
      return res.data
    } catch {
      return thunkAPI.rejectWithValue('Failed to load dashboard')
    }
  }
)

export const resetDashboard = createAsyncThunk(
  'billing/reset',
  async (_, thunkAPI) => {
    try {
      await resetDashboardApi()
      return true
    } catch {
      return thunkAPI.rejectWithValue('Failed to reset')
    }
  }
)

const billingSlice = createSlice({
  name: 'billing',
  initialState: {
    cart: [],
    customer: { name: '', whatsappNumber: '' },
    dashboard: { totalBills: 0, totalSales: 0, date: '' },
    loading: false,
    error: null,
  },
  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload
    },
    addToCart: (state, action) => {
      const product = action.payload
      const existing = state.cart.find((item) => item.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.cart.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload
      const existing = state.cart.find((item) => item.id === id)
      if (existing && existing.quantity > 1) {
        existing.quantity -= 1
      } else {
        state.cart = state.cart.filter((item) => item.id !== id)
      }
    },
    clearCart: (state) => {
      state.cart = []
      state.customer = { name: '', whatsappNumber: '' }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.dashboard = action.payload
      })
      .addCase(resetDashboard.fulfilled, (state) => {
        state.dashboard.totalBills = 0
        state.dashboard.totalSales = 0
      })
      .addCase(createBill.pending, (state) => { state.loading = true })
      .addCase(createBill.fulfilled, (state) => {
        state.loading = false
        state.cart = []
        state.customer = { name: '', whatsappNumber: '' }
      })
      .addCase(createBill.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setCustomer, addToCart, removeFromCart, clearCart } = billingSlice.actions
export default billingSlice.reducer