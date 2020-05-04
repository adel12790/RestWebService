const should = require('should');
const sinon = require('sinon');
const bookController = require('../controllers/bookController');

const Book = function (book) { this.save = () => { } }; // mock book object
describe('Book Controller Tests:', () => {
    describe('Post', () => {
        it('should not allow an empty title on post', () => {


            // a mock request
            const req = {
                body: {
                    authoer: 'jon'
                }
            };

            // this will make us spy on the response data and make sure it returns the right responses
            const res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy()
            };

            const controller = bookController(Book);

            controller.post(req, res);

            res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
            res.send.calledWith('Title is required').should.equal(true);
        });
    });

    describe('Put', () => {
        it('should contain all the fields for the book (read, title, genre, author)', () => {
            // a mock request
            const req = {
                body: {
                    authoer: 'jon'
                }
            };

            // this will make us spy on the response data and make sure it returns the right responses
            const res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy()
            };

            const controller = bookController(Book);

            controller.put(req, res);

            res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
            res.send.calledWith('Fields (read, title, genre, author) need to be filled').should.equal(true);
        })
    })
});