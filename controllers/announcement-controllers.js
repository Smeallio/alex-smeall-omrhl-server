const knex = require("knex")(require("../knexfile"));

const getAllAnnouncements = async (_req, res) => {
  try {
    const announcements = await knex("announcements");
    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).send(`Error retrieving players from the database: ${err}`);
  }
};

const addAnnouncement = async (req, res) => {
  if (!req.body.title || !req.body.date || !req.body.body) {
    return res.status(400).json({
      message: "Invalid team - title, date or body",
    });
  }
  try {
    const newAnnoucement = await knex("announcements").insert(req.body);
    res.status(201).json(newAnnoucement);
  } catch (err) {
    res.status(500).json({
      message: `Unable to create new announcement due to: ${err}`,
    });
  }
};

const updateAnnouncement = async (req, res) => {
  if (!req.body.title || !req.body.date || !req.body.body) {
    return res.status(400).json({
      message: "Invalid team - title, date or body",
    });
  }
  try {
    await knex("announcements").where({ id: req.params.announcementId }).update(req.body);
    const updatedAnnouncement = await knex("announcements").where({
      id: req.params.announcementId,
    });

    if (updatedPlayer.length > 0) {
      res.status(201).json(updatedAnnouncement);
    } else {
      res.status(404).json({
        message: "Announcement not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Unable to update announcement due to: ${err}`,
    });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const result = await knex("announcements")
      .where({ id: req.params.announcementId })
      .delete();
      res.status(204).json({ message: `Announcement deleted: ${result}` })
  } catch (err) {
    res.status(500).json({ message: `Unable to delete announcement due to: ${err}` });
  }
};

module.exports = {
  getAllAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
};
