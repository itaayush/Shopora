import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import ProductModel from "./models/productModel.js";
import CategoryModel from "./models/categoryModel.js";


dotenv.config();


const categories = [
  { name: "Laptops" },
  { name: "Watches" }
];

const products = [
  // Laptops
  {
    name: "High-Performance Laptop 1",
    description: "A powerful laptop for all your needs.",
    price: 999,
    quantity: 10,
    categoryName: "Laptops",
    photo: "/laptop_1.jpg",
    shipping: true
  },
  {
    name: "Sleek Ultrabook 2",
    description: "Lightweight and portable.",
    price: 1299,
    quantity: 15,
    categoryName: "Laptops",
    photo: "/laptop_2.jpg",
    shipping: true
  },
  {
    name: "Gaming Beast 3",
    description: "Top-tier gaming performance.",
    price: 1999,
    quantity: 5,
    categoryName: "Laptops",
    photo: "/Laptop_3.jpg",
    shipping: true
  },
  {
    name: "Business Pro 4",
    description: "Reliable and secure for professionals.",
    price: 1099,
    quantity: 20,
    categoryName: "Laptops",
    photo: "/Laptop_4.jpg",
    shipping: true
  },
  // Watches
  {
    name: "Classic Analog Watch 1",
    description: "Timeless design for every occasion.",
    price: 199,
    quantity: 30,
    categoryName: "Watches",
    photo: "/watch_1.jpg",
    shipping: true
  },
  {
    name: "Smart Fitness Watch 2",
    description: "Track your health and fitness goals.",
    price: 299,
    quantity: 25,
    categoryName: "Watches",
    photo: "/watch_2.jpg",
    shipping: true
  },
  {
    name: "Luxury Gold Watch 3",
    description: "Premium materials and craftsmanship.",
    price: 499,
    quantity: 10,
    categoryName: "Watches",
    photo: "/watch_3.jpg",
    shipping: true
  },
  {
    name: "Sporty Chronograph 4",
    description: "Durable and functional for sports.",
    price: 150,
    quantity: 40,
    categoryName: "Watches",
    photo: "/watch_4.jpg",
    shipping: true
  }
];

const seedData = async () => {
  try {
    await connectDB();

    
    console.log("Clearing old data...");
    await CategoryModel.deleteMany({});
    await ProductModel.deleteMany({});
    console.log("Old data cleared.");

    
    console.log("Inserting categories...");
    const createdCategories = await CategoryModel.insertMany(categories);
    console.log("Categories added.");

    
    console.log("Inserting products...");
    const productData = products.map(p => {
      const category = createdCategories.find(c => c.name === p.categoryName);
      if (!category) {
          console.error(`Category not found for product: ${p.name}`);
          return null;
      }
      
      const { categoryName, ...productDetails } = p;
      return { ...productDetails, category: categoryName };
    }).filter(p => p !== null);

    await ProductModel.insertMany(productData);
    console.log("Products added successfully.");

    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
