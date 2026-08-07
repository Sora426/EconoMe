require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const db = require("./config/database");
require("./models/initDatabase");

const premium = require("./middleware/premium");
const searchRoutes = require("./routes/search");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session({secret: "econome_secret_key",
    
    resave: false,
    saveUninitialized: false
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(premium);

// Routes
app.use("/", require("./routes/index"));
app.use("/", require("./routes/auth"));
app.use("/uploads", express.static("uploads"));
app.use("/favorites",require("./routes/favorite"));
app.use("/search", searchRoutes);
app.use("/articles", require("./routes/article"));
app.use("/books", require("./routes/book"));
app.use("/materials", require("./routes/material"));
app.use("/quizzes", require("./routes/quiz"));
app.use("/premium", require("./routes/premium"));
app.use("/admin", require("./routes/admin"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/admin", require("./routes/admin"));
app.use("/book-progress", require("./routes/bookProgress"));
app.use("/feedback",require("./routes/feedback"));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true when using HTTPS
        maxAge: 1000 * 60 * 60 * 24
    }
}));
app.get("/terms", (req, res) => {
    res.render("legal/terms");
});

app.get("/privacy", (req, res) => {
    res.render("legal/privacy");
});

app.get("/refund", (req, res) => {
    res.render("legal/refund");
});

app.get("/contact", (req, res) => {
    res.render("legal/contact");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
} ); 