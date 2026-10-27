const mediaRoot = '/images/projects/wisdom/';

export const wisdomFeatures = [
  {
    id: 'blueprint', name: '3D Blueprint Editor',
    description: 'An admin 3D workspace for inspecting furniture in different view modes, switching between normal and exploded views, accessing properties and tools, and using the furniture library.',
    media: [
      { type: 'image', src: mediaRoot + 'blueprint-editor.png', alt: 'WISDOM Mini Shelve 3D workspace with the Furniture Library on the left, normal and exploded view controls, and properties and tools on the right', caption: '3D Blueprint Editor', provenance: 'User-provided WISDOM screenshot' },
    ],
  },
  {
    id: 'templates', name: 'Furniture Templates',
    description: 'Create and arrange furniture designs using templates and 3D construction tools.',
    media: [
      { type: 'image', src: mediaRoot + 'furniture-templates-workspace.png', alt: 'WISDOM 3D workspace with a mini shelving unit, wardrobes, a wooden coffee table and dining table, and furniture construction tools on the right', caption: 'Furniture Templates — 3D Workspace', provenance: 'User-provided WISDOM screenshot' },
    ],
  },
  {
    id: 'ar', name: 'AR Furniture Preview',
    description: 'A device-dependent furniture preview that opens the model in a supported mobile AR viewer.',
    mediaNote: 'Actual desktop AR handoff screen only. The captured QR link is temporary and may have expired. A real on-device AR recording is still needed; room placement is not demonstrated here.',
    media: [
      { type: 'image', src: mediaRoot + 'ar-desktop-handoff.png', alt: 'WISDOM public AR handoff dialog with QR code, furniture dimensions and mobile viewing instructions', caption: 'Actual public AR launch dialog — desktop-to-phone handoff, not an in-room AR demonstration.', provenance: 'Public website capture · October 27, 2026 · temporary viewing link' },
    ],
  },
  {
    id: 'sales', name: 'Sales Management',
    description: 'Authorized staff can review sales reports by period, sales channel, and payment method.',
    mediaNote: 'Public preview sanitized: customer identities, order references, financial figures, and account information are permanently redacted.',
    media: [
      { type: 'image', src: mediaRoot + 'sales-report-sanitized.png', alt: 'Sanitized WISDOM Sales Report interface showing report filters and financial-status column headings with private records redacted', caption: 'Sales Management and Reporting', provenance: 'User-provided WISDOM screenshot; sanitized public copy' },
    ],
  },
  {
    id: 'inventory', name: 'Inventory Management',
    description: 'Inventory tools manage raw materials and ready-made build materials, with stock availability, reorder information, and inventory reports.',
    mediaNote: 'Public previews sanitized: business records, stock quantities, supplier pricing, product costs, and account information are permanently redacted.',
    media: [
      { type: 'image', src: mediaRoot + 'inventory-raw-materials-sanitized.png', alt: 'Sanitized WISDOM Raw Materials interface with category and stock filters plus quantity, reorder and stock-status column headings', caption: 'Raw Materials Management', provenance: 'User-provided WISDOM screenshot; sanitized public copy' },
      { type: 'image', src: mediaRoot + 'inventory-build-materials-sanitized.png', alt: 'Sanitized WISDOM Build Materials interface with product filters and price, cost, profit and available-stock column headings', caption: 'Build Materials Management', provenance: 'User-provided WISDOM screenshot; sanitized public copy' },
      { type: 'image', src: mediaRoot + 'inventory-report-sanitized.png', alt: 'Sanitized WISDOM Inventory Report with raw-material and ready-made tabs, summary-card headings, stock filters and reporting controls', caption: 'Inventory Reporting', provenance: 'User-provided WISDOM screenshot; sanitized public copy' },
    ],
  },
  {
    id: 'customization', name: 'Customer Customization',
    description: 'Customers browse published furniture designs and inspect a 3D preview with the size and finish options available for that design.',
    media: [
      { type: 'image', src: mediaRoot + 'customer-designs.png', alt: 'Public WISDOM customization catalogue with furniture designs and Customize buttons', caption: 'Choose a design — actual public customization catalogue.', provenance: 'Public website capture · October 27, 2026' },
      { type: 'image', src: mediaRoot + 'customer-editor.png', alt: 'WISDOM customer 3D furniture preview showing shelf dimensions and design controls', caption: 'Inspect the design — customer preview with dimensions and available controls.', provenance: 'Public website capture · October 27, 2026' },
    ],
  },
  {
    id: 'ordering', name: 'Ready-Made Furniture Ordering',
    description: 'Customers can browse ready-made furniture by category, view product details, and add products to their cart.',
    media: [
      { type: 'image', src: mediaRoot + 'ready-made-categories.png', alt: 'WISDOM Shop by Category page showing bedroom, kitchen, bathroom, office, living room, dining room, wardrobe and storage categories; private account header redacted', caption: 'Browse Furniture Categories', provenance: 'User-provided WISDOM screenshot; account information redacted' },
      { type: 'image', src: mediaRoot + 'ready-made-catalog.png', alt: 'WISDOM Product Catalog with category filters, furniture listings, public prices, stock and View and Add to Cart buttons; private account header redacted', caption: 'Ready-Made Product Catalog', provenance: 'User-provided WISDOM screenshot; account information redacted' },
    ],
  },
  {
    id: 'appointments', name: 'Appointment Booking',
    description: 'Customers can request consultations or site measurements and select from available appointment schedules.',
    mediaNote: 'Historical interface capture; the dates and time slots shown do not represent current availability.',
    media: [
      { type: 'image', src: mediaRoot + 'appointment-scheduling.png', alt: 'WISDOM appointment form with Consultation and Site Measurement options, empty project description and notes fields, and a historical calendar with selectable time slots; private account header redacted', caption: 'Consultation & Site Measurement Scheduling', provenance: 'User-provided WISDOM screenshot; historical schedule; account information redacted' },
    ],
  },
];
