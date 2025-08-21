import express from 'express';
import path from 'path'
export const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/stamp', (req, res) => {
  res.render('stamp');
});

app.get('/home', (req, res)=>{
    res.render('home');
})