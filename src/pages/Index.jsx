import React, { useState, useEffect } from "react";
import { Box, Heading, Input, Button, Flex, Checkbox, Text, IconButton, Spacer, VStack, HStack } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [
      { id: 1, text: "Buy groceries", completed: false },
      { id: 2, text: "Walk the dog", completed: true },
      { id: 3, text: "Do laundry", completed: false },
    ];
  });

  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo,
          completed: false,
        },
      ]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const editTodoItem = (id, text) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
    setEditTodo(null);
  };

  return (
    <Box maxWidth="600px" margin="auto" p={4}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        My Todo List
      </Heading>
      <Flex mb={8}>
        <Input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Enter a new todo" mr={4} />
        <Button onClick={addTodo} colorScheme="blue" leftIcon={<FaPlus />}>
          Add
        </Button>
      </Flex>
      <VStack spacing={4} align="stretch">
        {todos.map((todo) => (
          <HStack key={todo.id}>
            <Checkbox isChecked={todo.completed} onChange={() => toggleComplete(todo.id)} />
            {editTodo === todo.id ? (
              <Input value={todo.text} onChange={(e) => editTodoItem(todo.id, e.target.value)} onBlur={() => setEditTodo(null)} autoFocus />
            ) : (
              <Text flex={1} textDecoration={todo.completed ? "line-through" : "none"}>
                {todo.text}
              </Text>
            )}
            <Spacer />
            <IconButton icon={<FaEdit />} onClick={() => setEditTodo(todo.id)} aria-label="Edit todo" />
            <IconButton icon={<FaTrash />} onClick={() => deleteTodo(todo.id)} aria-label="Delete todo" />
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;
