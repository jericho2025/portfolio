import { useState } from 'react';
import { wisdomFeatures } from '../data/wisdomFeatures.js';
import FeatureMediaGallery from './FeatureMediaGallery.jsx';

export default function WisdomFeatureShowcase() {
  const [selectedId, setSelectedId] = useState(wisdomFeatures[0].id);
  const selected = wisdomFeatures.find(feature => feature.id === selectedId) || wisdomFeatures[0];
  return (
    <section className="feature-showcase" aria-labelledby="explore-features-title">
      <h2 id="explore-features-title">Feature Previews</h2>
      <div className="feature-selector" role="group" aria-label="Choose a WISDOM feature">
        {wisdomFeatures.map(feature => <button className="feature-card" type="button" key={feature.id} aria-pressed={selected.id === feature.id} aria-controls="selected-feature" onClick={() => setSelectedId(feature.id)}><strong>{feature.name}</strong><span>{feature.media.length ? `${feature.media.length} ${feature.media.length === 1 ? 'preview' : 'previews'}` : 'Media pending'}</span></button>)}
      </div>
      <p className="sr-only" role="status">Selected feature: {selected.name}</p>
      <section id="selected-feature" className="selected-feature" aria-labelledby="selected-feature-title">
        <div className="feature-explanation"><h3 id="selected-feature-title">{selected.name}</h3><p>{selected.description}</p></div>
        {selected.mediaNote && <p className="feature-media-note">{selected.mediaNote}</p>}
        <FeatureMediaGallery key={`${selected.id}:${selected.media.map(item => item.src).join('|')}`} media={selected.media} missingMedia={selected.missingMedia} />
      </section>
    </section>
  );
}
