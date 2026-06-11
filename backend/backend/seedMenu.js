// seedMenu.js - Run once to populate MongoDB with menu items
// Command: node seedMenu.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const MenuItem = require("./models/MenuItem");

dotenv.config();

const menuItems = [
  // ===== INDIAN =====
  {
    name: "Butter Paneer",
    price: 260,
    category: "Main Course",
    cuisine: "Indian",
    description: "Rich creamy paneer in buttery tomato gravy",
    image: "butterpaneer",
    isVeg: true,
  },
  {
    name: "Paneer Lababdar",
    price: 240,
    category: "Main Course",
    cuisine: "Indian",
    description: "Spiced paneer in a thick onion-tomato masala",
    image: "paneerlababdar",
    isVeg: true,
  },
  {
    name: "Palak Paneer",
    price: 220,
    category: "Main Course",
    cuisine: "Indian",
    description: "Fresh spinach curry with soft paneer cubes",
    image: "palakpaneer",
    isVeg: true,
  },
  {
    name: "Sahi Paneer",
    price: 250,
    category: "Main Course",
    cuisine: "Indian",
    description: "Royal paneer dish cooked with cream and nuts",
    image: "sahipaneer",
    isVeg: true,
  },
  {
    name: "Veg Kofta",
    price: 200,
    category: "Main Course",
    cuisine: "Indian",
    description: "Fried vegetable balls in a spiced gravy",
    image: "vegkofta",
    isVeg: true,
  },
  {
    name: "Chole Bhature",
    price: 150,
    category: "Main Course",
    cuisine: "Indian",
    description: "Spicy chickpeas served with fluffy fried bread",
    image: "chholebhature",
    isVeg: true,
  },
  {
    name: "Aalu Paratha",
    price: 80,
    category: "Bread",
    cuisine: "Indian",
    description: "Stuffed potato flatbread with butter",
    image: "aaluParathe",
    isVeg: true,
  },
  {
    name: "Plain Paratha",
    price: 50,
    category: "Bread",
    cuisine: "Indian",
    description: "Crispy whole wheat flatbread",
    image: "plainparthe",
    isVeg: true,
  },
  {
    name: "Naan",
    price: 60,
    category: "Bread",
    cuisine: "Indian",
    description: "Soft leavened tandoor bread with butter",
    image: "naan",
    isVeg: true,
  },
  {
    name: "Roti",
    price: 30,
    category: "Bread",
    cuisine: "Indian",
    description: "Light whole wheat chapati",
    image: "roti",
    isVeg: true,
  },
  {
    name: "Aalu Indian",
    price: 130,
    category: "Main Course",
    cuisine: "Indian",
    description: "Spicy potato curry in Indian masala",
    image: "aaluindian",
    isVeg: true,
  },
  {
    name: "Gobhi Masala",
    price: 160,
    category: "Main Course",
    cuisine: "Indian",
    description: "Cauliflower cooked in aromatic Indian spices",
    image: "gobhimasala",
    isVeg: true,
  },
  {
    name: "Paw Bhaji",
    price: 120,
    category: "Snacks",
    cuisine: "Indian",
    description: "Spiced mashed vegetables with toasted bun",
    image: "pawbhaji",
    isVeg: true,
  },
  {
    name: "Sev Tamatar",
    price: 110,
    category: "Main Course",
    cuisine: "Indian",
    description: "Tangy tomato gravy with crispy sev",
    image: "sevtamatar",
    isVeg: true,
  },
  {
    name: "Bhindi Okra",
    price: 140,
    category: "Main Course",
    cuisine: "Indian",
    description: "Stir-fried okra with Indian spices",
    image: "okra",
    isVeg: true,
  },

  // ===== CHINESE =====
  {
    name: "Hakka Noodles",
    price: 160,
    category: "Noodles",
    cuisine: "Chinese",
    description: "Stir-fried noodles with vegetables and sauces",
    image: "noodlesChines",
    isVeg: true,
  },
  {
    name: "Tofu Stir Fry",
    price: 180,
    category: "Main Course",
    cuisine: "Chinese",
    description: "Crispy tofu tossed in Chinese sauces and veggies",
    image: "tofuChines",
    isVeg: true,
  },
  {
    name: "Chicken Manchurian",
    price: 240,
    category: "Main Course",
    cuisine: "Chinese",
    description: "Crispy chicken balls in spicy manchurian sauce",
    image: "manchurianchines",
    isVeg: false,
  },
  {
    name: "Shezwan Noodles",
    price: 190,
    category: "Noodles",
    cuisine: "Chinese",
    description: "Spicy shezwan sauce noodles with crispy veggies",
    image: "shexwannoodleschines",
    isVeg: true,
  },
  {
    name: "Shezwan Fried Rice",
    price: 180,
    category: "Rice",
    cuisine: "Chinese",
    description: "Wok-tossed rice in bold shezwan sauce",
    image: "shezwanrice",
    isVeg: true,
  },
  {
    name: "Spring Rolls",
    price: 130,
    category: "Starter",
    cuisine: "Chinese",
    description: "Crispy golden rolls stuffed with spiced veggies",
    image: "springrollchines",
    isVeg: true,
  },

  // ===== ITALIAN =====
  {
    name: "Lasagna",
    price: 350,
    category: "Pasta",
    cuisine: "Italian",
    description: "Layered pasta with béchamel sauce and cheese",
    image: "lasagnaitalian",
    isVeg: false,
  },
  {
    name: "White Sauce Pasta",
    price: 240,
    category: "Pasta",
    cuisine: "Italian",
    description: "Creamy béchamel pasta with herbs",
    image: "whitesauceitalian",
    isVeg: true,
  },
  {
    name: "Macaroni",
    price: 200,
    category: "Pasta",
    cuisine: "Italian",
    description: "Classic macaroni in a rich tomato sauce",
    image: "macroniitalian",
    isVeg: true,
  },
  {
    name: "Veg Pizza",
    price: 280,
    category: "Pizza",
    cuisine: "Italian",
    description: "Loaded vegetable pizza with cheese and herbs",
    image: "pizza",
    isVeg: true,
  },
  {
    name: "Garlic Bread",
    price: 140,
    category: "Starter",
    cuisine: "Italian",
    description: "Toasted bread with garlic butter and Italian herbs",
    image: "garlicbreaditalian",
    isVeg: true,
  },
  {
    name: "Pink Sauce Pasta",
    price: 260,
    category: "Pasta",
    cuisine: "Italian",
    description: "Creamy blend of tomato and white sauce pasta",
    image: "pinkpastaitalian",
    isVeg: true,
  },
  {
    name: "Red Sauce Pasta",
    price: 220,
    category: "Pasta",
    cuisine: "Italian",
    description: "Classic Italian pasta in tangy tomato arrabbiata sauce",
    image: "redsauceitalian",
    isVeg: true,
  },
  {
    name: "Veg Italian Pizza",
    price: 300,
    category: "Pizza",
    cuisine: "Italian",
    description: "Authentic Italian style veg pizza with fresh toppings",
    image: "vegpizzaitalian",
    isVeg: true,
  },

  // ===== FAST FOOD =====
  {
    name: "Cheese Burger",
    price: 120,
    category: "Burger",
    cuisine: "Fast Food",
    description: "Juicy burger with cheese, lettuce and special sauce",
    image: "burger",
    isVeg: false,
  },
  {
    name: "French Fries",
    price: 80,
    category: "Snacks",
    cuisine: "Fast Food",
    description: "Crispy golden fries with seasoning",
    image: "frenchfries",
    isVeg: true,
  },
  {
    name: "Veg Sandwich",
    price: 90,
    category: "Snacks",
    cuisine: "Fast Food",
    description: "Fresh vegetables in grilled sandwich",
    image: "sandwhich",
    isVeg: true,
  },
  {
    name: "Cold Coffee",
    price: 90,
    category: "Drink",
    cuisine: "Fast Food",
    description: "Chilled coffee with milk and ice cream",
    image: "coldcoffee",
    isVeg: true,
  },
  {
    name: "Ice Cream",
    price: 70,
    category: "Dessert",
    cuisine: "Fast Food",
    description: "Creamy vanilla ice cream scoop",
    image: "icecream",
    isVeg: true,
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    await MenuItem.deleteMany({});
    console.log("🗑️  Cleared old menu items");

    await MenuItem.insertMany(menuItems);
    console.log(`🍽️  Inserted ${menuItems.length} menu items successfully!`);

    await mongoose.disconnect();
    console.log("✅ Done! Database seeded.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

seedDatabase();
