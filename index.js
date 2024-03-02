const express = require("express");
// to connect for database
const mongoose = require("mongoose");
// create app
const app = express();
app.use(express.static('public'));
// import articles
// odm
const Article = require("./models/Article");
// for use body params
app.use(express.json());

// connect database return Promise
mongoose
  .connect(
    "mongodb+srv://riadosman:_u.wPMm5evs!%40bR@cluster0.qs04zik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connect success");
  })
  .catch((error) => {
    console.log(error);
  });
app.post("/article", async (request, response) => {
  const newArticle = new Article();
  // came from post man
  const artTitle = request.body.articleTitle;
  const artBody = request.body.articleBody;

  newArticle.title = artTitle;
  newArticle.body = artBody;
  newArticle.numberOfLikes = 0;
  await newArticle.save(); // async return promise
  response.json({
    artTitle: artTitle,
    artBody: artBody,
  });
});
app.get("/get_articles", async (request, response) => {
  // get all articles
  const Articles = await Article.find();
  response.json(Articles);
});
app.get("/get_article/:articleId", async (request, response) => {
  const id = request.params.articleId;
  // get one article
  const article = await Article.findById(id);
  response.json(article);
});
app.delete("/get_article/:articleId", async (request, response) => {
  const id = request.params.articleId;
  // delete from database
  const article = await Article.findByIdAndDelete(id);
  response.json(article);
});
app.get("/showArticles", async (request, response) => {
  const Articles = await Article.find();
  response.render('articles.ejs',{
    allArticles: Articles
  })
});
//the pleace for app
app.get("/", (request, response) => {
  // you can write any js code in here and make logic
  response.sendFile(__dirname + '/views/main.html');
});
app.get("/render_ejs_file", (request, response) => {
  const data = "this data come from backend";
  // views folder is default uses in directory and next line mean views/number.ejs file
  response.render("numbers.ejs", {
    // here we send the data to html file
    name: data,
  });
});
app.get("/return_html_file", (request, response) => {
  // __dirname => return the current path for current file (index.js)
  response.sendFile(__dirname + "/views/numbers.html");
});
app.get("/return_html", (request, response) => {
  response.send("<h1>return html this is h1 tag  </h1>");
});
app.get("/return_json", (request, response) => {
  response.send("<h1>hi</h1>");
  // for return json in response
  response.json({
    name: request.body.name,
    language: "arabic",
  });
});
app.get("/send_query_param", (request, response) => {
  // localhost:3001/send_query_param?query1=text
  console.log(request.query.query1);
  response.send("<h1>hi</h1>");
});
app.get("/find_name_body_param", (request, response) => {
  console.log(request.body);
  response.send(`this is body params ${name}`);
});
app.get("/findsum/:num1/:num2", (request, response) => {
  //  path params
  const number1 = request.params.num1;
  const number2 = request.params.num2;
  console.log(request.params);
  response.send(`<h1>Hi numbers ${parseInt(number1) + parseInt(number2)}</h1>`);
});

// listen only one time ,3000 is port
app.listen(3000, () => {
  console.log("i am listening in port 3000");
});
