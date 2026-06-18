import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getMenuProducts, getAdminProducts, addProductApi,
  deleteProductApi, toggleProductApi, toggleSignatureApi, toggleFastMovingApi,
} from '../../api/productApi'

export const fetchPublicProducts = createAsyncThunk('products/fetchPublic', async (_, thunkAPI) => {
  try { 
   const res = await getMenuProducts()
      return res.data
  }
  catch { return thunkAPI.rejectWithValue('Failed to load products') }
})

export const fetchAdminProducts = createAsyncThunk('products/fetchAdmin', async (_, thunkAPI) => {
  try { return (await getAdminProducts()).data }
  catch { return thunkAPI.rejectWithValue('Failed to load products') }
})

export const addProduct = createAsyncThunk('products/add', async (formData, thunkAPI) => {
  try { return (await addProductApi(formData)).data }
  catch { return thunkAPI.rejectWithValue('Failed to add product') }
})

export const deleteProduct = createAsyncThunk('products/delete', async (id, thunkAPI) => {
  try { await deleteProductApi(id); return id }
  catch { return thunkAPI.rejectWithValue('Failed to delete') }
})

export const toggleProduct = createAsyncThunk('products/toggle', async (id, thunkAPI) => {
  try { return (await toggleProductApi(id)).data }
  catch { return thunkAPI.rejectWithValue('Failed to toggle') }
})

export const toggleSignature = createAsyncThunk('products/toggleSignature', async (id, thunkAPI) => {
  try { return (await toggleSignatureApi(id)).data }
  catch { return thunkAPI.rejectWithValue('Failed to toggle signature') }
})

export const toggleFastMoving = createAsyncThunk('products/toggleFastMoving', async (id, thunkAPI) => {
  try { return (await toggleFastMovingApi(id)).data }
  catch { return thunkAPI.rejectWithValue('Failed to toggle fast moving') }
})

const updateItem = (state, action) => {
  const idx = state.items.findIndex(p => p.id === action.payload.id)
  if (idx !== -1) state.items[idx] = action.payload
}

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [], loading: false, error: null, successMessage: null },
  reducers: {
    clearMessages: (state) => { state.error = null; state.successMessage = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicProducts.pending,  (state) => { state.loading = true })
      .addCase(fetchPublicProducts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload })
      .addCase(fetchPublicProducts.rejected,  (state, action) => { state.loading = false; state.error = action.payload })
      .addCase(fetchAdminProducts.pending,   (state) => { state.loading = true })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload })
      .addCase(fetchAdminProducts.rejected,  (state, action) => { state.loading = false; state.error = action.payload })
      .addCase(addProduct.pending,   (state) => { state.loading = true })
      .addCase(addProduct.fulfilled, (state, action) => { state.loading = false; state.items.push(action.payload); state.successMessage = 'Product added!' })
      .addCase(addProduct.rejected,  (state, action) => { state.loading = false; state.error = action.payload })
      .addCase(deleteProduct.fulfilled, (state, action) => { state.items = state.items.filter(p => p.id !== action.payload); state.successMessage = 'Deleted!' })
      .addCase(toggleProduct.fulfilled,    updateItem)
      .addCase(toggleSignature.fulfilled,  updateItem)
      .addCase(toggleFastMoving.fulfilled, updateItem)
  },
})

export const { clearMessages } = productSlice.actions
export default productSlice.reducer