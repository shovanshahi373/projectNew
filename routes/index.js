const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Sarokaar",
    layout: "layouts/main"
  });
});

router.get("/developers", (req, res) => {
  res.render("developers", {
    developers: [
      {
        name: "Shovan Shahi",
        img: "/images/developers/sovan.jpg",
        desc:
          "Studying Bsc.CsIT, 7th semester at Tribhuvan University, Mr.Shovan Shahi is primarily interested in frontend development with HTML,CSS, JavaScript, Bootstrap as his tools. Currently shaping his skills on Node js, he has a dream of being a full stack developer.",
        link: "https://www.facebook.com/shovan.shahi"
      },
      {
        name: "Siddhartha Paudel",
        img: "images/developers/sid.jpg",
        desc:
          "Academically strong since his school, Mr.Siddharth Paudel is working as a developer and is polishing his skills on core JavaScript along with React and Node js. Having already worked as a Content Writer, Mr.Paudel is always up with innnovative ideas and has some insight on design aspects as well. ",
        link: "https://www.facebook.com/siddharth.poudel.5"
      },
      {
        name: "Ravi Sah",
        img: "../images/developers/ravi.jpg",
        desc:
          "A teacher, project manager at a non-government organization and an aspiring developer, Mr.Ravi Shah has already proved himself a man of multiple talents. He seeks to become a web developer in future.",
        link: "https://www.facebook.com/ravishah5a"
      },
      {
        name: "Sujit Sharma",
        img: "../images/developers/sujit.jpg",
        desc:
          "Also sutdying CSIT, Mr.Sujit Sharma has a strong background  on programming logics and is able to capture any new stuffs he lays hand on. A java programmer and a backend developer, he's already completed a few projects of his own along with his collegaues mentioned above.",
        link: "https://www.facebook.com/profile.php?id=100011510970747"
      }
    ],
    title: "developers",
    layout: "layouts/main"
  });
});

router.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    layout: "layouts/main"
  });
});

module.exports = router;
