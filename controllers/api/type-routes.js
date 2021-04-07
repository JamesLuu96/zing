const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Type, Room } = require("../../models");
const withAuth = require("../../utils/auth");

// get all types
router.get("/", (req, res) => {
	// console.log("======================");
	Type.findAll({
		attributes: ["id", "type_name"],
		include: [
			{
				model: Room,
				attributes: ["id", "room_name"],
			},
		],
	})
		.then((dbTypeData) => res.json(dbTypeData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.post("/", withAuth, (req, res) => {
	Type.create({
		type_name: req.body.type_name,
	})
		.then((dbTypeData) => res.json(dbTypeData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.put("/:id", withAuth, (req, res) => {
	Type.update(
		{
			type_name: req.body.type_name,
		},
		{
			where: {
				id: req.params.id,
			},
		}
	)
		.then((dbTypeData) => {
			if (!dbTypeData) {
				res.status(404).json({ message: "No type found with this id" });
				return;
			}
			res.json(dbTypeData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.delete("/:id", withAuth, (req, res) => {
	Type.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbTypeData) => {
			if (!dbTypeData) {
				res.status(404).json({ message: "No type found with this id" });
				return;
			}
			res.json(dbTypeData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
