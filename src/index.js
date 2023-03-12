import { createRoot } from "react-dom/client";
import Footer from "./components/footer";
import NewTaskForm from "./components/new-task-form";
import TaskList from "./components/task-list";

const ToDo = () => {
  return (
    <section className="todoapp">
      <NewTaskForm />
      <section className="main">
        <TaskList />
        <Footer />
      </section>
    </section>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<ToDo />);
