import TaskCard from './TaskCard.jsx';
export default function TaskList({tasks, deleteTask, toggleTask, onEdit }){
    if(tasks.length === 0){
        return(
            <p className='text-gray-500 text-center mt-4'>
                No tasks yet. Add one above
            </p>
        );
    }
    return(
        <div className='space-y-4' >
            {tasks.map((task)=>{
                return <TaskCard key={task.id} task={task} deleteTask={deleteTask} toggleTask={toggleTask} onEdit={onEdit}/> 
            })}
        </div>
    );
}
