import { useEffect, useRef, useState } from 'react';

function ImageViewer({ media, index, onChange, open, onClose }) {
  const dialog = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  useEffect(() => { setZoomed(false); }, [open, index]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  useEffect(() => {
    if (open && !dialog.current.open) dialog.current.showModal();
    if (!open && dialog.current.open) dialog.current.close();
  }, [open]);
  function handleKeyDown(event) {
    if (zoomed && event.target.closest('.lightbox-image-viewport')) return;
    if (event.key === 'ArrowLeft' && index > 0) { event.preventDefault(); onChange(index - 1); }
    if (event.key === 'ArrowRight' && index < media.length - 1) { event.preventDefault(); onChange(index + 1); }
  }
  const item = media[index];
  return (
    <dialog ref={dialog} className="feature-lightbox" aria-label="Enlarged feature screenshot" onClose={onClose} onKeyDown={handleKeyDown}>
      <div className="lightbox-toolbar"><p>{index + 1} / {media.length}</p><button type="button" aria-pressed={zoomed} onClick={() => setZoomed(z => !z)}>{zoomed ? 'Fit screenshot' : 'Zoom to actual size'}</button><button type="button" onClick={onClose} autoFocus>Close viewer</button></div>
      {open && item?.type === 'image' && <div className={`lightbox-image-viewport${zoomed ? ' is-zoomed' : ''}`} tabIndex={zoomed ? 0 : undefined} aria-label={zoomed ? 'Full-size screenshot. Scroll or swipe to pan.' : undefined}><img key={item.src} src={item.src} alt={item.alt} /></div>}
      <p className="lightbox-caption">{item?.caption}</p>
      {media.length > 1 && <div className="gallery-navigation"><button type="button" disabled={index === 0} onClick={() => onChange(index - 1)}>Previous screenshot</button><button type="button" disabled={index === media.length - 1} onClick={() => onChange(index + 1)}>Next screenshot</button></div>}
    </dialog>
  );
}

export default function FeatureMediaGallery({ media, missingMedia }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState({});
  const item = media[index];
  if (!item) return <div className="feature-media-pending"><p className="eyebrow">Media pending</p><p>{missingMedia}</p></div>;
  const images = media.filter(entry => entry.type === 'image');
  const imageIndex = images.indexOf(item);
  return (
    <div className="feature-gallery" aria-label="Feature media gallery">
      <figure>
        {failed[index] ? <p className="feature-media-pending" role="status">This media could not be loaded. Please try another screenshot.</p> : item.type === 'video' ? (
          <video key={item.src} controls playsInline preload="metadata" aria-label={item.alt} onError={() => setFailed(current => ({ ...current, [index]: true }))}>
            <source src={item.src} type={item.mimeType || 'video/mp4'} />
            {item.captions && <track kind="captions" src={item.captions} srcLang="en" label="English" default />}
            Your browser does not support video playback.
          </video>
        ) : <button type="button" className="gallery-image-button" aria-label={`Enlarge: ${item.alt}`} onClick={() => setOpen(true)}><img key={item.src} src={item.src} alt={item.alt} loading="lazy" onError={() => setFailed(current => ({ ...current, [index]: true }))} /></button>}
        <figcaption aria-live="polite"><strong>{item.caption}</strong><span>{item.provenance}</span><span>{index + 1} of {media.length}</span></figcaption>
      </figure>
      <div className="gallery-navigation">{media.length > 1 && <button type="button" disabled={index === 0} onClick={() => setIndex(index - 1)}>Previous</button>}{item.type === 'image' && <button type="button" disabled={failed[index]} onClick={() => setOpen(true)}>Enlarge screenshot</button>}{media.length > 1 && <button type="button" disabled={index === media.length - 1} onClick={() => setIndex(index + 1)}>Next</button>}</div>
      {images.length > 0 && <ImageViewer media={images} index={Math.max(0, imageIndex)} onChange={next => setIndex(media.indexOf(images[next]))} open={open} onClose={() => setOpen(false)} />}
    </div>
  );
}
