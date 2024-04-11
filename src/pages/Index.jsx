import React, { useState } from "react";
import { Box, Heading, Input, Button, Checkbox, Text, Flex, IconButton } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const INITIAL_TODOS = [
  { id: 1, text: "Buy groceries", completed: false },
  { id: 2, text: "Do laundry", completed: true },
  { id: 3, text: "Clean bathroom", completed: false },
];

const Index = () => {
  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [newTodo, setNewTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const newId = Math.max(...todos.map((todo) => todo.id)) + 1;
      setTodos([...todos, { id: newId, text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const handleToggleComplete = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id, text) => {
    setEditTodoId(id);
    setEditTodoText(text);
  };

  const handleCancelEdit = () => {
    setEditTodoId(null);
    setEditTodoText("");
  };

  const handleSaveEdit = () => {
    setTodos(todos.map((todo) => (todo.id === editTodoId ? { ...todo, text: editTodoText } : todo)));
    setEditTodoId(null);
    setEditTodoText("");
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg" boxShadow="xl">
      <Heading size="xl" textAlign="center" mb={8}>
        My Todo List
      </Heading>

      <Flex mb={8}>
        <Input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Enter a new todo" mr={4} />
        <Button onClick={handleAddTodo} colorScheme="blue">
          <FaPlus />
        </Button>
      </Flex>

      {todos.map((todo) => (
        <Flex key={todo.id} mb={4} align="center">
          <Checkbox isChecked={todo.completed} onChange={() => handleToggleComplete(todo.id)} mr={4} />
          {editTodoId === todo.id ? (
            <Input value={editTodoText} onChange={(e) => setEditTodoText(e.target.value)} mr={2} />
          ) : (
            <Text flex={1} textDecoration={todo.completed ? "line-through" : "none"}>
              {todo.text}
            </Text>
          )}
          {editTodoId === todo.id ? (
            <>
              <IconButton icon={<FaEdit />} onClick={handleSaveEdit} mr={2} />
              <IconButton icon={<FaTrash />} onClick={handleCancelEdit} />
            </>
          ) : (
            <>
              <IconButton icon={<FaEdit />} onClick={() => handleEditTodo(todo.id, todo.text)} mr={2} />
              <IconButton icon={<FaTrash />} onClick={() => handleDeleteTodo(todo.id)} />
            </>
          )}
        </Flex>
      ))}
    </Box>
  );
};

export default Index;
