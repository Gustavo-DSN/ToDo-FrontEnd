import TaskList from "./Pages/TaskList";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
	palette: {
		mode: "light", // Altere para "dark" se quiser um tema escuro
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<TaskList />
		</ThemeProvider>
	);
}

export default App;
