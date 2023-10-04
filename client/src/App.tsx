import { Box, Container, Tab, Tabs } from "@mui/material";
import Expenses from "./components/Expenses";
import Projects from "./components/Projects";
import { AppContextProvider, useAppContext } from "./contexts/AppContext";
import { TabValue } from "./types";

const Content = () => {
  const { selectedTab, setSelectedTab } = useAppContext();

  return (
    <Box sx={{ display: "flex", flexGrow: 1, height: "100vh" }}>
      <Tabs
        orientation="vertical"
        value={selectedTab}
        onChange={(_, value) => setSelectedTab(value)}
      >
        <Tab label="Projects" value={TabValue.PROJECTS} />
        <Tab label="Expenses" value={TabValue.EXPENSES} />
      </Tabs>
      <Container>
        {selectedTab === TabValue.PROJECTS && <Projects />}
        {selectedTab === TabValue.EXPENSES && <Expenses />}
      </Container>
    </Box>
  );
};

const App = () => {
  return (
    <AppContextProvider>
      <Content />
    </AppContextProvider>
  );
};

export default App;
