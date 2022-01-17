import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

export const getTodosAsync= createAsyncThunk('todos/getTodosAsync',async ()=>{
    const res = await axios('{process.env.REACT_APP_API_BASE_ENDPOINT}/todos');
    return res.data;
});

export const addTodosAsync= createAsyncThunk('todos/addTodosAsync',async (data)=>{
    const res = await axios('{process.env.REACT_APP_API_BASE_ENDPOINT}/todos', data);
    return res.data;
});

export const todosSlice=createSlice({
name:'todos',
initialState:{
    items:[],
    isLoading:false,
    error:null,
activeFilter:'all',
addNewTodoLoading:false,
addNewTodoError:null,
},
reducers:{
    
    toogle:(state,action)=>{
        const {id}=action.payload;

        const item=state.items.find((item)=> item.id===id);

        item.completed=!item.completed;
        },
    destroy:(state,action)=>{
        const id=action.payload;  
        const filtered=state.items.filter((item)=> item.id !==id);
        state.items=filtered;
    },
    changeActiveFİlter:(state,action)=>{
        state.activeFilter=action.payload;
    },
    clearCompleted:(state)=>{
        const filtered=state.items.filter(item=> item.completed===false);
        state.items=filtered;
    },
   },
   extraReducers: {
      
       [getTodosAsync.pending]:(state,action)=>{
        state.isLoading=true;
       },
       [getTodosAsync.fulfilled]:(state,action)=>{
        state.items=action.payload;
        state.isLoading=false;
       },
       [getTodosAsync.rejected]:(state,action)=>{
           state.isLoading=false;
           state.error=action.error.message;
       },

       [addTodosAsync.pending]:(state,action)=>{
        state.addNewTodoLoading=true;
        },
    [addTodosAsync.fulfilled]:(state,action)=>{
    state.items.push(action.payload);
    state.addNewTodoLoading=false;
    },
    [addTodosAsync.rejected]:(state,action)=>{
        state.addNewTodoLoading=false;
        state.addNewTodoError=action.addNewTodoError.message;
    },
   },
});


export const selectTodos=(state)=>state.todos.items;
export const selectfilteredTodos=(state)=> {
if(state.todos.activeFilter==='all'){
    return state.todos.items;
}
return state.todos.items.filter((todo) => 
state.todo.activeFilter==='active' 
? todo.completed=== false :todo.completed===true ,
 );
};

export const {toogle,destroy,changeActiveFİlter,clearCompleted}=todosSlice.actions;
export default todosSlice.reducer;