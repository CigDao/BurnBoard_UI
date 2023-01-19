import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

(BigInt.prototype as any).toJSON = function () {
	return this.toString();
};

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);
