import { useState, useEffect, useRef } from 'react';
import './CelebrationPage.css';

const LETTER_LINES = [
  'Моя найдорожча Анжелічка,',
  '',
  'Хочу розповісти тобі чому я тебе кохаю...',
  '',
  '💕 Мені подобається як ти посміхаєшся від цього все стає кращим.',
  '💕 Мені подобається твоя доброта і те, як ти піклуєшся про всіх навколо.',
  '💕 Мені подобається засинати і прокидатися поруч з тобою.',
  '💕 Мені подобається що з тобою навіть звичайні моменти стають особливими.',
  '💕 Мені подобається що ми все робимо разом.',
  '💕 Мені подобається що ти обрала мене.',
  '',
  'Кожен день з тобою це подарунок, і я б не поміняв це ні на що.',
  '',
  'А тепер йди мене обійми 🤗',
];

const CELEBRATION_GIF = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcW9wZjlta2d6NWRmeGpuczlhaWswdTB3Y2cybXh6bXN5MTJ5eW5iNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif';

export default function CelebrationPage() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showLetter, setShowLetter] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const letterRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowLetter(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showLetter) return;

    if (visibleLines < LETTER_LINES.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [showLetter, visibleLines]);

  useEffect(() => {
    if (letterRef.current) {
      letterRef.current.scrollTop = letterRef.current.scrollHeight;
    }
  }, [visibleLines]);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="celebration-page">
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <span key={i} className="confetti" style={{ '--j': i }} />
          ))}
        </div>
      )}

      <div className="celebration-content">
        <h1 className="yay-title">
          Урааа! 🎉💖🎉
        </h1>

        <p className="yay-subtitle">Я знав що ти скажеш так!</p>

        <div className="gif-container">
          <img
            src={CELEBRATION_GIF}
            alt="Happy celebration"
            className="celebration-gif"
          />
        </div>

        {showLetter && (
          <div className="letter-container" ref={letterRef}>
            <div className="letter-paper">
              {LETTER_LINES.slice(0, visibleLines).map((line, index) => (
                <p
                  key={index}
                  className={`letter-line ${line === '' ? 'letter-spacer' : ''} ${index === 0 ? 'letter-greeting' : ''}`}
                >
                  {line}
                </p>
              ))}
              {visibleLines < LETTER_LINES.length && (
                <span className="typewriter-cursor">|</span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="floating-hearts-celebration">
        {[...Array(15)].map((_, i) => (
          <span key={i} className="heart-float" style={{ '--k': i }}>
            {['❤️', '💕', '💖', '💗', '💘'][i % 5]}
          </span>
        ))}
      </div>
    </div>
  );
}
