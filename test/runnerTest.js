"use strict";

var should = chai.should();
var assert = chai.assert;

describe('Array', function(){
    before(function(){

    });

    describe('#indexOf()', function(){
        it('should return -1 when not present', function(){
            [1,2,3].indexOf(4).should.equal(-1);
        });
    });
});
