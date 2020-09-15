const functions = require("firebase-functions"),
	express = require("express"),
	app = express(),
	morgan = require("morgan");

/*=============================================>>>>>

				= init and config =

===============================================>>>>>*/

app.use(morgan("dev"));
app.set("views", "./views");
app.set("view engine", "ejs");

/*=============================================>>>>>

				= basic routes =

===============================================>>>>>*/

app.get("/", (req, res) => {
	res.render("index");
});
app.get("/offline", (req, res) => {
	res.render("offline");
});
/*=============================================>>>>>

				= template routes =

===============================================>>>>>*/
app.get("/template/", (req, res) => {
	res.render("template/");
});
app.get("/template/", (req, res) => {
	res.render("template/");
});

/*=============================================>>>>>

				= legal routes =

===============================================>>>>>*/

app.get("/privacyPolicy", (req, res) => {
	res.render("legal/privacyPolicy");
});
app.get("/termsConditions", (req, res) => {
	res.render("legal/termsConditions");
});

/*=============================================>>>>>

				= errors =

===============================================>>>>>*/

app.use((req, res) => {
	res.status(404).render("errors/404");
});

exports.app = functions.https.onRequest(app);
