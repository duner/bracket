
function Team(name, seed, tournament) {

	this.name = name;
	this.seed = seed;
	this.tournament = tournament;

	this.setName = function(name) {
		this.name = name;
	};

	this.setSeed = function(seed) {
		this.seed = seed;
		tournament.reseedTournament();
	};

}

function Game(Team1, Team2, Victor) {
	this.Team1 = Team1;
	this.Team2 = Team2;
	this.victor = Victor;

	this.setTeamOneScore = function(score) {
		this.Team1.score = score;
	};

	this.setTeamTwoScore = function(score) {
		this.Team2.score = score;
	};

	this.getVictor = function() {
		if (this.Team1.score > this.Team2.score) {
			this.victor = Team1;
			this.Team1.winner = true;
			this.Team2.winner = false;
		} else if (this.Team2.score > this.Team1.score) {
			this.victor = Team2;
			this.Team1.winner = false;
			this.Team2.winner = true;
		} else {
			//deal with tie
		}
		return this.victor;
	};
}

function Round(roundNumber) {
	this.roundNumber = roundNumber;
}

function Tournament(teamArray) {
	this.teamNameArray = teamArray || ["Royals", "Angels", "Dodgers", "Cardinals"];
	this.teams = [];
	this.rounds = [];
	this.init();
}

Tournament.prototype = {

	init: function() {
		this.createTeams(this.teamNameArray);
		this.seedTeams();
		this.createRounds(this.teams);
	},

	calcNumberOfRounds: function(teams) {
		n = (Math.log(this.teams.length * 2) / Math.log(2));
		return n;
	},

	createTeams: function(teamArray) {
		for (var i = teamArray.length - 1; i >= 0; i--) {
			a = new Team(teamArray[i], null, this);
			this.teams.push(a);
		}
	},

	seedTeams: function() {
		for (i = 0; i < this.teams.length; i++) {
			this.teams[i].setSeed(i + 1);
		}
	},

	addTeam: function(team) {
		team.tournament = this;
	}

	reseedTournament: function() {
		this.teams = _.sortBy(this.teams, function(t) { return t.seed; });
	},

	createRounds: function(teams) {
		n = this.calcNumberOfRounds(teams);
		for (var i = 0; i < n - 1; i++) {
			r = new Round(i);
			this.rounds.push(r);
		}
	}
};

tournament = new Tournament();
console.log(tournament);
