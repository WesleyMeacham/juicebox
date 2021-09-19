const express = require("express");
const { getAllTags, getPostsByTagName } = require("../db");
const tagsRouter = express.Router();

tagsRouter.use((req, res, next) => {
	console.log("a request is being made to /tags");

	next();
});

tagsRouter.get("/", async (req, res) => {
	const tags = await getAllTags();

	res.send({
		tags,
	});
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
	// read the tagname from the params
	const { tagName } = req.params;

	try {
		const taggedPost = await getPostsByTagName(tagName);

		if (taggedPost) {
			res.send({ taggedPost });
		} else {
			next({
				name: "TagNotFound",
				message: "No Posts Were Found With This Tag",
			});
		}
	} catch ({ name, message }) {
		next({ name, message });
	}
});

module.exports = tagsRouter;
