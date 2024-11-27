require('dotenv').config();

const express = require('express');
const app = express();
const ejs = require('ejs')
const mysql = require('mysql2/promise'); 
const path = require('path');


// Create a MySQL connection pool 
// Create a MySQL connection pool 
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
}); 


app.get('/', (req, res) => {
  res.render('index'); 
});


//shop route
app.get('/movies', async (req, res) => {
  try {
    // Get the current page from the query string
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 12; // Maximum number of movies per page
    const offset = (page - 1) * limit;


    // Fetch the products from the database
    const [result] = await pool.query('SELECT * FROM movies ORDER BY updated_at DESC LIMIT ? OFFSET ?', [limit, offset]);
    const [totalCount] = await pool.query('SELECT COUNT(*) as total FROM movies');
    const totalPages = Math.ceil(totalCount[0].total / limit);


    // Pass the cart items to the template
    res.render('movies', { result, currentPage: page, totalPages});
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
}); 
  

//product id 
app.get('/movies/:title', async (req, res) => {
  try {
    const movieName = req.params.title;
    const [movie] = await pool.query('SELECT * FROM movies WHERE url = ?', [movieName]);

    if (movie.length === 0) {
      console.log("No product found, sending 404 response");
      return res.status(404).send('Product not found');
    }


    // Pass the product data, average rating, and total ratings to the product template
    res.render('single_movie', { movie, user: { ...req.user}});
  } catch (err) {
    console.error(err);
    console.log("Error in /movies/:title route, sending 500 response");
    res.status(500).send('Internal server error');
  }
});

// Route for the series page
app.get('/shows', async (req, res) => {
  try {
    // Get the current page from the query string
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 12; // Maximum number of movies per page
    const offset = (page - 1) * limit;


    // Fetch all series from the database
    const [seriesData] = await pool.query('SELECT * FROM series ORDER BY updated_at DESC LIMIT ? OFFSET ?', [limit, offset]);
    const [totalCount] = await pool.query('SELECT COUNT(*) as total FROM series');
    const totalPages = Math.ceil(totalCount[0].total / limit);

    // Render the series page with the data
    res.render('shows', { series: seriesData, currentPage: page, totalPages });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

// Route for a specific series
app.get('/shows/:seriesUrl', async (req, res) => {
  try {
    const seriesUrl = req.params.seriesUrl;

    // Fetch the series details using the seriesUrl
    const [seriesData] = await pool.query('SELECT * FROM series WHERE url = ?', [seriesUrl]);

    if (seriesData.length === 0) {
      console.log("No series found, sending 404 response");
      return res.status(404).send('Series not found');
    }

    // Fetch seasons for the series
    const [seasonsData] = await pool.query('SELECT * FROM seasons WHERE series_id = ?', [seriesData[0].id]); // Assuming series_id is the column name for series ID

    // Render the series details page with the data
    res.render('series_details', { series: seriesData[0], seasons: seasonsData });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

// Route for a specific season
app.get('/shows/:seriesUrl/season_:seasonNumber', async (req, res) => {
  try {
    const seriesUrl = req.params.seriesUrl;
    const seasonNumber = req.params.seasonNumber; // Capture season number from the URL

    // Fetch the series details using the seriesUrl
    const [seriesData] = await pool.query('SELECT * FROM series WHERE url = ?', [seriesUrl]);

    if (seriesData.length === 0) {
      console.log("No series found, sending 404 response");
      return res.status(404).send('Series not found');
    }

    // Fetch the season details using the seasonNumber
    const [seasonsData] = await pool.query('SELECT * FROM seasons WHERE series_id = ? AND season_number = ?', [seriesData[0].id, seasonNumber]); // Assuming series_id is the column name for series ID

    if (seasonsData.length === 0) {
      console.log("No season found, sending 404 response");
      return res.status(404).send('Season not found');
    }

    // Fetch episodes for the season
    const [episodesData] = await pool.query('SELECT * FROM episodes WHERE season_id = ?', [seasonsData[0].id]); 

    // Render the season details page with the data
    res.render('season_details', { season: seasonsData[0], episodes: episodesData, series: seriesData[0] }); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  } 
});


// Route for a specific episode
app.get('/shows/:seriesUrl/season_:seasonNumber/episode_:episodeNumber', async (req, res) => {
  try {
    const seriesUrl = req.params.seriesUrl;
    const seasonNumber = req.params.seasonNumber;
    const episodeNumber = req.params.episodeNumber; // Capture episode number from the URL

    // Fetch the series details using the seriesUrl
    const [seriesData] = await pool.query('SELECT * FROM series WHERE url = ?', [seriesUrl]);

    if (seriesData.length === 0) {
      console.log("No series found, sending 404 response");
      return res.status(404).send('Series not found');
    }

    // Fetch the season details using the seasonNumber
    const [seasonsData] = await pool.query('SELECT * FROM seasons WHERE series_id = ? AND season_number = ?', [seriesData[0].id, seasonNumber]); 

    if (seasonsData.length === 0) {
      console.log("No season found, sending 404 response");
      return res.status(404).send('Season not found');
    } 

    // Fetch the episode details using the episodeNumber
    const [episodeData] = await pool.query('SELECT * FROM episodes WHERE season_id = ? AND episode_number = ?', [seasonsData[0].id, episodeNumber]);

    if (episodeData.length === 0) {
      console.log("No episode found, sending 404 response");
      return res.status(404).send('Episode not found');
    }

    // Render the episode details page with the data
    res.render('episode_details', { episode: episodeData[0],  season: seasonsData[0], series: seriesData[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


// Search route
app.get('/search', async (req, res) => {
  const query = req.query.q || '';
  try {
    const [movies] = await pool.execute('SELECT * FROM movies WHERE title LIKE ?', [`%${query}%`]);
    const [series] = await pool.execute('SELECT * FROM series WHERE title LIKE ?', [`%${query}%`]);

    // Combine results and mark their type
    const results = [
      ...movies.map(movie => ({ ...movie, type: 'movie' })),
      ...series.map(serie => ({ ...serie, type: 'series' }))
    ];

    // Sort results alphabetically by title
    results.sort((a, b) => a.title.localeCompare(b.title));

    res.render('search', { results, query });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// GET all categories
app.get('/categories', async (req, res) => {
  try {
    const [categories] = await pool.query('SELECT * FROM categories');
    const [movies] = await pool.query('SELECT m.*, c.name AS category_name FROM movies m JOIN categories_movies cm ON m.id = cm.movie_id JOIN categories c ON cm.category_id = c.id ORDER BY m.updated_at DESC');
    const [series] = await pool.query('SELECT s.*, c.name AS category_name FROM series s JOIN categories_series cs ON s.id = cs.series_id JOIN categories c ON cs.category_id = c.id ORDER BY s.updated_at DESC');

    const content = [...movies, ...series];
    content.sort((a, b) => b.updated_at - a.updated_at); // Sort by updated_at in descending order

    res.render('categories', { categories, content });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

// GET movies/series by category
app.get('/categories/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;
    const [category] = await pool.query('SELECT * FROM categories WHERE slug = ?', [slug]);

    if (category.length === 0) {
      console.log("No category found, sending 404 response");
      return res.status(404).send('Category not found');
    }

    const [movies] = await pool.query('SELECT m.* FROM movies m JOIN categories_movies cm ON m.id = cm.movie_id WHERE cm.category_id = ? ORDER BY m.updated_at DESC', [category[0].id]);
    const [series] = await pool.query('SELECT s.* FROM series s JOIN categories_series cs ON s.id = cs.series_id WHERE cs.category_id = ? ORDER BY s.updated_at DESC', [category[0].id]);


    const content = [...movies, ...series];
    content.sort((a, b) => b.updated_at - a.updated_at); 
    

    res.render('category_details', { category: category[0], content });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});





app.get('/download/:movie', (req, res) => {
  const movie = req.params.movie;
  const file = path.join(__dirname, 'movie', movie);

  res.download(file, (err) => {
      if (err) {
          if (err.code === "ENOENT") {
              console.error(err);
              return res.status(404).send('File not found');
          } else if (res.headersSent) {
              console.error('Headers already sent, cannot send response again.');
          } else {
              console.error(err);
              return res.status(500).send('Internal server error');
          }
      }
  });
});



app.get('/play/:movie', (req, res) => {
  const movie = req.params.movie;
  const file = path.join(__dirname, 'movie', movie);

  res.sendFile(file, (err) => {
      if (err) {
          if (err.code === "ENOENT") {
              console.error(err);
              return res.status(404).send('File not found');
          } else if (res.headersSent) {
              console.error('Headers already sent, cannot send response again.');
          } else {
              console.error(err);
              return res.status(500).send('Internal server error');
          }
      }
  });
});



app.use(express.static('public'));
app.set('view engine', 'ejs');
 


const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});