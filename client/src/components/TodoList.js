import {useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {toogle,destroy,selectTodos,getTodosAsync} from '../redux/todos/todosSlice'
import Loading from './Loading'
import Error from './Error'

let filtered=[];

function TodoList() {
	const dispatch =useDispatch();
	const items=useSelector(selectTodos);
	const activeFilter=useSelector((state)=>state.todos.activeFilter);	
	const isLoading=useSelector((state)=> state.todos.isLoading);
const error=useSelector((state)=> state.todos.error);

useEffect(()=>{
dispatch(getTodosAsync());
},[dispatch])

	const handleDestroy=(id)=> {
		if(window.confirm('Eminsen?')){
			dispatch(destroy(id));
		}
	};

	filtered=items;
	if(activeFilter !== "all"){
filtered = items.filter((todo)=> activeFilter === 'active' ? todo.completed === false : todo.completed === true,);
	}

if(isLoading){
	return <Loading/>
}
if(error){
	return <Error message={error}/>
}


    return (
        <ul className="todo-list">
						
			{
				filtered.map((item) => (
					<li key={item.id} className={item.completed ? 'completed' : ''}>
						<div className="view">
							<input className="toggle" 
							type="checkbox" 
							checked={item.completed}
							onChange={() => dispatch(toogle({id:item.id}))}/>
							<label>{item.title}</label>
							<button className="destroy" 
							onClick={()=> handleDestroy(item.id)}></button>
						</div>
					</li>
				))
			}
		</ul>
    )
}

export default TodoList
