const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const uuid = require("uuid").v4;

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

