import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import React, {  useState } from "react";
import CustomInput from "../../components/input/input";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo, deleteTodo } from "../../features/slice/todo";

const Home = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const user = JSON.parse(localStorage.getItem("current-user"));

  // let todosdb = JSON.parse(localStorage.getItem("persist:todos"));
  console.log(user.particularUser  )

  const [input, setInput] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const [editOrAdd, setEditOrAdd] = useState(false);
  const [error, setError] = useState({
    titleError: false,
    deadlineError: false,
    descriptionError: false,
  });

  const [currentIndex, setCurrentIndex] = useState(null);
  const handleInputChange = (field, value) => {
    setInput((prevInput) => ({
      ...prevInput,
      [field]: value,
    }));
  };

  const validateInputs = () => {
    const errors = {
      titleError: !input.title.trim(),
      descriptionError: !input.description.trim(),
      deadlineError: !input.deadline.trim(),
    };

    setError(errors);
    return !Object.values(errors).includes(true);
  };

  const handleAddOrEdit = () => {
    if (!validateInputs()) return;

    if (editOrAdd && currentIndex !== null) {
      dispatch(
        editTodo({
          data: { ...input, todoOwner: user.particularUser.id },
          index: currentIndex,
        })
      );
    } else {
      dispatch(
        addTodo({
          ...input,
          todoOwner: user.particularUser.id,
        })
      );
    }
    resetForm();
  };

  const resetForm = () => {
    setInput({
      title: "",
      description: "",
      deadline: "",
    });
    setEditOrAdd(false);
    setCurrentIndex(null);
    setError({
      titleError: false,
      deadlineError: false,
      descriptionError: false,
    });
  };

  const handleEdit = (index) => {
    const todo = todos[index];
    setInput({
      title: todo.title,
      description: todo.description,
      deadline: todo.deadline,
    });
    setEditOrAdd(true);
    setCurrentIndex(index);
  };

  return (
    <Box className="todo-container" sx={{ padding: "20px" }}>
      <Box className="custom-input-wrapper" sx={{ margin: "20px" }}>
        <Box sx={{ margin: "10px" }}>
          <CustomInput
            value={input.title}
            errorState={error.titleError}
            className="input-field"
            handlerState={(e) => handleInputChange("title", e.target.value)}
            label="Enter Title"
          />
        </Box>
        {error.titleError && (
          <Box
            style={{
              color: "red",
              marginTop: "-14px",
              marginBottom: "13px",
              marginLeft:"10px",
            }}
          >
            Enter correct title
          </Box>
        )}
        <Box sx={{ margin: "10px" }}>
          <CustomInput
            value={input.description}
            errorState={error.descriptionError}
            className="input-field"
            handlerState={(e) =>
              handleInputChange("description", e.target.value)
            }
            label="Enter Description"
          />
        </Box>
        {error.descriptionError && (
          <Box
            style={{
              color: "red",
              marginTop: "-14px",
              marginBottom: "13px",
              marginLeft:"10px",
            }}
          >
            Enter correct description
          </Box>
        )}
        <Box sx={{ margin: "10px" }}>
          <TextField
            type="date"
            value={input.deadline}
            error={error.deadlineError}
            onChange={(e) => handleInputChange("deadline", e.target.value)}
            label="Deadline"
            InputLabelProps={{
              shrink: true,
            }}
            
            sx={{ width: "225px", input: { height: "20px" } }}
          />
        </Box>
        {error.deadlineError && (
          <Box
            style={{
              color: "red",
              marginTop: "-14px",
              marginLeft:"10px",
              marginBottom: "13px",
            }}
          >
            Enter correct Deadline
          </Box>
        )}
        <Button
          onClick={handleAddOrEdit}
          sx={{ width: "100px", margin: "10px" }}
          variant="contained"
        >
          {editOrAdd ? "Save" : "Add"}
        </Button>
      </Box>

      <Grid container spacing={2}>
        { todos && todos
          .filter((todo) => todo.todoOwner ===  user.particularUser.id)
          .map((todo, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ backgroundColor: "#f5f5f5", position: "relative" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {todo.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {todo.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ marginTop: "10px" }}
                  >
                    Deadline: {todo.deadline}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0 10px 10px",
                  }}
                >
                  <Button
                    onClick={() => handleEdit(index)}
                    size="small"
                    variant="contained"
                    sx={{ backgroundColor: "#1976d2" }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => dispatch(deleteTodo(index))}
                    size="small"
                    variant="contained"
                    color="error"
                  >
                    Delete
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Home;
