const should = require('chai').should();
const { copy } = require('../cp');

describe('#file_copy', () => {
    it('copying a test file', () => {
        copy("ULL-MII-SYTWS-2122/testing-gh-cp", "test/test_file.txt", ".").should.equals("File test/test_file.txt copied succesfuly");
    });
});