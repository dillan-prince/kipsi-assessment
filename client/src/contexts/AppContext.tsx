import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Project, TabValue } from "../types";

type AppContextType = {
  selectedTab: TabValue;
  setSelectedTab: React.Dispatch<React.SetStateAction<TabValue>>;
  projects: Project[];
  fetchProjects: () => Promise<void>;
  isLoading: boolean;
};

const AppContext = createContext<AppContextType>({
  selectedTab: TabValue.PROJECTS,
  setSelectedTab: () => {},
  projects: [],
  fetchProjects: async () => {},
  isLoading: false,
});

export const AppContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [selectedTab, setSelectedTab] = useState<TabValue>(TabValue.PROJECTS);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProjects = async () => {
    setIsLoading(true);
    const response = await fetch("/api/projects");
    const data: Project[] = await response.json();

    setProjects(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (selectedTab === TabValue.PROJECTS) {
      fetchProjects();
    }
  }, [selectedTab]);

  return (
    <AppContext.Provider
      value={{
        selectedTab,
        setSelectedTab,
        projects,
        fetchProjects,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
