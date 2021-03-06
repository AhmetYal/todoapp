import React from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import {changeActiveFİlter,clearCompleted,selectTodos} from '../redux/todos/todosSlice'

function ContentFooter() {
const dispatch=useDispatch();

	const items=useSelector(selectTodos);	
	const itemsLeft=items.filter((item)=> !item.completed).length; 

	const activeFilter=useSelector((state)=> state.todos.activeFilter);

    return (
        <footer className="footer">		
		<span className="todo-count">
			<strong>{itemsLeft}</strong> 
			item{itemsLeft > 1 && 's'} left
		</span>

		<ul className="filters">
			<li>
				<a 
				href='#/' 
				className={activeFilter === 'all' ? 'selected' : ''}
				onClick={()=>dispatch(changeActiveFİlter('all'))}
				>All</a>
			</li>
			<li>
				<a 
				href='#/' 
				className={activeFilter === 'active' ? 'selected' : ''}
				onClick={()=>dispatch(changeActiveFİlter('active'))}
				>Active</a>
			</li>
			<li>
				<a 
				href='#/' 
				className={activeFilter === 'completed' ? 'selected' : ''}
				onClick={()=>dispatch(changeActiveFİlter())}
				>Completed</a>
			</li>
		</ul>
		<button className="clear-completed"
		onClick={()=>dispatch(clearCompleted('completed'))}>
			Clear completed
		</button>
	</footer>
    )
}

export default ContentFooter
