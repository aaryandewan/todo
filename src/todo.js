import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Button } from "@material-ui/core";
import { db } from "./firebase_config";

function TodoListItem({ todo, inProgress, id }) {
  const toggleInProgress = () => {
    db.collection("todos").doc(id).update({
      inProgress: !inProgress,
    });
  };
  const deleteTodo = () => {
    db.collection("todos").doc(id).delete();
  };

  return (
    <div style={{ display: "flex" }}>
      <ListItem>
        <ListItemText
          primary={todo}
          secondary={inProgress ? "in Progress" : "Completed"}
        />
      </ListItem>
      <Button onClick={toggleInProgress}>
        {inProgress ? "Done" : "Undone"}
      </Button>
      <Button onClick={deleteTodo}>X</Button>
    </div>
  );
}

export default TodoListItem;
