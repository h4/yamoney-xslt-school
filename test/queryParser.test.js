"use strict";

var should = chai.should();
var assert = chai.assert;

describe('queryParser', function(){
    before(function(){

    });

    describe('parse', function(){
        it('should be defined', function(){
            queryParser.parse.should.exist;
        });

        it('should be a function', function() {
            queryParser.parse.should.be.a('function');
        });

        it('should return an object', function() {
            var res = queryParser.parse('a=b&c=d');

            res.should.be.an('object');
        });

        it('should parse query', function() {
            var res = queryParser.parse('a=b&c=d');

            res.should.include.keys('a');
            res.should.include.keys('c');
            res.a.should.be.equal('b');
            res.c.should.be.equal('d');
        });

        it('should work with location.search', function() {
            var res = queryParser.parse('?a=b&c=d');

            res.should.include.keys('a');
        });

        it('should work with single param', function() {
            var res = queryParser.parse('a=b');

            res.should.include.keys('a');
        });

        it('should work with encoded values', function() {
            var res = queryParser.parse('a=%D0%BA%D0%BE%D1%82%20%26%20%D0%BF%D1%91%D1%81');

            res.should.include.keys('a');
            res.a.should.be.equal('кот & пёс');
        });

        it('should work with encoded keys and values', function() {
            var res = queryParser.parse('%D0%B0%D0%B2%D1%82%D0%BE%D1%80=%D0%BA%D0%BE%D1%82%20%26%20%D0%BF%D1%91%D1%81');

            res.should.include.keys('автор');
            res['автор'].should.be.equal('кот & пёс');
        });

        it('should return empty object for empty query', function() {
            var res = queryParser.parse('');

            res.should.be.empty;
        });

        it('should return empty string for param without value', function() {
            var res = queryParser.parse('?a=0&b');

            res.a.should.be.equal('0');
            res.b.should.be.equal('');
        });
    });

    describe('buildQuery', function() {
        it('should be defined', function() {
            queryParser.buildQuery.should.be.exist;
        });

        it('should be a function', function() {
            queryParser.buildQuery.should.be.a('function');
        });

        it('should return string', function() {
            var res = queryParser.buildQuery({});

            res.should.be.a('string');
        });

        it('should return a query', function() {
            var res = queryParser.buildQuery({a:'b', c: 'd'});

            res.should.be.equal('a=b&c=d');
        });


        it('should return encoded query', function() {
            var res = queryParser.buildQuery({автор: 'кот & пёс'});

            res.should.be.equal('%D0%B0%D0%B2%D1%82%D0%BE%D1%80=%D0%BA%D0%BE%D1%82%20%26%20%D0%BF%D1%91%D1%81');
        });

        it('should return empty string for empty object', function() {
            var res = queryParser.buildQuery({});

            res.should.be.equal('');
        });

        it('should accept optional url', function() {
            var res = queryParser.buildQuery('http://host.tld', {a: 'b', c: 'd'});

            res.should.be.equal('http://host.tld?a=b&c=d');
        });
    });

    describe('compare', function() {
        it('should be defined', function() {
            queryParser.compare.should.exist;
        });

        it('should be a function', function() {
            queryParser.compare.should.be.a('function');
        });

        it('should return an object with three properties', function() {
            var res = queryParser.compare();

            res.should.be.an('object');
            res.should.include.keys('added', 'removed', 'changed');
        });

        it('should return added params', function() {
            var res = queryParser.compare({a: 'b'}, {a: 'b', c: 'd'});

            res.added.should.be.deep.equal({c: 'd'});
        });

        it('should return removed params', function() {
            var res = queryParser.compare({a: 'b', c: 'd'}, {a: 'b'});

            res.removed.should.be.deep.equal({c: 'd'});
        });

        it('should return changed params', function() {
            var res = queryParser.compare({a: 'd', c: 'b'}, {a: 'b', c: 'd'});

            res.changed.should.be.deep.equal({a: ['d', 'b'], c: ['b', 'd']});
        });

        it('should return object wiht empty results where nothing was changed', function() {
            var res = queryParser.compare({a: 'b', c: 'd'}, {a: 'b', c: 'd'});

            res.added.should.be.empty;
            res.changed.should.be.empty;
            res.removed.should.be.empty;
        });
    });
});
