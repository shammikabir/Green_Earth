## Basic Questions-Answers

---

# JavaScript ES6 Quick Notes

## 1) Difference between var, let, and const

- **var**: Function-scoped, can be redeclared.
- **let**: Block-scoped, can be updated but not redeclared.
- **const**: Block-scoped, cannot be updated or redeclared.

---

## 2) Difference between map(), forEach(), and filter()

- **map()** → Creates a new array by transforming each item.
- **forEach()** → Loops through an array but doesn’t return a new array.
- **filter()** → Creates a new array with items that meet a condition.

---

## 3) Arrow Functions

- Shorter and cleaner way to write functions in JavaScript.
- Example: Instead of function add(a, b) { return a + b; }, we can write const add = (a, b) => a + b;`.

---

## 4) Destructuring Assignment

- Allows picking values from arrays or objects and storing them in variables easily.
- Example: const {name, age} = person stores person`’s name and age into separate variables.

---

## 5) Template Literals

- Strings wrapped in backticks `` ` `` that allow embedding variables with ${}.
- They are cleaner and easier than using `+` for string concatenation.
- Example: const greeting = `Hello, ${name}!`` creates a string with the variable included.
