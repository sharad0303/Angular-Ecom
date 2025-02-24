const express = require("express")
const cors = require("cors")
const app = express()
const mongoose = require("mongoose")


app.use(cors())

// # db=mongodb://localhost:27017/ecommerce
// db=mongodb://0.0.0.0:27017/ecommerce


mongoose.set('strictQuery', true); // or false, based on your needs

// data base connection

async function Connectdb()
{
   await mongoose.connect("mongodb://0.0.0.0:27017", {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        dbName: "ecommerce",
      });
      console.log("connected");
}

Connectdb().then(() => {
    console.log('MongoDB connected successfully');
  }).catch(err => console.error(err));


app.use(express.json()) // deal with json data
app.use(express.urlencoded({extended:true})) // to read post form, deal with imgs

const staticDir = `${__dirname}/images`
app.use(express.static(staticDir))

const userRoutes = require("./routes/user.routes")
const productRoutes = require("./routes/product.routes")
const categoryRoutes = require("./routes/category.routes")
app.use("/user", userRoutes)
app.use("/product", productRoutes)
app.use("/category", categoryRoutes)

module.exports = app
