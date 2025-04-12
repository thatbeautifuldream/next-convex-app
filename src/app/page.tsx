"use client";

import Image from "next/image";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setTaskCompleted } from "../../convex/tasks";
import { cn } from "@/lib/utils";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const tasks = useQuery(api.tasks.get);
  const addTask = useMutation(api.tasks.createTask);
  const setTaskCompleted = useMutation(api.tasks.setTaskCompleted);

  const handleAddTask = () => {
    addTask({ title, description });
    setTitle("");
    setDescription("");
  };


  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-4xl space-y-8">
        <div className="flex flex-col gap-4 p-4 border rounded-lg bg-card">
          <h2 className="text-2xl font-bold">Create New Task</h2>
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              onClick={handleAddTask}
              className="w-full"
            >
              Create Task
            </Button>
          </div>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Completed</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks?.map((task) => (
                <TableRow key={task._id}>
                  <TableCell className={cn("font-medium", task.completed && "line-through")}>{task.title}</TableCell>
                  <TableCell className={cn(task.completed && "line-through")}>{task.description}</TableCell>
                  <TableCell>
                    {new Date(task.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>{task.completed ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm"
                      onClick={() =>
                        setTaskCompleted({
                          taskId: task._id,
                          completed: !task.completed,
                        })
                      }
                    >
                      {task.completed ? "Uncomplete" : "Complete"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}