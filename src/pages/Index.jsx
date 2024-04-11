import React, { useState } from "react";
import { Box, Heading, Input, Button, Checkbox, Text, Flex, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const INITIAL_TASKS = [
  { id: 1, text: "Buy groceries", completed: false },
  { id: 2, text: "Do laundry", completed: true },
  { id: 3, text: "Clean bathroom", completed: false },
];

const Index = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");
  const toast = useToast();

  const handleSubmit = () => {
    if (newTask.trim()) {
      const newId = Math.max(...tasks.map((task) => task.id)) + 1;
      setTasks([...tasks, { id: newId, text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleComplete = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast({ title: "Task deleted", status: "info", duration: 2000, isClosable: true });
  };

  const handleEditStart = (id, text) => {
    setEditTaskId(id);
    setEditTaskText(text);
  };

  const handleEditCancel = () => {
    setEditTaskId(null);
    setEditTaskText("");
  };

  const handleEditSubmit = () => {
    setTasks(tasks.map((task) => (task.id === editTaskId ? { ...task, text: editTaskText } : task)));
    setEditTaskId(null);
    setEditTaskText("");
  };

  return (
    <Box maxW="600px" mx="auto" mt={8} p={6} borderWidth={1} borderRadius={8} boxShadow="lg">
      <Heading mb={8} textAlign="center" color="blue.500">
        My Todo List
      </Heading>

      <Flex mb={8}>
        <Input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Enter a new task" mr={4} borderColor="gray.300" _hover={{ borderColor: "blue.500" }} />
        <Button onClick={handleSubmit} colorScheme="blue" px={8}>
          Add
        </Button>
      </Flex>

      {tasks.map((task) => (
        <Flex key={task.id} mb={4} align="center" bg="gray.50" p={4} borderRadius={4}>
          <Checkbox isChecked={task.completed} onChange={() => handleComplete(task.id)} mr={4} colorScheme="blue" />
          {editTaskId === task.id ? (
            <Input value={editTaskText} onChange={(e) => setEditTaskText(e.target.value)} mr={2} borderColor="gray.300" />
          ) : (
            <Text flex={1} textDecoration={task.completed ? "line-through" : "none"}>
              {task.text}
            </Text>
          )}
          {editTaskId === task.id ? (
            <>
              <IconButton icon={<FaEdit />} onClick={handleEditSubmit} mr={2} colorScheme="green" />
              <IconButton icon={<FaTrash />} onClick={handleEditCancel} colorScheme="red" />
            </>
          ) : (
            <>
              <IconButton icon={<FaEdit />} onClick={() => handleEditStart(task.id, task.text)} mr={2} colorScheme="blue" />
              <IconButton icon={<FaTrash />} onClick={() => handleDelete(task.id)} colorScheme="red" />
            </>
          )}
        </Flex>
      ))}
    </Box>
  );
};

export default Index;
