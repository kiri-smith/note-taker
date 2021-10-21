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

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
})

app.get("/api/notes", async (req, res) => {
    const notes = await fs.readFile(path.join(__dirname, "db", "db.json"), { encoding: "utf-8" });
    const notesJSON = JSON.parse(notes);
    res.json(notesJSON);
});

app.post("/api/notes", async (req, res) => {
    const notes = await fs.readFile(path.join(__dirname, "db", "db.json"), { encoding: "utf-8" });
    const notesJSON = JSON.parse(notes);
    const newNote = { ...req.body, id: uuid() };
    notesJSON.push(newNote);
    fs.writeFile(path.join(__dirname, "db", "db.json"), JSON.stringify(notesJSON, null, 2));
    res.json(newNote);
});

app.delete("/api/notes/:id", async (req, res) => {
    const notes = await fs.readFile(path.join(__dirname, "db", "db.json"), { encoding: "utf-8" });
    const notesJSON = JSON.parse(notes).filter((note) => {
        return note.id !== req.params.id;
    });
    fs.writeFile(path.join(__dirname, "db", "db.json"), JSON.stringify(notesJSON, null, 2));
    res.json(notesJSON);
});