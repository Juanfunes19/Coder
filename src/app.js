import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import { connectDB } from './database.js';
import handlebars from 'express-handlebars';
import path from 'path';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await connectDB();

// Public
app.use(express.static(path.join(process.cwd(), "src", "public")));

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(process.cwd(), 'src', 'views'));
app.set('view engine', 'handlebars');

// Views Router
import viewsRouter from './routes/views.router.js';
app.use('/', viewsRouter);

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
