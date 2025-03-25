#!/usr/bin/env node
import blessed from "blessed";

// Create a screen object.
const screen = blessed.screen({
  smartCSR: true,
  title: "Fruit Selector",
});

// Define an array of 20 fruits with their associated colors.
const fruits = [
  { name: "Strawberry", color: "red" },
  { name: "Apple", color: "red" },
  { name: "Cherry", color: "red" },
  { name: "Pomegranate", color: "red" },
  { name: "Banana", color: "yellow" },
  { name: "Lemon", color: "yellow" },
  { name: "Mango", color: "yellow" },
  { name: "Orange", color: "orange" },
  { name: "Blueberry", color: "blue" },
  { name: "Blackberry", color: "magenta" },
  { name: "Kiwi", color: "green" },
  { name: "Grapes", color: "purple" },
  { name: "Watermelon", color: "green" },
  { name: "Peach", color: "pink" },
  { name: "Pear", color: "green" },
  { name: "Plum", color: "purple" },
  { name: "Raspberry", color: "red" },
  { name: "Cranberry", color: "red" },
  { name: "Papaya", color: "orange" },
  { name: "Guava", color: "pink" },
];

// Create a list widget.
const list = blessed.list({
  parent: screen,
  width: "100%",
  height: "100%",
  top: "center",
  left: "center",
  align: "left",
  keys: true,
  vi: true,
  mouse: true,
  border: { type: "line" },
  style: {
    item: {
      hover: { bg: "blue" },
    },
    selected: {
      bg: "blue",
      bold: true,
    },
  },
  tags: true, // Enable markup tags so we can style items dynamically
});

// Function to update the list items with dynamic styling.
function updateListItems() {
  const selectedIndex = list.selected;
  const selectedFruit = fruits[selectedIndex];
  // Check if the selected fruit is red.
  const selectedIsRed =
    selectedFruit && selectedFruit.color.toLowerCase() === "red";

  // Build the list items, applying a special markup to red fruits if a red fruit is selected.
  const items = fruits.map((fruit, idx) => {
    let text = fruit.name;
    if (selectedIsRed && fruit.color.toLowerCase() === "red") {
      // Wrap in markup tags to show red text and bold styling.
      text = `{red-fg}{bold}${fruit.name}{/bold}{/red-fg}`;
    }
    return text;
  });
  // Update the list with the new items.
  list.setItems(items);
  // Restore the selection index.
  list.select(selectedIndex);
  screen.render();
}

// Initial render.
updateListItems();

// Listen for key events so that whenever the user moves up or down, we update the list.
list.on("keypress", function (ch, key) {
  if (key.name === "up" || key.name === "down") {
    // Use a slight delay to allow Blessed to update the selected index.
    setTimeout(updateListItems, 0);
  }
});

// Exit on Escape, q, or Control-C.
screen.key(["escape", "q", "C-c"], function () {
  return process.exit(0);
});

// Focus the list and render the screen.
list.focus();
screen.render();
