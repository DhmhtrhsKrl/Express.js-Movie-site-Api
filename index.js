// HINTS:
// 1. Import express and axios
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// 2. Create an express app and set the port number.
const app = express();
const port = 3000;

const API_URL = "https://owen-wilson-wow-api.onrender.com/wows/random";

app.use(bodyParser.urlencoded({ extended: true }));

// 3. Use the public folder for static files.
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get("https://owen-wilson-wow-api.onrender.com/wows/random?results=100");
    res.render("index.ejs", {
      result: result.data,
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

app.get("/movies", async (req, res) => {
  try {
    const result = await axios.get("https://owen-wilson-wow-api.onrender.com/wows/movies");
    res.render("movies.ejs", {
      result: result.data,
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

app.get("/directors",async (req,res) => {
  try {
    const result = await axios.get("https://owen-wilson-wow-api.onrender.com/wows/directors");
    res.render("directors.ejs", {
     result: result.data 
    })
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
})

app.get("/single-movie/:movie",async (req,res) => {
  try {
    const movie = req.params.movie;
    const result = await axios.get("https://owen-wilson-wow-api.onrender.com/wows/random?movie="+ movie);
    res.render("single-movie.ejs", {
     result: result.data 
    })
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
})

app.post("/get-random-wow", async (req, res) => {
  const search_movie = req.body.spemovie;
  try {
    const result = await axios.get(API_URL + "?movie=" + search_movie);
    res.render("single-movie.ejs", { result: result.data });
  } catch (error) {
    res.render("wows.ejs", { result: JSON.stringify(error.response.data) });
  }
});

// app.post("/post-movie", async (req, res) => {
//   try {
//     const result = await axios.get("https://owen-wilson-wow-api.onrender.com/wows/random?year=2011");
//     res.render("index.ejs", { content: result.data });
//   } catch (error) {
//     res.render("index.ejs", { content: JSON.stringify(error.response.data) });
//   }
// });

// app.post("/post-year", async (req, res) => {
//   try {
//     const result = await axios.post(API_URL + "/secrets", req.body, config);
//     res.render("index.ejs", { content: JSON.stringify(result.data) });
//   } catch (error) {
//     res.render("index.ejs", { content: JSON.stringify(error.response.data) });
//   }
// });

// app.post("/post-director", async (req, res) => {
//   try {
//     const result = await axios.post(API_URL + "/secrets", req.body, config);
//     res.render("index.ejs", { content: JSON.stringify(result.data) });
//   } catch (error) {
//     res.render("index.ejs", { content: JSON.stringify(error.response.data) });
//   }
// });

// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  