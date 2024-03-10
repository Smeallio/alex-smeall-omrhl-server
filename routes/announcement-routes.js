const router = require("express").Router();
const annoucementController = require("../controllers/announcement-controllers");

router
  .route("/")
  .get(annoucementController.getAllAnnouncements)
  .post(annoucementController.addAnnouncement);

router
  .route("/announcementId")
  .put(annoucementController.updateAnnouncement)
  .delete(annoucementController.deleteAnnouncement);

module.exports = router;
