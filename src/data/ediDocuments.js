// EDI transaction set reference, rendered at /edi/ and /edi/[doc]/.
//
// Plain-language explanations of the common X12 documents a supplier,
// distributor or 3PL exchanges, and how each maps to NetSuite. Names and
// purposes of transaction sets are public; the detailed segment specifications
// are licensed by X12, so pages explain in our own words and never copy them.
//
// The quality gate at the bottom throws at build time if a published entry is
// thin, like netsuiteTopics.js.

export const STAGES = {
  order: 'Ordering',
  ship: 'Shipping',
  bill: 'Billing & payment',
  catalog: 'Catalog & inventory',
  warehouse: '3PL & warehouse',
  transport: 'Transportation',
  ack: 'Acknowledgments',
};

export const ediDocuments = [
  {
    code: '850',
    name: 'Purchase Order',
    stage: 'order',
    from: 'Buyer (retailer or distributor)',
    to: 'Supplier',
    netsuite: 'Sales order (inbound); purchase order (outbound, when you buy by EDI)',
    title: 'EDI 850 Purchase Order: What It Is and How It Works',
    summary: 'The buyer’s order: what they want, how many, at what price, and where and when to ship it. It starts almost every EDI trading relationship.',
    about: [
      'The 850 is the electronic version of a purchase order. A retailer or distributor sends it to a supplier to order goods, and for most suppliers it is the first EDI document they receive and the one that triggers everything after it: the acknowledgment, the ship notice and the invoice.',
      'Each 850 carries the buyer’s PO number, which the supplier must quote back on every later document. Large buyers often send several kinds of 850 (standalone orders, bulk orders to be split across stores, drop-ship orders to consumers), and the trading partner’s implementation guide says which fields each kind uses.',
    ],
    carries: [
      'The buyer’s PO number, order date and order type',
      'Ship-to and bill-to locations, often as the buyer’s store or warehouse codes',
      'Line items with quantities, units of measure and the price the buyer expects to pay',
      'Item identifiers: UPC or GTIN, the buyer’s item number, and sometimes your SKU',
      'Requested ship or delivery dates, cancel-after dates, and shipping instructions',
      'Terms such as payment terms, allowances and routing requirements',
    ],
    flow: { before: ['832', '846'], after: ['855', '856', '860'] },
    netsuiteDetail:
      'An inbound 850 becomes a NetSuite sales order. Store the buyer’s PO number as the order’s external ID so a resent 850 is rejected instead of duplicated, and resolve the buyer’s item numbers through a per-partner cross-reference rather than by item name. Ship-to store codes usually map to customer addresses or a custom record of locations.',
    mistakes: [
      'Creating a second sales order when the buyer resends the same 850; match on the PO number first.',
      'Accepting the buyer’s price silently when it differs from your price level, then invoicing at your price and getting short-paid.',
      'Ignoring the cancel-after date, so an order that ships late is refused or charged back.',
    ],
    faqs: [
      { q: 'What is an EDI 850?', a: 'The EDI 850 is the X12 purchase order: the document a buyer sends a supplier to order goods, listing items, quantities, prices, ship-to locations and dates.' },
      { q: 'What document follows an 850?', a: 'Usually an 855 purchase order acknowledgment from the supplier, then an 856 advance ship notice when the order ships and an 810 invoice to bill it. Changes to the order arrive as an 860.' },
    ],
  },
  {
    code: '855',
    name: 'Purchase Order Acknowledgment',
    stage: 'order',
    from: 'Supplier',
    to: 'Buyer',
    netsuite: 'Generated from the sales order after review',
    title: 'EDI 855 Purchase Order Acknowledgment Explained',
    summary: 'The supplier’s reply to an 850: accepted, changed or rejected, line by line, so the buyer knows what will actually ship.',
    about: [
      'The 855 tells the buyer what happened to their purchase order. It can accept the whole order, accept it with changes such as a different quantity, date or price on some lines, or reject it. Many retailers require it within a set time after the 850, often a day or two.',
      'For the buyer, the 855 is how they learn about shortages before the truck arrives. For the supplier, it is the moment to flag problems such as a discontinued item or a price mismatch, while they can still be fixed without a chargeback.',
    ],
    carries: [
      'The buyer’s PO number it responds to',
      'An overall status: accepted, accepted with changes, or rejected',
      'Line-level status for each item, with changed quantities, dates or prices',
      'The supplier’s own order reference',
    ],
    flow: { before: ['850'], after: ['856', '860'] },
    netsuiteDetail:
      'The 855 is built from the NetSuite sales order once someone, or a rule, has checked stock and prices. Keep the line-level decisions on the order (for example in a custom column) so the 855 reports exactly what was decided, and so the 856 and 810 later match it.',
    mistakes: [
      'Sending an automatic “accept everything” 855 before checking stock, then shipping short.',
      'Changing quantities on the sales order without sending an updated status, so the buyer’s system expects the original quantity.',
      'Missing the partner’s deadline for the 855, which some retailers fine.',
    ],
    faqs: [
      { q: 'Is the 855 required?', a: 'It depends on the trading partner. Many large retailers require it, some only for certain order types, and some don’t use it at all. Their implementation guide says which.' },
      { q: 'What is the difference between an 855 and a 997?', a: 'A 997 only confirms that a document arrived and could be read. An 855 is a business answer to the order: what you will ship, at what price and when.' },
    ],
  },
  {
    code: '860',
    name: 'Purchase Order Change Request (Buyer Initiated)',
    stage: 'order',
    from: 'Buyer',
    to: 'Supplier',
    netsuite: 'Changes to an existing sales order',
    title: 'EDI 860 Purchase Order Change: What It Is and How to Handle It',
    summary: 'The buyer changing an order they already sent: quantities, dates, ship-to, added or cancelled lines, or the whole order.',
    about: [
      'An 860 changes a purchase order after it has been sent. Buyers use it to add or cancel lines, change quantities or dates, move the ship-to location, or cancel the whole order. It refers back to the original PO number.',
      'Changes are where suppliers most often get caught out, because the order may already be picked, packed or shipped. Some partners expect a reply to an 860, usually an 865, accepting or rejecting the change.',
    ],
    carries: [
      'The original PO number and a change sequence or date',
      'What kind of change: add, cancel, replace or change quantity, price or date',
      'The affected lines and their new values',
      'Header changes such as a new ship-to or a cancelled order',
    ],
    flow: { before: ['850', '855'], after: ['856'] },
    netsuiteDetail:
      'Apply an 860 to the existing NetSuite sales order, matched by the PO number, never as a new order. If the order is already partly fulfilled, the change needs a rule or a person to decide what happens to the lines that have shipped and the ones that haven’t; a quantity cut below what already shipped can’t simply be applied.',
    mistakes: [
      'Importing an 860 as a new sales order, so the buyer gets the original and the changed order.',
      'Applying a change to an order that already shipped, then sending an ASN and invoice that don’t match either version.',
      'Processing changes out of order when two 860s arrive close together.',
    ],
    faqs: [
      { q: 'What is an EDI 860?', a: 'The EDI 860 is a buyer-initiated purchase order change: it modifies or cancels a purchase order (850) that was already sent.' },
      { q: 'Do I have to respond to an 860?', a: 'Some trading partners require a response, usually an 865 purchase order change acknowledgment; others only expect you to follow the change. Check the partner’s implementation guide.' },
    ],
  },
  {
    code: '856',
    name: 'Ship Notice/Manifest (ASN)',
    stage: 'ship',
    from: 'Supplier (or its 3PL)',
    to: 'Buyer',
    netsuite: 'Item fulfillment, with package and carton details',
    title: 'What Is an ASN? The EDI 856 Advance Ship Notice Explained',
    summary: 'The advance ship notice: what is in each carton and pallet, sent before the shipment arrives so the buyer can receive it by scanning labels.',
    about: [
      'An ASN (advance ship notice) is the EDI 856. The supplier sends it when an order ships, before it arrives, describing exactly what is coming: which orders, which items, how many, and in which cartons and pallets. The buyer’s distribution center uses it to receive the shipment by scanning carton labels instead of opening boxes.',
      'Because receiving depends on it, the 856 is the document retailers enforce most strictly. A missing, late or inaccurate ASN slows down the dock, and most large retailers charge suppliers for that as a compliance chargeback. The carton labels, usually GS1-128 with a serial shipping container code (SSCC), must match the ASN exactly.',
      'ASNs are usually built as a hierarchy: shipment, then order, then pallet or carton, then item. Partners differ on which levels they want, so the same shipment can need differently shaped ASNs for different customers.',
    ],
    carries: [
      'Shipment details: ship date, carrier, tracking or bill of lading number, weight',
      'The buyer’s PO numbers included in the shipment',
      'Pallets and cartons, each with its label serial number (SSCC)',
      'The items and quantities packed in each carton',
      'Ship-from and ship-to locations',
    ],
    flow: { before: ['850', '855', '945'], after: ['810', '214'] },
    netsuiteDetail:
      'The 856 is built from the NetSuite item fulfillment. The hard part is carton data: NetSuite’s standard fulfillment knows items and packages but not necessarily which items are in which carton, so pack data usually comes from a packing app, the warehouse system or a 3PL’s 945, and must be stored before the ASN is sent. The same data should print the carton labels.',
    mistakes: [
      'Building the ASN from what was ordered rather than what was packed, so cartons don’t match the notice.',
      'Printing labels from one system and sending the ASN from another, with serial numbers that don’t match.',
      'Sending the ASN after the truck has arrived; most retailers set a deadline relative to shipment or arrival.',
    ],
    faqs: [
      { q: 'What is an ASN in shipping?', a: 'An ASN, or advance ship notice, is an electronic notice of what a shipment contains, sent before it arrives. In EDI it is the X12 856 document. (In networking, ASN also means an autonomous system number, which is unrelated.)' },
      { q: 'Why do retailers charge back for ASNs?', a: 'Their receiving process depends on the ASN matching the cartons. If it is late, missing or wrong, the dock has to check boxes by hand, and retailers pass that cost back to the supplier as a chargeback.' },
      { q: 'What is the difference between an 856 and a 945?', a: 'The 856 goes from the supplier to the buyer describing the shipment. The 945 goes from a 3PL warehouse back to the supplier confirming what it shipped. A supplier using a 3PL often builds the 856 from the 945.' },
    ],
  },
  {
    code: '810',
    name: 'Invoice',
    stage: 'bill',
    from: 'Supplier',
    to: 'Buyer',
    netsuite: 'Invoice',
    title: 'EDI 810 Invoice: What It Is and How to Get Paid on Time',
    summary: 'The supplier’s bill for what shipped, matched by the buyer against the PO and the ASN before it is paid.',
    about: [
      'The 810 is the electronic invoice. The supplier sends it after shipping, and the buyer’s accounts payable system matches it against the purchase order and the receipt, which is based on the ASN. Lines that don’t match are held or short-paid.',
      'Most invoice problems come from differences that started earlier: a price on the 850 that didn’t match your price list, a quantity changed by an 860, or an ASN that didn’t match what was received.',
    ],
    carries: [
      'Invoice number and date, and the buyer’s PO number',
      'Line items with quantities shipped and unit prices',
      'Allowances and charges, such as freight or promotional discounts',
      'Payment terms and the total amount due',
    ],
    flow: { before: ['856'], after: ['820', '997'] },
    netsuiteDetail:
      'Generate the 810 from the NetSuite invoice created when the order is billed, one invoice per shipment for most retail partners. Prices should come from the PO price agreed on the 855, not recalculated from your price level, or the buyer’s three-way match fails.',
    mistakes: [
      'Invoicing your list price when the buyer’s PO had a different price; the difference becomes a deduction.',
      'Invoicing before the ASN was accepted, or invoicing quantities that weren’t on the ASN.',
      'Combining several shipments into one invoice when the partner expects one per ASN.',
    ],
    faqs: [
      { q: 'What is an EDI 810?', a: 'The EDI 810 is the X12 invoice: the bill a supplier sends a buyer for goods shipped, matched against the purchase order and the receipt before payment.' },
      { q: 'Why was my EDI invoice short-paid?', a: 'Usually because a price, quantity or allowance on the 810 didn’t match the buyer’s PO or what they received. The payment advice (820) or a deduction report shows which lines were reduced.' },
    ],
  },
  {
    code: '820',
    name: 'Payment Order/Remittance Advice',
    stage: 'bill',
    from: 'Buyer',
    to: 'Supplier',
    netsuite: 'Customer payment applied to invoices, with deductions',
    title: 'EDI 820 Remittance Advice: Matching Payments to Invoices',
    summary: 'The buyer’s note of what it is paying: which invoices, how much, and any deductions taken.',
    about: [
      'The 820 tells the supplier what a payment covers. A large customer may pay hundreds of invoices in one transfer, and the 820 lists each invoice, the amount paid, and any deductions such as chargebacks, allowances or short-payments.',
      'Without it, someone in accounts receivable matches payments to invoices by hand. With it, cash application can be mostly automatic, and deductions become visible the day they are taken.',
    ],
    carries: [
      'Payment amount, date and method',
      'The invoices being paid, by number',
      'The amount paid against each invoice',
      'Adjustments and deductions, with reason codes',
    ],
    flow: { before: ['810'], after: [] },
    netsuiteDetail:
      'An 820 maps to a NetSuite customer payment applied to the listed invoices. Deductions need a decision: leave the invoice partly open, post the difference to a deductions account, or create a credit memo, and record the reason code so disputes can be tracked.',
    mistakes: [
      'Applying the payment to the oldest invoices instead of the ones listed, so the wrong invoices stay open.',
      'Writing off deductions without recording the reason code, which makes disputes impossible later.',
    ],
    faqs: [
      { q: 'What is an EDI 820?', a: 'The EDI 820 is the X12 payment order/remittance advice: it lists the invoices a payment covers and any deductions the buyer took.' },
      { q: 'Does the 820 move money?', a: 'Not by itself. The payment travels through the bank (for example by ACH); the 820 is the detail of what that payment is for, sent alongside it.' },
    ],
  },
  {
    code: '846',
    name: 'Inventory Inquiry/Advice',
    stage: 'catalog',
    from: 'Supplier (or 3PL)',
    to: 'Buyer (or supplier)',
    netsuite: 'Item availability by location',
    title: 'EDI 846 Inventory Advice: Sharing Stock Levels by EDI',
    summary: 'Stock levels shared by EDI: how much of each item is available, so retailers and marketplaces don’t sell what you can’t ship.',
    about: [
      'The 846 shares inventory. Suppliers send it to retailers that sell their products online or drop-ship them, so the retailer only sells what the supplier has. 3PLs also send it to suppliers to report what is in the warehouse.',
      'It is usually sent on a schedule, often daily or several times a day. The value of the document depends on how fresh and how accurate the quantity is.',
      'Retailers that drop-ship (sell online and have the supplier ship to the consumer) depend on it most: their website shows your 846 quantity as stock. Some partners also ask for future availability, such as quantities arriving on open purchase orders and their dates.',
    ],
    carries: [
      'Items, by UPC, SKU or the buyer’s item number',
      'Quantity available, and sometimes quantity on order or expected dates',
      'The location or warehouse the quantity applies to',
      'The date and time the quantities were taken',
    ],
    flow: { before: [], after: ['850'] },
    netsuiteDetail:
      'Build the outbound 846 from NetSuite available quantities (on hand minus committed) for the locations that serve that partner, minus any safety stock you hold back. An inbound 846 from a 3PL should be compared with NetSuite and the differences reviewed, not used to overwrite NetSuite silently.',
    mistakes: [
      'Sending on-hand instead of available quantity, so stock already committed to other orders is sold twice.',
      'Sending an 846 too rarely for fast-moving items, so the retailer oversells between updates.',
    ],
    faqs: [
      { q: 'What is an EDI 846?', a: 'The EDI 846 is the X12 inventory inquiry/advice: a report of item quantities available, used by suppliers, retailers and 3PLs to share stock levels.' },
      { q: 'How often should an 846 be sent?', a: 'As often as the trading partner asks, typically daily for store replenishment and more often for drop-ship and ecommerce, where overselling is costly.' },
    ],
  },
  {
    code: '832',
    name: 'Price/Sales Catalog',
    stage: 'catalog',
    from: 'Supplier',
    to: 'Buyer',
    netsuite: 'Item records and prices',
    title: 'EDI 832 Price/Sales Catalog: Sending Item Data by EDI',
    summary: 'The supplier’s catalog sent by EDI: items, descriptions, identifiers and prices, set up before the buyer can order them.',
    about: [
      'The 832 sends product information: new items, descriptions, identifiers, dimensions and prices. Buyers use it to set items up in their systems so they can order them, and some require it for every new or changed item.',
      'Because it feeds the buyer’s item master, mistakes in an 832 show up later as orders the supplier can’t match, or as prices the buyer disputes.',
      'Item setup is often the slowest part of onboarding with a new retailer, because every identifier, pack size and price has to agree between both systems before the first order can be processed cleanly.',
    ],
    carries: [
      'Item identifiers: UPC or GTIN and your SKU',
      'Descriptions, sizes, colors and pack quantities',
      'Prices and the dates they take effect',
      'Dimensions and weights, when the partner asks for them',
    ],
    flow: { before: [], after: ['850', '846'] },
    netsuiteDetail:
      'Build the 832 from NetSuite item records and the price level agreed with that buyer. Keep the effective dates of price changes in NetSuite so the 832, the 855 and the 810 all use the same price at the same time.',
    mistakes: [
      'Sending a price change in an 832 without updating the price used on invoices, or the reverse.',
      'Reusing a UPC for a different item, which confuses every system downstream.',
    ],
    faqs: [
      { q: 'What is an EDI 832?', a: 'The EDI 832 is the X12 price/sales catalog: a supplier’s item and price information sent to a buyer, used to set up and update items.' },
      { q: 'Do all retailers use the 832?', a: 'No. Many use their own supplier portals or catalog services for item setup instead. The trading partner’s requirements say which they use.' },
    ],
  },
  {
    code: '852',
    name: 'Product Activity Data',
    stage: 'catalog',
    from: 'Retailer',
    to: 'Supplier',
    netsuite: 'No standard record; imported for reporting',
    title: 'EDI 852 Product Activity Data: Retail Sales and Stock by Store',
    summary: 'The retailer’s report of your products’ sales and stock, often by store and week, used for replenishment and forecasting.',
    about: [
      'The 852 is a report from a retailer to a supplier: how many units of each of the supplier’s items sold, and how many are in stock, typically by store or distribution center and by week. Some retailers use it to let suppliers manage replenishment.',
      'It is one of the most useful EDI documents for planning, and one of the least used, because the data rarely has a home in the supplier’s ERP.',
      'Large retailers often offer the same data through a supplier portal as well. The EDI version is easier to load automatically, which matters once you sell to more than a couple of retailers.',
    ],
    carries: [
      'Reporting period, such as a week',
      'Items, by the retailer’s item number and UPC',
      'Units sold, on hand and on order',
      'Store or distribution center the figures apply to',
    ],
    flow: { before: [], after: ['850'] },
    netsuiteDetail:
      'NetSuite has no standard record for retail sell-through. Teams import 852 data into a custom record or a reporting database and use it for forecasts and reorder points, rather than into transactions.',
    mistakes: [
      'Receiving 852s for months and never loading them anywhere useful.',
      'Mixing the retailer’s item numbers with your own without a cross-reference, so sales can’t be tied to items.',
    ],
    faqs: [
      { q: 'What is an EDI 852?', a: 'The EDI 852 is the X12 product activity data document: a retailer’s report of a supplier’s products sold and in stock, usually by store and week.' },
      { q: 'What is the 852 used for?', a: 'Forecasting, replenishment and vendor-managed inventory, where the supplier decides what to ship to the retailer based on sales and stock.' },
    ],
  },
  {
    code: '940',
    name: 'Warehouse Shipping Order',
    stage: 'warehouse',
    from: 'Supplier (depositor)',
    to: '3PL warehouse',
    netsuite: 'Sales order or fulfillment request sent to the 3PL',
    title: 'EDI 940 Warehouse Shipping Order: Sending Orders to a 3PL',
    summary: 'The supplier telling its 3PL warehouse what to ship, to whom and how.',
    about: [
      'The 940 is how a company that stores goods at a third-party warehouse tells it to ship an order. It works like a pick ticket sent electronically: which items, how many, ship to whom, by which carrier.',
      'The 3PL replies with a 945 once the order ships. Between the two, the supplier’s ERP and the warehouse each hold part of the truth about the order, which is why the matching rules matter.',
      'Each 3PL publishes its own 940 specification, so a supplier that moves warehouses or adds a second 3PL usually has a second mapping to build and test, even though both use the same document number.',
    ],
    carries: [
      'The supplier’s order number and the customer’s PO number',
      'Ship-to address and requested ship date',
      'Items and quantities to ship',
      'Carrier, service level and special instructions such as labeling',
    ],
    flow: { before: ['850'], after: ['945', '856'] },
    netsuiteDetail:
      'Send the 940 from approved NetSuite sales orders (or fulfillment requests) assigned to the 3PL’s location. Send each order once, keyed by the sales order number, and decide up front how cancellations and changes reach the warehouse after the 940 has gone.',
    mistakes: [
      'Sending orders before they are approved or paid, so the 3PL ships orders that are later cancelled.',
      'Sending the same order twice after a timeout, so it ships twice.',
      'Changing the order in NetSuite after the 940 was sent and assuming the warehouse knows.',
    ],
    faqs: [
      { q: 'What is an EDI 940?', a: 'The EDI 940 is the X12 warehouse shipping order: the instruction a company sends its 3PL warehouse to ship an order.' },
      { q: 'What is the difference between a 940 and an 850?', a: 'An 850 is a customer ordering from a supplier. A 940 is the supplier instructing its own warehouse to ship. A supplier using a 3PL often receives an 850 and sends a 940.' },
    ],
  },
  {
    code: '945',
    name: 'Warehouse Shipping Advice',
    stage: 'warehouse',
    from: '3PL warehouse',
    to: 'Supplier (depositor)',
    netsuite: 'Item fulfillment, with tracking',
    title: 'EDI 945 Warehouse Shipping Advice: Confirming 3PL Shipments',
    summary: 'The 3PL confirming what it shipped: the items, quantities, cartons and tracking, so the supplier can fulfill, notify and bill.',
    about: [
      'The 945 is the 3PL’s confirmation that an order shipped. It reports what actually went out, which may differ from the 940 if items were short, and carries the tracking or bill of lading number.',
      'For the supplier, the 945 is the trigger for everything downstream: marking the order fulfilled, sending the customer an ASN, and invoicing.',
      'Most 3PLs send one 945 per shipped order, but some send one per carton or per truck. The integration has to know which, or it will create one fulfillment per carton.',
    ],
    carries: [
      'The supplier’s order number it confirms',
      'Ship date, carrier and tracking or bill of lading number',
      'Items and quantities actually shipped, with any shortages',
      'Carton or pallet details, when the 3PL provides them',
    ],
    flow: { before: ['940'], after: ['856', '810'] },
    netsuiteDetail:
      'Create a NetSuite item fulfillment from each 945, for the quantities it reports, not the quantities ordered. Partial shipments create partial fulfillments, and the remaining quantity stays open or is cancelled by a rule. Store the 945’s ID so a resent 945 doesn’t create a second fulfillment.',
    mistakes: [
      'Fulfilling the full order quantity when the 945 reports a short shipment.',
      'Creating duplicate fulfillments when the 3PL resends a 945.',
      'Dropping the carton data the 945 carries, then having nothing to build the customer’s ASN from.',
    ],
    faqs: [
      { q: 'What is an EDI 945?', a: 'The EDI 945 is the X12 warehouse shipping advice: a 3PL’s confirmation to the goods’ owner of what it shipped against a warehouse shipping order (940).' },
      { q: 'Is a 945 the same as an ASN?', a: 'No. A 945 goes from the warehouse to the goods’ owner; an ASN (856) goes from the supplier to its customer. The 945 often provides the data for the 856.' },
    ],
  },
  {
    code: '943',
    name: 'Warehouse Stock Transfer Shipment Advice',
    stage: 'warehouse',
    from: 'Supplier (depositor)',
    to: '3PL warehouse',
    netsuite: 'Purchase order or transfer order expected at the 3PL',
    title: 'EDI 943 Stock Transfer Shipment Advice: Telling a 3PL What’s Coming',
    summary: 'The supplier telling its 3PL that inventory is on the way, so the warehouse can expect and receive it.',
    about: [
      'The 943 announces an inbound shipment to a warehouse: stock moving from a factory, a vendor or another warehouse into the 3PL. The warehouse uses it to plan receiving and to check what arrives against what was expected.',
      'It is the inbound counterpart to the 940, and the 3PL answers it with a 944 once the goods are received.',
      'Not every 3PL uses the 943. Some accept advance notice of inbound shipments through their own portal or an API instead, and some only work from the 944 after goods arrive.',
    ],
    carries: [
      'Shipment reference and expected arrival',
      'Items and quantities being sent',
      'Origin and carrier details',
      'Lot numbers or other tracking the warehouse needs to record',
    ],
    flow: { before: [], after: ['944'] },
    netsuiteDetail:
      'Send the 943 from the NetSuite purchase order or transfer order that brings stock to the 3PL’s location, once it has actually shipped. Keep the reference so the 944 can be matched back to it.',
    mistakes: [
      'Sending the 943 when the PO is placed rather than when goods ship, so the warehouse expects stock weeks early.',
      'Leaving out lot or serial details the warehouse needs to receive the goods properly.',
    ],
    faqs: [
      { q: 'What is an EDI 943?', a: 'The EDI 943 is the X12 warehouse stock transfer shipment advice: notice to a warehouse that inventory has been shipped to it.' },
      { q: 'What replies to a 943?', a: 'The warehouse sends a 944, the stock transfer receipt advice, once it has received and counted the goods.' },
    ],
  },
  {
    code: '944',
    name: 'Warehouse Stock Transfer Receipt Advice',
    stage: 'warehouse',
    from: '3PL warehouse',
    to: 'Supplier (depositor)',
    netsuite: 'Item receipt',
    title: 'EDI 944 Stock Transfer Receipt Advice: Recording 3PL Receipts',
    summary: 'The 3PL confirming what it received, item by item, including any shortages or damage.',
    about: [
      'The 944 reports what a warehouse actually received against an expected inbound shipment. Differences from the 943, such as short, over or damaged quantities, appear here.',
      'It is the document that makes inventory available to sell, so delays or errors in it show up as stock that exists in the warehouse but not in the ERP.',
      'Receipts often show the first sign of problems upstream: a vendor that ships short, product arriving damaged, or lots that don’t match the paperwork. Recording the differences in NetSuite gives purchasing the evidence to claim credit from the vendor.',
    ],
    carries: [
      'The shipment or order reference it confirms',
      'Received quantities per item',
      'Shortages, overages and damage',
      'Lot numbers and receipt date',
    ],
    flow: { before: ['943'], after: ['846'] },
    netsuiteDetail:
      'Create a NetSuite item receipt against the purchase order or transfer order for the quantities the 944 reports. Record differences rather than receiving the expected quantity, and keep the 944’s ID so a resent document doesn’t receive the goods twice.',
    mistakes: [
      'Receiving the expected quantity instead of the received quantity, hiding shortages.',
      'Receiving the same 944 twice, inflating stock.',
    ],
    faqs: [
      { q: 'What is an EDI 944?', a: 'The EDI 944 is the X12 warehouse stock transfer receipt advice: a warehouse’s confirmation of goods received into stock.' },
      { q: 'What is the difference between a 944 and a 945?', a: 'The 944 confirms goods coming into the warehouse; the 945 confirms goods going out to a customer.' },
    ],
  },
  {
    code: '947',
    name: 'Warehouse Inventory Adjustment Advice',
    stage: 'warehouse',
    from: '3PL warehouse',
    to: 'Supplier (depositor)',
    netsuite: 'Inventory adjustment',
    title: 'EDI 947 Inventory Adjustment Advice: When 3PL Stock Changes',
    summary: 'The 3PL reporting stock changes that aren’t shipments or receipts: cycle counts, damage, returns and status changes.',
    about: [
      'The 947 reports changes to inventory at a warehouse that don’t come from shipping or receiving: a cycle count that found a difference, damaged goods written off, items placed on hold, or returns restocked.',
      'Without it, the supplier’s ERP drifts away from the warehouse count until someone reconciles them by hand.',
      'Inventory status matters too. Warehouses often hold stock as available, on hold, damaged or quarantined, and a 947 that moves stock between statuses changes what can be sold even though the physical count didn’t change.',
    ],
    carries: [
      'Items and the quantity change, up or down',
      'The reason for each adjustment',
      'Lot numbers and inventory status, when used',
      'The date of the change',
    ],
    flow: { before: ['944'], after: ['846'] },
    netsuiteDetail:
      'Turn each 947 into a NetSuite inventory adjustment at the 3PL’s location, posting to an account that matches the reason (shrinkage, damage, count correction), so the adjustments can be reviewed instead of disappearing into one bucket.',
    mistakes: [
      'Posting every adjustment to one account, so shrinkage and receiving errors can’t be told apart.',
      'Ignoring 947s and relying on a periodic 846 overwrite instead, which hides why stock changed.',
    ],
    faqs: [
      { q: 'What is an EDI 947?', a: 'The EDI 947 is the X12 warehouse inventory adjustment advice: a warehouse’s report of stock changes such as count corrections, damage or status changes.' },
      { q: 'How is a 947 different from an 846?', a: 'A 947 reports individual changes and their reasons; an 846 reports the resulting quantities. Both are useful; the 947 explains the 846.' },
    ],
  },
  {
    code: '997',
    name: 'Functional Acknowledgment',
    stage: 'ack',
    from: 'Whoever received a document',
    to: 'Whoever sent it',
    netsuite: 'None; tracked in the EDI provider or integration log',
    title: 'EDI 997 Functional Acknowledgment: What It Confirms',
    summary: 'A receipt for an EDI document: it confirms the document arrived and could be read, or reports why it couldn’t.',
    about: [
      'The 997 is sent back automatically for most EDI documents. It says that a group of documents arrived and passed basic checks, or that some were rejected for errors in their structure.',
      'It does not mean the other side agrees with the content. A 997 for an invoice says the invoice was readable, not that it will be paid. Its absence is the warning sign: if no 997 comes back, the partner may never have received the document.',
    ],
    carries: [
      'Which document group it acknowledges',
      'Accepted, accepted with errors, or rejected',
      'Error details for documents that failed checks',
    ],
    flow: { before: ['850', '856', '810'], after: [] },
    netsuiteDetail:
      'The 997 usually never reaches NetSuite. The EDI provider or integration tracks it, and the useful part is an alert: a document with no 997 after a set time, or a rejected 997, should notify someone before a deadline is missed.',
    mistakes: [
      'Not monitoring for missing 997s, so a failed ASN is discovered only when the chargeback arrives.',
      'Treating a 997 as business acceptance of an order or invoice.',
    ],
    faqs: [
      { q: 'What is an EDI 997?', a: 'The EDI 997 is the X12 functional acknowledgment: an automatic receipt confirming that EDI documents were received and could be read, or listing errors.' },
      { q: 'What is the difference between a 997 and a 999?', a: 'Both acknowledge receipt. The 999 implementation acknowledgment also checks the document against an implementation guide and is used mostly in healthcare; retail and logistics mostly use the 997.' },
    ],
  },
  {
    code: '214',
    name: 'Transportation Carrier Shipment Status Message',
    stage: 'transport',
    from: 'Carrier',
    to: 'Shipper (or consignee)',
    netsuite: 'Tracking and delivery status on the fulfillment',
    title: 'EDI 214 Shipment Status: Tracking Updates from Carriers',
    summary: 'Status updates from a carrier: picked up, in transit, delayed, delivered, with dates, times and locations.',
    about: [
      'Carriers send the 214 to report where a shipment is: picked up, arrived at a terminal, out for delivery, delivered, or delayed with a reason. Shippers use it to track freight and to tell customers when goods will arrive.',
      'It is common for truckload and less-than-truckload (LTL) freight, where tracking numbers alone don’t give customers enough detail.',
      'Each event uses a standard status code, so a shipper can tell a delivery appointment from an actual delivery, and a weather delay from a missed pickup, without reading free-text notes.',
    ],
    carries: [
      'The shipment reference, such as the bill of lading or PRO number',
      'A status code and the date, time and location of the event',
      'Reasons for delays or exceptions',
      'Appointment and delivery details',
    ],
    flow: { before: ['204', '856'], after: ['210'] },
    netsuiteDetail:
      'Attach 214 statuses to the NetSuite item fulfillment, usually in custom fields or a custom record, so customer service can see delivery status and a portal can show it to customers. Delivered status can also trigger invoicing when terms require proof of delivery.',
    mistakes: [
      'Storing only the latest status, losing the history needed to dispute late deliveries.',
      'Matching 214s to fulfillments by a reference the carrier doesn’t always send.',
    ],
    faqs: [
      { q: 'What is an EDI 214?', a: 'The EDI 214 is the X12 transportation carrier shipment status message: a carrier’s update on where a shipment is and whether it has been delivered.' },
      { q: 'Who sends the 214?', a: 'The carrier, to the shipper and sometimes to the consignee or a third-party logistics provider managing the freight.' },
    ],
  },
  {
    code: '204',
    name: 'Motor Carrier Load Tender',
    stage: 'transport',
    from: 'Shipper',
    to: 'Carrier',
    netsuite: 'Created from item fulfillments ready to ship',
    title: 'EDI 204 Load Tender: Offering Shipments to Carriers',
    summary: 'The shipper offering a load to a trucking carrier: pickup, delivery, stops, weight and equipment.',
    about: [
      'The 204 offers a shipment to a motor carrier. It describes the load: where and when to pick it up, where to deliver it, the stops in between, weight, and equipment needed. The carrier accepts or declines it, often with a 990 response.',
      'Shippers with steady freight use 204s to book carriers without phone calls and email, and to keep a record of what was tendered and when.',
      'Larger shippers usually run load tendering from a transportation management system (TMS) that compares carriers and rates; smaller ones tender directly to a few contracted carriers who support EDI.',
    ],
    carries: [
      'Shipment and reference numbers',
      'Pickup and delivery locations, dates and appointment windows',
      'Stops, weight, piece count and equipment type',
      'Rate or contract references and special instructions',
    ],
    flow: { before: ['856'], after: ['214', '210'] },
    netsuiteDetail:
      'Build 204s from NetSuite item fulfillments that are packed and ready to ship, grouped into loads, or let a transportation management system do it and pass the load reference back to NetSuite for tracking and freight costs.',
    mistakes: [
      'Tendering before weights and piece counts are final, so the carrier sends the wrong equipment.',
      'Not recording which carrier accepted the load, so the 210 freight invoice can’t be matched.',
    ],
    faqs: [
      { q: 'What is an EDI 204?', a: 'The EDI 204 is the X12 motor carrier load tender: a shipper’s offer of a shipment to a trucking carrier.' },
      { q: 'How does a carrier respond to a 204?', a: 'Usually with a 990, the response to a load tender, accepting or declining it, then with 214 status updates as the load moves.' },
    ],
  },
  {
    code: '210',
    name: 'Motor Carrier Freight Details and Invoice',
    stage: 'transport',
    from: 'Carrier',
    to: 'Shipper',
    netsuite: 'Vendor bill for freight',
    title: 'EDI 210 Freight Invoice: Checking Carrier Bills',
    summary: 'The carrier’s invoice for a shipment, with charges, accessorials and reference numbers to audit against what was agreed.',
    about: [
      'The 210 is a trucking carrier’s invoice. It lists the shipment, the charges, and extras such as fuel surcharges, liftgate or detention, with the references needed to tie it back to the load.',
      'Receiving freight bills by EDI makes freight audit possible: comparing every bill with the agreed rate and the shipment details before paying.',
      'Carriers bill per shipment, so a busy shipper can receive hundreds of 210s a month. Automating the match against expected cost is usually where most of the savings come from.',
    ],
    carries: [
      'Invoice number and the shipment’s bill of lading or PRO number',
      'Origin, destination, weight and freight class',
      'Line charges and accessorial charges',
      'Total amount due and payment terms',
    ],
    flow: { before: ['204', '214'], after: [] },
    netsuiteDetail:
      'Turn approved 210s into NetSuite vendor bills for the carrier, matched to the shipment’s fulfillment so freight cost can be reported per order or customer. Holding bills that exceed the expected rate for review prevents paying for charges nobody agreed to.',
    mistakes: [
      'Paying freight bills without matching them to shipments, so duplicate or overcharged bills go through.',
      'Booking all freight to one account, losing cost per customer or per order.',
    ],
    faqs: [
      { q: 'What is an EDI 210?', a: 'The EDI 210 is the X12 motor carrier freight details and invoice: a trucking carrier’s bill for a shipment.' },
      { q: 'What are accessorial charges on a 210?', a: 'Extra charges beyond the base rate, such as fuel surcharge, liftgate, inside delivery, residential delivery or detention, listed separately on the freight invoice.' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Quality gate. Runs when this module is imported during the build.

const codes = new Set(ediDocuments.map((d) => d.code));

for (const d of ediDocuments) {
  const problems = [];
  if (!STAGES[d.stage]) problems.push(`unknown stage "${d.stage}"`);
  if ((d.about || []).join(' ').length < 400) problems.push('about needs 400+ chars');
  if ((d.carries || []).length < 3) problems.push('needs at least 3 carries items');
  if ((d.mistakes || []).length < 2) problems.push('needs at least 2 mistakes');
  if ((d.faqs || []).length < 2) problems.push('needs at least 2 faqs');
  if (!d.netsuiteDetail?.trim()) problems.push('netsuiteDetail is required');
  for (const c of [...d.flow.before, ...d.flow.after]) if (!codes.has(c)) problems.push(`flow links to unknown ${c}`);
  if (problems.length) throw new Error(`EDI ${d.code} is too thin to publish:\n  - ${problems.join('\n  - ')}`);
}

export const ediSlug = (code) => `edi-${code}`;
export const getEdiDocument = (slug) => ediDocuments.find((d) => ediSlug(d.code) === slug);
export const getEdiByCode = (code) => ediDocuments.find((d) => d.code === code);
