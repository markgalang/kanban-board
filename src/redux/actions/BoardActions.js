import { UPDATE_BOARD } from "../type";

export const onDragEnd = (result, columns, setColumns) => (dispatch) => {
  if (!result.destination) return;
  const { source, destination, type } = result;
  let newBoardStatus = {};
  if (type === "column") {
    let newColumnOrders = Object.entries(columns);
    const [draggedColumn] = newColumnOrders.splice(source.index, 1);
    newColumnOrders.splice(destination.index, 0, draggedColumn);
    newBoardStatus = Object.fromEntries(newColumnOrders);
  } else {
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.tasks];
      const destItems = [...destColumn.tasks];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      newBoardStatus = {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destItems,
        },
      };
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.tasks];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      newBoardStatus = {
        ...columns,
        [source.droppableId]: {
          ...column,
          tasks: copiedItems,
        },
      };
    }
  }

  dispatch({ type: UPDATE_BOARD, payload: newBoardStatus });
};
