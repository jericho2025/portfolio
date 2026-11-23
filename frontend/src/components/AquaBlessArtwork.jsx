export default function AquaBlessArtwork({ compact = false }) {
  return (
    <div className={compact ? 'aquabless-art aquabless-art--compact' : 'aquabless-art'} role="img" aria-label="AquaBless water ordering and delivery project preview">
      <div className="aquabless-art-shine" aria-hidden="true" />
      <div className="aquabless-art-brand" aria-hidden="true">
        <svg viewBox="0 0 64 80" className="aquabless-art-drop" focusable="false">
          <path d="M32 2C25 17 8 37 8 52a24 24 0 0 0 48 0C56 37 39 17 32 2Z" fill="#078cce" />
          <path d="M19 56c3 8 9 12 18 12 8 0 13-4 15-10-12 3-21-2-33-2Z" fill="#64bd42" />
          <path d="M21 38c-4 8-5 16-1 23" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".85" />
        </svg>
        <div className="aquabless-art-name"><span>AQUA</span><span>BLESS</span></div>
        <p>Water Ordering &amp; Delivery System</p>
      </div>
      <div className="aquabless-art-pills" aria-hidden="true">
        <span>Customer orders</span><span>Operations</span><span>Deliveries</span>
      </div>
    </div>
  );
}
