# TODO.md — CardVault Sports Cards Store

## Phase 1 — Data & Seeds
- [ ] Replace seed data: swap hats/tshirts for 10-20 realistic sports cards across baseball, basketball, football
- [ ] Create sample card images (placeholder or generated)
- [ ] Seed real categories (Baseball, Basketball, Football, Hockey, Soccer) with sport metadata
- [ ] Switch variant types from size/color to condition (Mint, Near Mint, Excellent, Good, Fair)
- [ ] Verify seeds populate all custom fields (playerName, team, year, rarity, grade, rookie, autograph)

## Phase 2 — Shop & Browse
- [ ] Add sport filter dropdown to shop sidebar
- [ ] Add team, year range, rarity, manufacturer, graded status filters
- [ ] Homepage: featured cards carousel, rookie spotlight section, sport categories grid
- [ ] Product detail: expand card info grid, show similar/related cards from same player/team/set
- [ ] Verify search works across player, team, set name, and sport fields

## Phase 3 — Commerce Essentials
- [ ] Enable nodemailerAdapter for order confirmations, password reset, shipping updates
- [ ] Set up real Stripe test keys and verify end-to-end checkout
- [ ] Configure basic shipping rates and tax regions
- [ ] Improve order status tracking page for customers

## Phase 4 — Admin UX
- [ ] Replace BeforeDashboard with sports card stats (total cards, by sport, recent orders)
- [ ] Set admin default columns for card fields (player, sport, year, price, rarity)
- [ ] Improve card management UX (quick entry, bulk image upload)
- [ ] Add admin filter presets ("rookie cards without images", "ungraded cards")

## Phase 5 — Post-MVP
- [ ] Wishlist / "My Collection" for logged-in users
- [ ] Price history tracking
- [ ] Advanced image viewer (zoom, front/back card flip)
- [ ] Mobile responsive polish
- [ ] Production deploy (Caddy route, systemd service, SQLite backup)
