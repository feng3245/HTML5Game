var expect = require("chai").expect;
require("../gameData.js");
describe("getPlayers()",function(){
	 	it("It should return the other as a list of the second input",function(){expect(getPlayers(1, 2).other[0]).to.equal(2);});
	 	it("It should only be used to initialized players", function(){expect(getPlayers(1,2).other.length).to.equal(1);});
	 }
	);
describe("addPlayer", function(){
		var empyList = new Array();
	 	it("It should return the other as a list of the second input",function(){
	 		addPlayer(empyList, 1);
	 		expect(empyList.length).to.equal(1);});
	 });