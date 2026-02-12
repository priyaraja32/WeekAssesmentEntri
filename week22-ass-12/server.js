// Import required modules
const express = require("express");
const fs = require("fs");
const cors = require("cors");

// Create express app
const app = express();
const PORT = 3000;

// Middleware to read JSON data from request 
app.use(express.json());
app.use(cors());

// Path of JSON file
const filePath = "./products.json";
 
//GET METHOD - Fetch all products
//Endpoint: /getProducts

app.get("/getProducts", (req, res) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ message: "File read error" });
    res.json(JSON.parse(data));
  });
});


//POST METHOD - Add new product
//Endpoint: /addProduct

app.post("/addProduct", (req, res) => {
  const newProduct = req.body;

  fs.readFile(filePath, "utf-8", (err, data) => {
    const products = JSON.parse(data);
    products.push(newProduct);

    fs.writeFile(filePath, JSON.stringify(products, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "File write error" });
      res.json({ message: "Product Added Successfully", products });
    });
  });
});

//DELETE METHOD - Delete productId
//Endpoints: /deleteProduct/3

app.delete("/deleteProduct/:id", (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ message: "Read error" });

    let products = JSON.parse(data);

    // Remove the products
    
    products = products.filter(p => p && p.productId !== id);

    fs.writeFile(filePath, JSON.stringify(products, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "Write error" });
      res.json({ message: "Product Deleted Successfully", products });
    });
  });
});

//UPDATE METHOD - Update description of productID
// Endpoint: /updateProduct/1  

app.put("/updateProduct/:id", (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile(filePath, "utf-8", (err, data) => {
    let products = JSON.parse(data);

    products = products.map((p) => {
      if (p.productId === id) {
        p.description =
          "Preferred by Both Vegetarian and Non Vegetarian";
      }
      return p;
    });

    fs.writeFile(filePath, JSON.stringify(products, null, 2), (err) => {
      res.json({ message: "Product Updated Successfully", products });
    });
  });
});

// server listen
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});



