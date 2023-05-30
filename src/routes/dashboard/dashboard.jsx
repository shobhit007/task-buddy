import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Sidebar from "../../components/sidebar/sidebar.component";
import Home from "../../components/home/home.component";
import Tasks from "../../components/all-tasks/all-tasks.component";
import CompltedTasks from "../../components/completed-tasks/completed-tasks.component";
import PendingTasks from "../../components/pending-tasks/pending-tasks.component";

import Header from "../../components/header/header.component";

import TaskModal from "../../components/task-modal/task-modal.component";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => setShowModal((p) => !p);

  return (
    <div className="lg:flex lg:h-screen overflow-hidden">
      <Sidebar onOpenModal={handleModal} />
      {showModal && (
        <div className="fixed inset-0 z-[9]">
          <div className="h-screen bg-[rgba(0,0,0,0.54)] lg:py-16 xl:py-20">
            <TaskModal onCloseModal={handleModal} />
          </div>
        </div>
      )}
      <Routes>
        <Route element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/completed" element={<CompltedTasks />} />
          <Route path="/pending" element={<PendingTasks />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Dashboard;
