# Which salon module do I need?

Six modules, sold separately. They are not sizes of one product: two of them
are tills, three build on the base, and one is a website.

## The six

**Salon Management, 10 USD.** The base. Service catalogue, appointments in
calendar and kanban, stylist assignment, commission rules and earnings, sales
targets, customer history, an online booking page, invoicing and an 80mm
receipt. Needs only Odoo 19.

**POS Salon, 949 USD.** A till, on the base. Brings Salon Management into
the Odoo Point of Sale: today's bookings on the till, load one onto the order
or take a walk-in, and the stylist and service travel onto the order, the
receipt and the commission. Needs Salon Management. Adds no bookings of its
own.

**Spa and Salon POS, 1,299 USD.** A till, self contained. Its own
treatments, therapists, rooms and stations with live status, a booking
wizard with time slots, walk-ins, commission plans and therapist reviews.
The receipt names the treatment, the therapist and the room. Needs only Odoo
Point of Sale; no back office.

**Salon Loyalty, Packages and Memberships, 1,299 USD.** An add-on to the
base, not a till. Loyalty points with tiers, prepaid session packages,
memberships with a minimum term, gift cards, deposits at booking, a waitlist,
consent forms, before and after photos, published reviews and a KPI
dashboard. Needs Salon Management.

**Salon Quick Booking, 149 USD.** A front desk, on the base. Five screens for
a receptionist who never opens an Odoo list: three tap walk-in checkout, a
chair map with live occupancy, a daily cash session with opening float and
closing count, a dashboard and reports. Same bookings as the base, different
speed. Needs Salon Management and Salon Loyalty. Not a payment terminal.

**Salon Theme, 39 USD.** The public site, nine drag and drop snippets, with
Book Now pointing at the base module's booking page. Needs Odoo Website.

## The two tills, side by side

| | POS Salon, 949 | Spa and Salon POS, 1,299 |
|---|---|---|
| What it is | A bridge from the salon back office into the till | A complete spa till on its own |
| Needs Salon Management | Yes | No |
| Its own bookings and catalogue | No, uses the base module's | Yes |
| Rooms and stations with live status | No | Yes |
| Booking wizard with time slots | Books through the base module | Yes |
| Stylist or therapist on the receipt | Yes | Yes, with the room |
| Commission | The base module's rules | Its own plans per therapist |
| Packages, memberships, gift cards | With the Loyalty add-on | No |
| Best for | A salon already on Salon Management that wants a till | A spa, or a business run entirely from the till |

They are not meant to be installed together on one database.

## Which one

1. One chair, one diary, invoices from the back office: Salon Management
   alone.
2. The same salon, taking money at a till: add POS Salon.
3. Prepayment, memberships, gift cards, repeat custom: add Salon Loyalty. It
   sits on the base with or without the till.
4. A busy front desk that wants speed over Odoo screens: add Salon Quick
   Booking, on the base and the Loyalty add-on.
5. A spa with rooms and therapists, or no back office at all: Spa and Salon
   POS, on its own.
6. A public website that books into the salon: Salon Theme, with the base.

The two 1,299 modules rarely go together: one replaces the back office, the
other extends it. A salon that wants both a till and the commercial layer
buys POS Salon plus Salon Loyalty, both on Salon Management.

## Try each one

Login `demo`, password `demo` on every one.

| Module | Live demo | Guide |
|---|---|---|
| Salon Management | salon-app.way4tech.com | guides/salon-management |
| POS Salon | salonpos.way4tech.com | guides/salon-pos |
| Spa and Salon POS | spa-app.way4tech.com | guides/spa-pos |
| Salon Loyalty, Packages and Memberships | salon-app.way4tech.com | guides/enterprise-salon |
| Salon Quick Booking | quicksalon.devcynx.com | guides/salon-quick-booking |
| Salon Theme | salon.way4tech.com | guides/salon-theme |

## What none of them do

None replace Odoo accounting, inventory or payroll; they post into them. None
include SMS or WhatsApp credit. The two tills are not meant to be installed
together. Salon Quick Booking is a front desk screen, not a payment terminal.
