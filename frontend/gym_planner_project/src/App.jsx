import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import { Sidebar } from './components/Sidebar.jsx'
import { DashboardPage } from './pages/DashboardPage.jsx'
import { SchedulePage } from './pages/SchedulePage.jsx'
import { CalculatorPage } from './pages/CalculatorPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'

import { CreatePlanModal } from './components/CreatePlanModal.jsx'
import { SwitchPlanModal } from './components/SwitchPlanModal.jsx'
import { AddExerciseModal } from './components/AddExerciseModal.jsx'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false)
  const [isAddExerciseModalOpen, setIsAddExerciseModalOpen] = useState(false)

  const location = useLocation()

  // Simple auth check (temporary)
  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
      </Routes>
    )
  }

  return (
    <div className="flex min-h-screen dark:bg-background-dark">

      <Sidebar onNewWorkout={() => setIsCreateModalOpen(true)} />

      <main className="flex-1 flex flex-col overflow-y-auto hide-scrollbar">

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-6 bg-background-light dark:bg-background-dark border-b border-slate-200 dark:border-primary/10 sticky top-0 z-30 backdrop-blur-md bg-opacity-80">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-background-dark font-bold text-sm">
                fitness_center
              </span>
            </div>
            <span className="font-black tracking-tighter text-slate-900 dark:text-white">
              FitSync
            </span>
          </div>
          <button className="material-symbols-outlined text-primary">
            menu
          </button>
        </div>

        {/* Animated Routes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            <Routes location={location}>
              <Route path="/" element={<DashboardPage />} />
              < Route
                path="/schedule"
                element={
                  <SchedulePage
                    onSwitchPlan={() => setIsSwitchModalOpen(true)}
                    onAddExercise={() => setIsAddExerciseModalOpen(true)}
                  />
                }
              />

              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/stats" element={<DashboardPage />} />
              <Route path="/profile" element={<DashboardPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Modals */}
      <CreatePlanModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <SwitchPlanModal
        isOpen={isSwitchModalOpen}
        onClose={() => setIsSwitchModalOpen(false)}
      />

      <AddExerciseModal
        isOpen={isAddExerciseModalOpen}
        onClose={() => setIsAddExerciseModalOpen(false)}
      />
    </div>
  )
}