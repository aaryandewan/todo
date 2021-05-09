import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { db } from "./firebase_config";
import firebase from "firebase";
import TodoListItem from "./todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [data, setData] = useState("");

  const getTodos = () => {
    db.collection("todos").onSnapshot((querySnapchot) => {
      setTodos(
        querySnapchot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inProgress: doc.data().inProgress,
        }))
      );
    });
  };

  useEffect(() => {
    getTodos();
  }, [data]);

  const formHandler = (e) => {
    e.preventDefault();
    console.log("Hi", data);
    //db.collection("todos").doc("INSERT YOU OWN ID HERE") -- but if you want firebase to add its own random ID, type in the below line
    db.collection("todos").add({
      inProgress: true,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: data,
    });

    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      });

    // Add a new document in collection "cities"
    // db.collection("users")
    //   .add({
    //     name: "Aaryan",
    //     age: "21",
    //     gender: "Boy",
    //   })
    //   .then(() => {
    //     console.log("Document successfully written!!!");
    //   })
    //   .catch((error) => {
    //     console.error("Error writing document: ", error);
    //   });
    // Add a new document in collection "cities"
    // db.collection("users")
    //   .doc("Aaryan")
    //   .set({
    //     name: "AaruDONNNNNNNNNNN",
    //     gender: "male",
    //     age: "21",
    //   })
    //   .then(() => {
    //     console.log("Document successfully written!");
    //   })
    //   .catch((error) => {
    //     console.error("Error writing document: ", error);
    //   });

    setData("");
  };

  return (
    <form onSubmit={formHandler}>
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>ToDo List (w/ CRUD) </h1>
        <TextField
          id="standard-basic"
          label="Standard"
          value={data}
          style={{ maxWidth: "300px" }}
          onChange={(e) => {
            setData(e.target.value);
          }}
        />
        <button type="submit" style={{ display: "none" }}></button>
        {todos.map((todo) => {
          return (
            <TodoListItem
              todo={todo.todo}
              inProgress={todo.inProgress}
              id={todo.id}
            />
            // <p>{todo.id}</p>
          );
        })}
      </div>
    </form>
  );
}

export default App;
