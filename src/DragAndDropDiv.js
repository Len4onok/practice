import './App.css';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

function DragAndDropDiv({engArr, setEngArr}) {
  
	function handleOnDragEnd(result) {
	const items = Array.from(engArr);
	const [reorderedItem] = items.splice(result.source.index, 1);
	items.splice(result.destination.index, 0, reorderedItem);
	setEngArr(items);
	}

	return <DragDropContext onDragEnd={handleOnDragEnd}>
		<Droppable droppableId="words">
			{(provided) => (
				<div className="words" {...provided.droppableProps} ref={provided.innerRef}>
					{engArr.map(({ id, name }, index) => {
						return (
							<Draggable key={id} draggableId={id} index={index}>
								{(provided) => (
									<span ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >{name}
										
									</span>
								)}
							</Draggable>
						);
					})}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	</DragDropContext>
}

export default DragAndDropDiv;
