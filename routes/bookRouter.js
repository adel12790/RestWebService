const express = require('express');
const bookController = require('../controllers/bookController.js');

function routes(Book) {
    const bookRouter = express.Router();
    const controller = bookController(Book);
    bookRouter.route('/books')
        .post(controller.post)
        .get(controller.get);

    // interupt the request middleware to find the book by id and add it to the request
    bookRouter.use('/books/:bookId', controller.getBookIDMiddleware);

    bookRouter.route('/books/:bookId')
        .get((req, res) => res.json(req.book))
        .put(controller.put)
        .patch(controller.patch)
        .delete(controller.deleteBook);
    return bookRouter;
}

module.exports = routes;