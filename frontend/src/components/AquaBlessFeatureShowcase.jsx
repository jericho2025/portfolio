import { useState } from 'react';

// Screens are real captures from the November 2025 AWODS case-study document.
// The shared image is a 3x3 grid; each position displays one documented screen.
export const aquablessScreens = [
  { id: 'login', name: 'Login & Accounts', description: 'The login page for customers and staff.', position: '0% 0%' },
  { id: 'products', name: 'Water Products', description: 'Customers can view available water products and their prices.', position: '50% 0%' },
  { id: 'cart', name: 'Shopping Cart', description: 'The cart shows selected items, quantities, and the order total.', position: '100% 0%' },
  { id: 'checkout', name: 'Checkout', description: 'Customers enter delivery details and review the order before placing it.', position: '0% 50%' },
  { id: 'records', name: 'Order Records', description: 'Customers can check previous orders and delivery status.', position: '50% 50%' },
  { id: 'orders', name: 'Order Management', description: 'Staff can review order details and assign a rider for delivery.', position: '100% 50%' },
  { id: 'dashboard', name: 'Admin Dashboard', description: 'The admin dashboard shows sales, orders, and basic stock details.', position: '0% 100%' },
  { id: 'inventory', name: 'Product Management', description: 'Admins can add water products and update stock information.', position: '50% 100%' },
  { id: 'payments', name: 'Payment Management', description: 'Staff can check cash and GCash payment records.', position: '100% 100%' },
];

export default function AquaBlessFeatureShowcase() {
  const [selectedId, setSelectedId] = useState(aquablessScreens[0].id);
  const selected = aquablessScreens.find(screen => screen.id === selectedId) || aquablessScreens[0];

  return (
    <section className="feature-showcase aquabless-feature-showcase" aria-labelledby="awods-preview-title">
      <h2 id="awods-preview-title">Feature Previews</h2>
      <div className="feature-selector" role="group" aria-label="Choose an AquaBless feature">
        {aquablessScreens.map(screen => (
          <button
            className="feature-card"
            type="button"
            key={screen.id}
            aria-pressed={screen.id === selected.id}
            aria-controls="selected-awods-feature"
            onClick={() => setSelectedId(screen.id)}
          >
            <strong>{screen.name}</strong>
            <span>1 preview</span>
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">Selected feature: {selected.name}</p>
      <section className="selected-feature" id="selected-awods-feature" aria-labelledby="awods-selected-title">
        <div className="feature-explanation">
          <h3 id="awods-selected-title">{selected.name}</h3>
          <p>{selected.description}</p>
        </div>
        <figure className="awods-screenshot-figure">
          <div
            role="img"
            className="awods-screenshot"
            aria-label={selected.name + ' screen from the AquaBless case study'}
            style={{ backgroundPosition: selected.position }}
          />
          <figcaption>{selected.name} — screenshot from the AWODS case study (2025). The live website may look different.</figcaption>
        </figure>
      </section>
    </section>
  );
}
