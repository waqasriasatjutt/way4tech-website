# Which salon module do I need?

Six modules, sold separately. They form a ladder: the base, a till on the
base, a spa layer on that till, and a loyalty add-on that lights up in either.
Two more, a front desk and a website, sit beside it.

## The six

**Salon Management, 10 USD.** The base. Service catalogue, appointments in
calendar and kanban, stylist assignment, commission rules and earnings, sales
targets, customer history, an online booking page, invoicing and an 80mm
receipt. Needs only Odoo 19.

**POS Salon, 949 USD.** The salon till, on the base. A board with a colour
for every stylist, a day view, keyboard shortcuts, Arrived check-in, tip
presets that go to the stylist, quick rebook after payment and a receipt with
the next visit and a QR to book again. Needs Salon Management.

**Spa POS, 1,299 USD.** The spa layer on the till. Everything POS Salon has,
plus the room grid with cleaning time, couples bookings on one bill, an intake
form before a first treatment, therapist gender preference, a day-spa
itinerary and the advance at booking. Needs POS Salon, and so Salon
Management.

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

## Salon Management vs POS Salon vs Spa POS vs + Enterprise Salon

| | Salon Management, 10 | POS Salon, 949 | Spa POS, 1,299 | + Enterprise Salon, 1,299 |
|---|---|---|---|---|
| **Back office (WT Salon Management)** | | | | |
| Five step setup wizard with region presets | yes | yes | yes | yes |
| Dashboard: today, week, month, no-shows, occupancy, top services | yes | yes | yes | yes |
| Calendar and kanban coloured by stylist, no-show badge | yes | yes | yes | yes |
| Rooms and stations, time slots, no double booking | yes | yes | yes | yes |
| Closed weekdays, advance at booking, recurring visits | yes | yes | yes | yes |
| Online booking page and stylist commission | yes | yes | yes | yes |
| **At the till (POS Salon)** | | | | |
| Salon board inside the Point of Sale | no | yes | yes | in your till |
| Stylist colour and initials on every card | no | yes | yes | in your till |
| Day view with a column per stylist | no | yes | yes | in your till |
| Keyboard shortcuts and a ? cheat sheet | no | yes | yes | in your till |
| Arrived check-in before the service starts | no | yes | yes | in your till |
| Tip presets, credited to the stylist | no | yes | yes | in your till |
| Quick rebook after payment | no | yes | yes | in your till |
| Receipt: stylist per line, next appointment, QR to book again | no | yes | yes | in your till |
| **The spa layer (Spa POS)** | | | | |
| Room grid with live status | no | no | yes | no |
| Cleaning buffer between treatments in a room | no | no | yes | no |
| Couples booking: two therapists, one bill | no | no | yes | no |
| Intake form with contraindications before a first treatment | no | no | yes | no |
| Therapist gender preference | no | no | yes | no |
| Day-spa itinerary booked in one go | no | no | yes | no |
| Treatments, therapists, advance taken off the bill, reviews | no | no | yes | no |
| **Loyalty, packages and deposits (Salon Loyalty add-on)** | | | | |
| Loyalty points and tiers, memberships, gift cards | no | no | no | yes |
| Prepaid packages and booking deposits | no | no | no | yes |
| Waitlist, consent forms, KPI dashboard | no | no | no | yes |
| Redeemed at either till, rechecked by the server | no | no | no | needs a till |

## Which one

1. One chair, one diary, invoices from the back office: Salon Management
   alone.
2. The same salon, taking money at a till: add POS Salon.
3. A spa with rooms, therapists and couples: add Spa POS on top of POS Salon.
4. Prepayment, memberships, gift cards, repeat custom: add Salon Loyalty. It
   sits on the base with or without a till and lights up in either till.
5. A busy front desk that wants speed over Odoo screens: add Salon Quick
   Booking, on the base and the Loyalty add-on.
6. A public website that books into the salon: Salon Theme, with the base.

Spa POS does not replace POS Salon, it extends it, so a spa buys the three in
order: Salon Management, POS Salon, Spa POS. A plain salon stops at POS Salon.
Both can take the Loyalty add-on.

## Try each one

Login `demo`, password `demo` on every one.

| Module | Live demo | Guide |
|---|---|---|
| Salon Management | salon-app.way4tech.com | guides/salon-management |
| POS Salon | salonpos.way4tech.com | guides/salon-pos |
| Spa POS | spa-app.way4tech.com | guides/spa-pos |
| Salon Loyalty, Packages and Memberships | salon-app.way4tech.com | guides/enterprise-salon |
| Salon Quick Booking | quicksalon.devcynx.com | guides/salon-quick-booking |
| Salon Theme | salon.way4tech.com | guides/salon-theme |

## What none of them do

None replace Odoo accounting, inventory or payroll; they post into them. None
include SMS or WhatsApp credit. The two tills are not meant to be installed
together. Salon Quick Booking is a front desk screen, not a payment terminal.
