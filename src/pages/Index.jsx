import { useState } from 'react';
import { Box, Button, Input, List, ListItem, ListIcon, IconButton, useColorModeValue } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      const newTasks = [...tasks, { id: Date.now(), text: input, isComplete: false }];
      setTasks(newTasks);
      setInput('');
    }
  };

  const handleRemoveTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, isComplete: !task.isComplete };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const bg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box p={12} maxW="500px" mx="auto" bg={bg}>
      <Input
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        size="lg"
        mb={6}
      />
      <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddTask} w="full" mb={4}>
        Add Task
      </Button>
      <List spacing={5}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center">
            <IconButton
              icon={task.isComplete ? <FaCheckCircle /> : <FaRegCircle />}
              onClick={() => handleToggleComplete(task.id)}
              colorScheme={task.isComplete ? "green" : "gray"}
              aria-label="Complete Task"
            />
            <Box flex="1" ml={4} as={task.isComplete ? 's' : 'span'}>
              {task.text}
            </Box>
            <IconButton
              icon={<FaTrash />}
              onClick={() => handleRemoveTask(task.id)}
              colorScheme="red"
              aria-label="Delete Task"
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;