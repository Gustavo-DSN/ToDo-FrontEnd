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
	Typography,
	Paper,
	Box,
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
		<Box
			sx={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				background: "linear-gradient(135deg, #667eea, #764ba2)",
				padding: 2,
			}}
		>
			<Paper
				elevation={6}
				sx={{
					width: "100%",
					maxWidth: "450px",
					padding: "24px",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					borderRadius: "12px",
					backgroundColor: "#fff",
				}}
			>
				<Typography variant="h4" color="primary" gutterBottom>
					Lista de Tarefas
				</Typography>

				<TextField
					fullWidth
					label="Nova tarefa"
					variant="outlined"
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
					onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
					sx={{ marginBottom: 2 }}
				/>

				<Button
					fullWidth
					variant="contained"
					color="primary"
					onClick={handleAddTask}
					sx={{ marginBottom: 2 }}
				>
					Adicionar
				</Button>

				<List sx={{ width: "100%" }}>
					{tasks.map((task) => (
						<ListItem key={task._id} divider>
							<Checkbox
								checked={task.completed}
								onChange={() => handleToggleTask(task)}
							/>
							<ListItemText
								primary={task.title}
								sx={{
									textDecoration: task.completed
										? "line-through"
										: "none",
								}}
							/>
							<IconButton
								color="error"
								onClick={() => handleDeleteTask(task._id)}
							>
								<DeleteIcon />
							</IconButton>
						</ListItem>
					))}
				</List>
			</Paper>
		</Box>
	);
}
