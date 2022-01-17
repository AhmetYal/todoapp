import {createSlice,nanoid} from '@reduxjs/toolkit'

export const todosSlice=createSlice({
name:'todos',
initialState:{
    items:[
        {
        id:"1",
        title:'learn React',
        completed:true
    },
    {
        id:"2",
        title:'learn redux',
        completed:false
    }
],
activeFilter:'all',
},
reducers:{
    addTodo:{
        reducer:(state,action)=>{
            state.items.push(action.payload);
        },
        prepare:({title})=>{
            return {
                payload:{
                    id:nanoid(), 
                    completed:false,
                    title,
                },
            };
        },
    },
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

export const {addTodo,toogle,destroy,changeActiveFİlter,clearCompleted}=todosSlice.actions;
export default todosSlice.reducer;