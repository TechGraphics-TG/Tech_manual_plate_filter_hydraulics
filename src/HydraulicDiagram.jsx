import { useEffect, useState } from 'react';
import './HydraulicDiagram.css';

const points = [
  {
    id: 1,
    title: 'Point 1 — IAV01366 Cartridge Valve',
    legend: 'IAV01366 (Cartridge Valve)',
    image: '/hydraulic-diagram/image1.jpg',
    left: '23.0%',
    top: '17.5%',
  },
  {
    id: 2,
    title: 'Point 2 — IAV01354 Cartridge Valve',
    legend: 'IAV01354 (Directional Valve)',
    image: '/hydraulic-diagram/image2.jpg',
    left: '31.2%',
    top: '18.6%',
  },
  {
    id: 3,
    title: 'Point 3 — 4/2 Directional Control Valve',
    legend: '4/2 Directional Control Valve',
    image: '/hydraulic-diagram/image3.jpg',
    left: '64.5%',
    top: '68.9%',
  },
  {
    id: 4,
    title: 'Point 4 — 4/3 Directional Control Valve',
    legend: '4/3 Directional Control Valve',
    image: '/hydraulic-diagram/image4.jpg',
    left: '34.8%',
    top: '56.9%',
  },
  {
    id: 5,
    title: 'Point 5 — TA2.2 Plate Heat Exchanger',
    legend: 'TA2.2 Plate Heat Exchanger',
    image: '/hydraulic-diagram/image5.jpg',
    left: '79.3%',
    top: '23.7%',
  },
];

export default function HydraulicDiagram() {
  const [current, setCurrent] = useState(null);

  const openPoint = (id) => {
    setCurrent(points.find((point) => point.id === id) ?? null);
  };

  const closeModal = () => setCurrent(null);

  const goPrevious = () => {
    if (!current) return;
    const previous = points.find((point) => point.id === current.id - 1);
    if (previous) setCurrent(previous);
  };

  const goNext = () => {
    if (!current) return;
    const next = points.find((point) => point.id === current.id + 1);
    if (next) setCurrent(next);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!current) return;

      if (event.key === 'Escape') closeModal();
      if (event.key === 'ArrowLeft') goPrevious();
      if (event.key === 'ArrowRight') goNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [current]);

  return (
    <section className="hydraulic-diagram">
      <h2 className="hydraulic-diagram__title">
        Hydraulic Power Unit — Reference Diagram
      </h2>

      <p className="hydraulic-diagram__subtitle">
        Click any numbered point on the diagram or the buttons below to view its
        component reference sheet.
      </p>

      <div className="hydraulic-diagram__wrap">
        <img
          className="hydraulic-diagram__base"
          src="/hydraulic-diagram/image0.jpg"
          alt="Hydraulic Power Unit reference diagram"
        />

        {points.map((point) => (
          <button
            key={point.id}
            type="button"
            className="hydraulic-diagram__marker hydraulic-diagram__marker--pulse"
            style={{ left: point.left, top: point.top }}
            onClick={() => openPoint(point.id)}
            aria-label={`Open point ${point.id}: ${point.legend}`}
          >
            {point.id}
          </button>
        ))}
      </div>

      <div className="hydraulic-diagram__legend">
        {points.map((point) => (
          <button
            key={point.id}
            type="button"
            className="hydraulic-diagram__legend-button"
            onClick={() => openPoint(point.id)}
          >
            <span className="hydraulic-diagram__legend-number">{point.id}</span>
            {point.legend}
          </button>
        ))}
      </div>

      {current && (
        <div
          className="hydraulic-diagram__overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="hydraulic-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div className="hydraulic-diagram__modal">
            <div className="hydraulic-diagram__modal-header">
              <h3
                id="hydraulic-modal-title"
                className="hydraulic-diagram__modal-title"
              >
                <span className="hydraulic-diagram__modal-number">
                  {current.id}
                </span>
                {current.title}
              </h3>

              <button
                type="button"
                className="hydraulic-diagram__close"
                onClick={closeModal}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="hydraulic-diagram__modal-body">
              <img
                src={current.image}
                alt={`${current.title} reference`}
                className="hydraulic-diagram__reference-image"
              />
            </div>

            <div className="hydraulic-diagram__modal-nav">
              <button
                type="button"
                onClick={goPrevious}
                disabled={current.id === 1}
              >
                ← Previous
              </button>

              <button
                type="button"
                onClick={goNext}
                disabled={current.id === points.length}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
