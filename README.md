# Project - Flying Dutchman
## Functional Requirements
### The system should provide functionality that allows all customers to:
- [] See available items (open menu)
2. Order drinks
	- Single order
	- Group order
		1. Group bill
		2. {Split bill}
3. {Order food}
4. Change order
5. Pay at bar, or to bartender/waiter/waitress at table
	- {See 2.b.ii - splitting the bill}

### VIP customers should also be able to:
6. Log in (at table)
7. Log out
8. See account balance (at table)
9. Order and Pay from account (at table)
10. Fetch special beer/drink from fridge or bar (with combination lock)
11. Add to account (at bar)

### Bartender, Waiter and Waitress should be able to:
12. Log in
13. Log out
14. See availability of product (General req)
	- Remove product (temporarily) from menu
15. Modify/Calculate price of product
16. Offer product on the house
	- Balancing the income/expenses
	- Update number in stock
17. Notify security of problem
18. Get order for certain table
	- Change items on order
	- {Allow for splitting the bill}
19. {Reserve table for group at time}
	- {Reserve}
	- {Remove reservation}
	- {Print reservation note}

### Manager/Owner needs to be able to:
20. Manage stock
	- Revise amounts
	- Order refill of items
	- Add/remove items from menu
21. [Manage prices.]
22. [Do accounting.]

### General requirements
23. We need to be able to find products according to content
	- Allergies - Gluten, Nuts, Lactose etc.
	- Alcohol content
	- Tannins (for wine)

## Non-functional requirements
24. An order can consist of up to ten items at the same time
25. The bartender should immediately be notified when an item is running low
(27.a)
	- A warning should be given when there are less than five items left of a certain
type
26. The security notification should be accessible within three seconds (17)

## Additional details
27. The interface must connect to the thematic background of the Pub
28. Drinks should be listed with the following details:
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
29. For the bartender and manager, the number of remaining servings should also
be shown
. It should be easy to see when an item is low in number