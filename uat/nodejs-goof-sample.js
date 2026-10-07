const { Router } = require("express");
const { exec } = require("child_process");

const router = Router();

// F004 — CWE-78 — inyección de comandos. 8.1 High.
router.get("/uat/goof/files", function (req, res) {
  var user = req.params["user"];
  exec("ls target/user_files/" + user + "/", (error, stdout) => {
    res.json({ stdout });
  });
});

// Test comment

module.exports = router;
