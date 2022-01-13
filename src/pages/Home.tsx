import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const task: Task = {
      id: Number(new Date().getTime()),
      title: newTaskTitle,
      done: false,
    }

    setTasks([...tasks, task]);

  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const newTasks = updatedTasks.map((task) => {
      if (task.id == id) {
        return {
          done: !task.done,
          id: task.id,
          title: task.title
        }
      } else {
        return {...task}
      }
    });

    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks.filter((task) => task.id != id));
  }

  return (

    <View style={styles.container}>

      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />

    </View>

  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }

})