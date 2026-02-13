import { useState, useCallback, useEffect } from 'react';
import './QuestionPage.css';

const NO_PHRASES = [
  'Ні',
  'Впевнена?',
  'Точно впевнена?',
  'Подумай ще раз!',
  'Останній шанс!',
  'Та ну, серйозно?',
  'Ти можеш пошкодувати!',
  'Ну подумай ще!',
  'Ти що, серйозно?!',
  'Тисни Так, я знаю що ти хочеш!',
];

const REACTION_GIFS = [
  'https://media.giphy.com/media/sXv0vaA4331Ti/giphy.gif',              // puss in boots cute pleading eyes
  'https://media.giphy.com/media/OPU6wzx8JrHna/giphy.gif',              // sad puppy eyes
  'https://media.giphy.com/media/ISOckXUybVfQ4/giphy.gif',              // upset
  'https://media.giphy.com/media/BEob5qwFkSJ7G/giphy.gif',              // angry
  'https://media.giphy.com/media/lD2qFeJzjtG52UDtCm/giphy.gif',         // fuming angry cat
];

// Preload all GIFs into browser cache immediately
REACTION_GIFS.forEach((url) => {
  const img = new Image();
  img.src = url;
});

export default function QuestionPage({ onYes }) {
  const [noCount, setNoCount] = useState(0);
  const [gifLoaded, setGifLoaded] = useState(false);

  // Also preload via link tags for priority fetching
  useEffect(() => {
    REACTION_GIFS.forEach((url) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
    });
  }, []);

  const handleNoHover = useCallback(() => {
    setNoCount((prev) => {
      const next = prev + 1;
      // Only reset gifLoaded if the gif will actually change
      if (next < REACTION_GIFS.length) {
        setGifLoaded(false);
      }
      return next;
    });
  }, []);

  const getNoButtonStyle = () => {
    if (noCount === 0) return {};

    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    const padding = 80;

    const x = Math.random() * (viewportW - padding * 2) + padding;
    const y = Math.random() * (viewportH - padding * 2) + padding;

    return {
      position: 'fixed',
      left: `${x}px`,
      top: `${y}px`,
      transform: 'translate(-50%, -50%)',
    };
  };

  const noText = NO_PHRASES[Math.min(noCount, NO_PHRASES.length - 1)];
  const reactionGif = REACTION_GIFS[Math.min(noCount, REACTION_GIFS.length - 1)];

  return (
    <div className="question-page">
      <div className="floating-hearts">
        {[...Array(20)].map((_, i) => (
          <span key={i} className="floating-heart" style={{ '--i': i }}>
            ❤️
          </span>
        ))}
      </div>

      <div className="question-content">
        <h1 className="question-title">Будеш моєю Валентинкою?</h1>

        <div className="gif-container">
          <img
            key={reactionGif}
            src={reactionGif}
            alt="Please say yes"
            className={`reaction-gif ${gifLoaded ? 'loaded' : ''}`}
            onLoad={() => setGifLoaded(true)}
            onError={() => setGifLoaded(true)}
          />
        </div>

        <div className="button-container">
          <button
            className="btn btn-yes"
            onClick={onYes}
          >
            Так!
          </button>

          <button
            className="btn btn-no"
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoHover}
            style={getNoButtonStyle()}
          >
            {noText}
          </button>
        </div>
      </div>
    </div>
  );
}
