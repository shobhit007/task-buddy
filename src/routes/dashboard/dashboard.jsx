import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Sidebar from "../../components/sidebar/sidebar.component";
import Home from "../../components/home/home.component";
import Tasks from "../../components/all-tasks/all-tasks.component";

import TaskModal from "../../components/task-modal/task-modal.component";
import FloatingButton from "../../components/floating-button/floating-button.component";
import Categories from "../../components/categories/categories.component";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => setShowModal((p) => !p);

  return (
    <div className="lg:flex lg:h-screen overflow-hidden">
      <Sidebar onOpenModal={handleModal} />
      {showModal && <TaskModal onCloseModal={() => setShowModal(false)} />}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/tasks">
          <Route index element={<Tasks />} />
          <Route path=":list_name" element={<Categories />} />
        </Route>
      </Routes>
      <FloatingButton onClick={() => setShowModal(true)} />
    </div>
  );
}

export default Dashboard;
