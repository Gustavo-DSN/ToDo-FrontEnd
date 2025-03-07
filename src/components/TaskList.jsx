import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";
import {
	TextField,
	Button,
	List,
	ListItem,
	ListItemText,
	IconButton,
	Checkbox,
	Container,
	Typography,
	Paper,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

export default function TaskList() {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");

	useEffect(() => {
		loadTasks();
	}, []);

	const loadTasks = async () => {
		const data = await getTasks();
		setTasks(data);
	};

	const handleAddTask = async () => {
		if (newTask.trim()) {
			await createTask({ title: newTask, completed: false });
			setNewTask("");
			loadTasks();
		}
	};

	const handleToggleTask = async (task) => {
		await updateTask(task._id, { ...task, completed: !task.completed });
		loadTasks();
	};

	const handleDeleteTask = async (id) => {
		await deleteTask(id);
		loadTasks();
	};

	return (
		<Container maxWidth="sm">
			<Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
				<Typography variant="h4" align="center" gutterBottom>
					Lista de tarefas
				</Typography>
				<TextField
					fullWidth
					label="Nova tarefa"
					variant="outlined"
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
					onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
				/>
				<Button
					fullWidth
					variant="contained"
					color="primary"
					onClick={handleAddTask}
					style={{ marginTop: "10px" }}
				>
					Adicionar
				</Button>

				<List>
					{tasks.map((task) => (
						<ListItem key={task._id} divider>
							<Checkbox
								checked={task.completed}
								onChange={() => handleToggleTask(task)}
							/>
							<ListItemText
								primary={task.title}
								style={{
									textDecoration: task.completed
										? "line-through"
										: "none",
								}}
							/>
							<IconButton
								edge="end"
								color="error"
								onClick={() => handleDeleteTask(task._id)}
							>
								<DeleteIcon />
							</IconButton>
						</ListItem>
					))}
				</List>
			</Paper>
		</Container>
	);
}
