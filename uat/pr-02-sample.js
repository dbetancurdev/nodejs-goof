  const { Router } = require("express");
  const { exec } = require("child_process");

  const router = Router();

  router.get("/pr02/a", function (req, res) {
    var user = req.params["user"];
    exec("ls target/a/" + user + "/", (error, stdout) => res.json({ stdout }));
  });

  router.get("/pr02/b", function (req, res) {
    var folder = req.params["folder"];
    exec("ls target/b/" + folder + "/", (error, stdout) => res.json({ stdout }));
  });

  router.get("/pr02/c", function (req, res) {
    var name = req.params["name"];
    exec("ls target/c/" + name + "/", (error, stdout) => res.json({ stdout }));
  });

  router.get("/pr02/d", function (req, res) {
    var tag = req.params["tag"];
    exec("ls target/d/" + tag + "/", (error, stdout) => res.json({ stdout }));
  });

  router.get("/pr02/remember", function (req, res) {
    let key = Math.random().toString();
    res.cookie("rememberKey", key);
    res.json({ ok: true });
  });

  module.exports = router;
