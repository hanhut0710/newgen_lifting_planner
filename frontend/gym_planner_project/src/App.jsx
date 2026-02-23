import { useState } from 'react';
import { Sidebar } from './components/Sidebar.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { SchedulePage } from './pages/SchedulePage.jsx';
import { CalculatorPage } from './pages/CalculatorPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { CreatePlanModal } from './components/CreatePlanModal.jsx';
import { SwitchPlanModal } from './components/SwitchPlanModal.jsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <DashboardPage />;
      case 'schedule':
        return <SchedulePage onSwitchPlan={() => setIsSwitchModalOpen(true)} />;
      case 'calculator':
        return <CalculatorPage />;
      case 'stats':
        return <DashboardPage />; // Placeholder
      case 'profile':
        return <DashboardPage />; // Placeholder
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onNewWorkout={() => setIsCreateModalOpen(true)}
      />

      <main className="flex-1 flex flex-col overflow-y-auto hide-scrollbar">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-6 bg-background-light dark:bg-background-dark border-b border-slate-200 dark:border-primary/10 sticky top-0 z-30 backdrop-blur-md bg-opacity-80">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-background-dark font-bold text-sm">fitness_center</span>
            </div>
            <span className="font-black tracking-tighter text-slate-900 dark:text-white">FitSync</span>
          </div>
          <button className="material-symbols-outlined text-primary">menu</button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <CreatePlanModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <SwitchPlanModal
        isOpen={isSwitchModalOpen}
        onClose={() => setIsSwitchModalOpen(false)}
      />
    </div>
  );
}
