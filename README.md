# Flying Dutchman
## Functional Requirements
### The system should provide functionality that allows all customers to:
- [X] See available items (open menu)
- [X] Order drinks
	- Single order
	- Group order
		1. Group bill
		2. {Split bill}
- [X] {Order food}
- [X] Change order
- [X] Pay at bar, or to bartender/waiter/waitress at table
	- {See above - split bill}

### VIP customers should also be able to:
- [X] Log in (at table)
- [X] Log out
- [X] See account balance (at table)
- [X] Order and Pay from account (at table)
- [X] Fetch special beer/drink from fridge or bar (with combination lock)
- [X] Add to account (at bar)

### Bartender, Waiter and Waitress should be able to:
- [ ] Log in
- [ ] Log out
- [ ] See availability of product (General req)
	- Remove product (temporarily) from menu
- [ ] Modify/Calculate price of product
- [ ] Offer product on the house
	- Balancing the income/expenses
	- Update number in stock
- [ ] Notify security of problem
- [ ] Get order for certain table
	- Change items on order
	- {Allow for splitting the bill}
- [ ] {Reserve table for group at time}
	- {Reserve}
	- {Remove reservation}
	- {Print reservation note}

### Manager/Owner needs to be able to:
- [ ] Manage stock
	- Revise amounts
	- Order refill of items
	- Add/remove items from menu
- [ ] [Manage prices.]
- [ ] [Do accounting.]

### General requirements
- [ ] We need to be able to find products according to content
	- Allergies - Gluten, Nuts, Lactose etc.
	- Alcohol content
	- Tannins (for wine)

## Non-functional requirements
- [ ] An order can consist of up to ten items at the same time
- [ ] The bartender should immediately be notified when an item is running low
(27.a)
	- A warning should be given when there are less than five items left of a certain
type
- [ ] The security notification should be accessible within three seconds (17)

## Additional details
- [ ] The interface must connect to the thematic background of the Pub
- [ ] Drinks should be listed with the following details:
	- Beers
		1. Name
		2. Producer/Brewery
		3. Country
		4. Type (IPA, lager
		5. Strength
		6. Serving size (tap, bottle)
		7. Price
	- Wine
		1. Name
		2. Year
		3. Producer
		4. Type
		5. Grape
		6. Serving size (glass, bottle)
	- Cocktails/Drinks
		1. Name
		2. Strength
		3. Contents/Recipe (for allergy purposes)
		4. Serving size
- [ ] For the bartender and manager, the number of remaining servings should also
be shown
	- It should be easy to see when an item is low in number