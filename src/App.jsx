import { useState } from 'react';
import QuestionPage from './components/QuestionPage';
import CelebrationPage from './components/CelebrationPage';

export default function App() {
  const [saidYes, setSaidYes] = useState(false);

  return saidYes ? <CelebrationPage /> : <QuestionPage onYes={() => setSaidYes(true)} />;
}
