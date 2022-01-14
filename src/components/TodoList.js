import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {toogle,destroy,selectfilteredTodos} from '../redux/todos/todosSlice'



function TodoList() {
	const dispatch =useDispatch();
	const filteredTodos= useSelector(selectfilteredTodos);
	
	const handleDestroy=(id)=> {
		if(window.confirm('Eminsen?')){
			dispatch(destroy(id));
		}
	};

	
    return (
        <ul className="todo-list">
						
			{
				filteredTodos.map((item) => (
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
