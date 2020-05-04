function bookController(Book) {
    function post(req, res) {
        const book = new Book(req.body);
        if (!req.body.title) {
            res.status(400);
            return res.send('Title is required');
        }
        book.save();
        res.status(201);
        return res.json(book);
    }

    function get(req, res) {
        const query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Book.find(query, (err, books) => {
            if (err) {
                return res.send(err);
            }
            return res.json(books);
        });
    }

    function put(req, res) {
        const { book } = req; // pull the book out of the req, which has been sent by the middleware
        if (!req.body.title || !req.body.author || !req.body.genre || !req.body.read) {
            res.status(400);
            return res.send('Fields (read, title, genre, author) need to be filled');
        }

        // update theh book with the new values coming from the body
        book.title = req.body.title;
        book.author = req.body.author;
        book.genre = req.body.genre;
        book.read = req.body.read;
        req.book.save((err) => {
            if (err) return res.send(err);
            return res.json(book);
        });

    }

    function patch(req, res) {
        const { book } = req;

        //eslint-disable-next-line no-underscore-dangle
        if (req.body._id) delete req.body._id;
        //eslint-enable-next-line no-underscore-dangle

        Object.entries(req.body).forEach((item) => {
            const key = item[0];
            const value = item[1];
            book[key] = value;
        });
        req.book.save((err) => {
            if (err) return res.send(err);
            return res.json(book);
        });
    }

    function deleteBook(req, res) {
        req.book.remove((err) => {
            if (err) return res.send(err);
            return res.sendStatus(204);
        })
    }

    function getBookIDMiddleware(req, res, next) {
        Book.findById(req.params.bookId, (err, book) => {
            if (err) {
                return res.send(err);
            }
            if (book) {
                req.book = book;
                return next();
            }
            return res.sendStatus(404);
        });
    }

    return { post, get, put, patch, deleteBook, getBookIDMiddleware }; // revealing module pattern
}

module.exports = bookController;