const express = require("express");
const router = express.Router();

const pool = require("../database")
const { isLoggedIn } = require("../lib/auth.js");


router.get("/add", isLoggedIn, (req, res) => {
    res.render("links/add.hbs");
});

router.post("/add", isLoggedIn, async (req, res)=>{
    const {title, url, description} = req.body;
    const newlink = {
        title,
        url,
        description
    };
    
    await pool.query("insert into links set ?", [newlink]);
    req.flash("success", "Link saved successfully"); //middleware connnect-flash
    res.redirect("/links/");
});

router.get("/", isLoggedIn, async (req, res) => {
    const links = await pool.query("select * from links");
    console.log(links);
    res.render("links/list", {links: links})
});

router.get("/delete/:id_links", isLoggedIn, async(req, res)=>{
    const {id_links} = req.params;
    await pool.query("delete from links where id_links = ?", [id_links]);
    req.flash("success", "Link Removed successfully.");
    res.redirect("/links/");
});

router.get("/edit/:id_links", isLoggedIn, async(req, res)=>{
    const {id_links} = req.params;
    const links = await pool.query("select * from links where id_links = ?", [id_links]);
    console.log(links[0]);
    res.render("links/edit", {link: links[0]});
});

router.post("/edit/:id_links", isLoggedIn, async (req, res)=>{
    const {id_links} = req.params;
    const {title, url, description} = req.body;
    const newlink = {
        title,
        url,
        description
    };
    
    console.log(newlink);
    await pool.query("update links set ?, created_at = current_timestamp where id_links = ?", [newlink, id_links]);

    req.flash("success", "Link updated successfully"); //middleware connnect-flash

    res.redirect("/links");
});

module.exports = router;