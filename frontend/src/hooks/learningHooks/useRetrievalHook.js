import { useState, useEffect } from 'react';

const STORAGE_KEY = 'retrievalPracticeData';

const useRetrievalHook = () => {
  const [cards, setCards] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    return saved ? JSON.parse(saved).cards : [];
  });

  const [answers, setAnswers] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    return saved ? JSON.parse(saved).answers : { correct: [], incorrect: [] };
  });

  const [answeredCards, setAnsweredCards] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    return saved ? JSON.parse(saved).answeredCards : [];
  });

  useEffect(() => {
    const data = {
      cards,
      answers,
      answeredCards,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [cards, answers, answeredCards]);

  const addCard = (question, answer) => {
    const id = Date.now();
    setCards(prev => [...prev, { id, question, answer }]);
  };

  const deleteCard = (id) => {
    setCards(prev => prev.filter(c => c.id !== id));
    setAnswers(prev => ({
      correct: prev.correct.filter(i => i !== id),
      incorrect: prev.incorrect.filter(i => i !== id),
    }));
    setAnsweredCards(prev => prev.filter(i => i !== id));
  };

const updateCard = (id, newQuestion, newAnswer) => {
  setCards(prev =>
    prev.map(card =>
      card.id === id
        ? { ...card, question: newQuestion ?? card.question, answer: newAnswer ?? card.answer }
        : card
    )
  );
};

const submitAnswer = (id, isCorrect) => {
    setAnswers(prev => ({
      correct: prev.correct.filter(i => i !== id),
      incorrect: prev.incorrect.filter(i => i !== id),
    }));
    
    if (isCorrect !== null) {
      const target = isCorrect ? 'correct' : 'incorrect';
      setAnswers(prev => ({
        ...prev,
        [target]: [...prev[target], id],
      }));
      setAnsweredCards(prev => [...prev, id]);
    } else {
      setAnsweredCards(prev => prev.filter(i => i !== id));
    }
  };

  const getAccuracy = () => {
    const total = answers.correct.length + answers.incorrect.length;
    return total ? Math.round((answers.correct.length / total) * 100) : 0;
  };

  const resetAllData = () => {
    setCards([]);
    setAnswers({ correct: [], incorrect: [] });
    setAnsweredCards([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    cards,
    answers,
    addCard,
    deleteCard,
    submitAnswer,
    getAccuracy,
    answeredCards,
    resetAllData,
    updateCard
  };
};

export default useRetrievalHook;