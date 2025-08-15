"use client";

import Column from "@/components/Column";
import Button from "../components/Button";
import { COLUMNS } from "@/constants/Task.constants";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { FormEvent, useEffect, useState } from "react";
import { ITask } from "@/types/Task";
import ModalTask from "@/components/ModalTask";
import ModalConfirm from "@/components/ModalConfirm";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [showModalAddTask, setShowModalAddTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<{
    activity: string;
    task: ITask;
  } | null>(null);

  //load tasks form initial render
  // useEffect(() => {
  //   const storedTasks = localStorage.getItem("tasks");
  //   if (storedTasks) {
  //     setTasks(JSON.parse(storedTasks));
  //   }
  // }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase.from("tasks").select("*");
    if (!error && data) {
      setTasks(data as ITask[]);
    }
  };

  //save changes tasks to localstorage
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const taskId = active.id as string;
    const newStatus = over.id as ITask["status"];

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    const { error } = await supabase
      .from("tasks")
      .update({ status: newStatus })
      .eq("id", taskId);

    if (error) {
      console.error("Gagal update ke Supabase", error);
      // Rollback jika error
      fetchTasks();
    }
  };

  const handleCreateTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newTask: ITask = {
      // id: Math.random().toString(36).substring(2, 9),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: "TODO",
    };

    // setTasks((prevTasks) => [...prevTasks, newTask]);

    // event.currentTarget.reset();
    // setShowModalAddTask(false);

    const { error } = await supabase.from("tasks").insert([newTask]);
    if (!error) {
      fetchTasks();
      setShowModalAddTask(false);
    }
  };

  const handleUpdateTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const updatesTask: ITask = {
      // id: selectedTask?.task?.id as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      // status: selectedTask?.task?.status as ITask["status"],
    };

    // setTasks((prevTasks) =>
    //   prevTasks.map((task) => (task.id === updatesTask.id ? updatesTask : task))
    // );

    // event.currentTarget.reset();
    // setSelectedTask(null);

    const { error } = await supabase
      .from("tasks")
      .update(updatesTask)
      .eq("id", selectedTask?.task?.id);
    if (!error) {
      fetchTasks();
      setSelectedTask(null);
    }
  };

  const handleDeleteTask = async () => {
    // setTasks((prevTasks) =>
    //   prevTasks.filter((task) => task.id !== selectedTask?.task?.id)
    // );
    // setSelectedTask(null);

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", selectedTask?.task?.id);
    if (!error) {
      fetchTasks();
      setSelectedTask(null);
    }
  };

  return (
    <main className="min-h-screen p-4 flex flex-col">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-700">Task Management</h1>
        <Button
          onClick={() => setShowModalAddTask(true)}
          className="bg-blue-500"
        >
          Add Task
        </Button>
      </div>
      <div className="flex gap-8 flex-1">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
              setSelectedTask={setSelectedTask}
            />
          ))}
        </DndContext>
      </div>

      {showModalAddTask && (
        <ModalTask
          onCancel={() => setShowModalAddTask(false)}
          onSubmit={handleCreateTask}
        />
      )}

      {selectedTask?.activity === "update" && (
        <ModalTask
          onSubmit={handleUpdateTask}
          onCancel={() => setSelectedTask(null)}
          selectedTask={selectedTask.task}
          type="Update"
        />
      )}

      {selectedTask?.activity === "delete" && (
        <ModalConfirm
          onConfirm={handleDeleteTask}
          onCancel={() => setSelectedTask(null)}
          message="Are you sure you want to delete this task?"
          title="Delete Task"
          type="Delete"
        />
      )}
    </main>
  );
}
