const connectDB = require("./db/db");
const Product = require("./models/product");

const jsonProduct = require("./data/products.json");

// connect to Database
connectDB();

const importData = async () => {
  try {
    // Delete existing data
    await Product.deleteMany();

    // create new products from product.json file.
    await Product.create(jsonProduct);

    console.log("products added succesfully".green);
    process.exit(1);
  } catch (error) {
    console.log(error);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();

    console.log("products removed succesfully".red);
    process.exit(1);
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
