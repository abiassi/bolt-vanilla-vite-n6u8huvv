import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import WeeklyCalendar from './components/WeeklyCalendar';
import PostModal from './components/PostModal';
import CalendarHeader from './components/CalendarHeader';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Content Calendar
            </h1>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 py-6">
          <CalendarHeader />
          <WeeklyCalendar />
          <PostModal />
        </main>
      </div>
    </DndProvider>
  );
}

export default App;