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
app.get("/about", (req, res) => {
	res.render("about");
});
app.get("/upcomingEvents", (req, res) => {
	res.render("upcomingEvents");
});
app.get("/pastEvents", (req, res) => {
	res.render("pastEvents");
});
app.get("/schedule", (req, res) => {
	res.render("schedule");
});
app.get("/organisers", (req, res) => {
	res.render("organisers");
});
app.get("/contact", (req, res) => {
	res.render("contact");
});
app.get("/culturalWeek", (req, res) => {
	res.render("culturalWeek");
});
app.get("/techWeek", (req, res) => {
	res.render("techWeek");
});
app.get("/managementWeek", (req, res) => {
	res.render("managementWeek");
});
app.get("/eventRegTemplate", (req, res) => {
	res.render("eventPosters/eventRegTemplate");
});
app.get("/pitchPeak", (req, res) => {
	res.render("eventPosters/pitchPeak");
});
app.get("/artGallery", (req, res) => {
	res.render("eventPosters/artGallery");
});
app.get("/offline", (req, res) => {
	res.render("offline");
});
/*=============================================>>>>>

				= template routes =

===============================================>>>>>*/
app.get("/template/404", (req, res) => {
	res.render("template/404");
});
app.get("/template/blog", (req, res) => {
	res.render("template/blog");
});
app.get("/template/blogSingle", (req, res) => {
	res.render("template/blogSingle");
});
app.get("/template/contact", (req, res) => {
	res.render("template/contact");
});
app.get("/template/creativeAgency", (req, res) => {
	res.render("template/creativeAgency");
});
app.get("/template/index", (req, res) => {
	res.render("template/index");
});
app.get("/template/index2", (req, res) => {
	res.render("template/index2");
});
app.get("/template/portfolio", (req, res) => {
	res.render("template/portfolio");
});
app.get("/template/portfolioSingle", (req, res) => {
	res.render("template/portfolioSingle");
});
app.get("/template/schedule", (req, res) => {
	res.render("template/schedule");
});
app.get("/template/speaker1", (req, res) => {
	res.render("template/speaker1");
});
app.get("/template/speaker2", (req, res) => {
	res.render("template/speaker2");
});
app.get("/template/venue", (req, res) => {
	res.render("template/venue");
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
