import { createRoot } from 'react-dom/client';
import React from 'react';
import ToDo from './components/todo';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<ToDo />);
