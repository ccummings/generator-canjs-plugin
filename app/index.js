'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var GitHubAPI = require('github');

var github = new GitHubAPI({
		version: '3.0.0'
	}),
	getGitHubUserInfo = function (user, callback) {
		github.user.getFrom({ user: user }, function (err, res) {
			if (err) { throw err; }
			callback(JSON.parse(JSON.stringify(res)));
		});
	};

var CanjsPluginGenerator = yeoman.generators.Base.extend({
	init: function () {
		this.pkg = require('../package.json');

		this.on('end', function () {
			if (!this.options['skip-install']) {
				this.installDependencies();
			}
		});
	},

	askFor: function () {
		var done = this.async();

		this.log(this.yeoman);

		var welcome = 
			"\n" +
			chalk.white.bgBlue.bold("        CCCCCCCCCCCCC                                             JJJJJJJJJJJ   SSSSSSSSSSSSSSS ") +
			chalk.white.bgBlue.bold("\n     CCC::::::::::::C                                             J:::::::::J SS:::::::::::::::S") +
			chalk.white.bgBlue.bold("\n   CC:::::::::::::::C                                             J:::::::::JS:::::SSSSSS::::::S") +
			chalk.white.bgBlue.bold("\n  C:::::CCCCCCCC::::C                                             JJ:::::::JJS:::::S     SSSSSSS") +
			chalk.white.bgBlue.bold("\n C:::::C       CCCCCC  aaaaaaaaaaaaa  nnnn  nnnnnnnn                J:::::J  S:::::S            ") +
			chalk.white.bgBlue.bold("\nC:::::C                a::::::::::::a n:::nn::::::::nn              J:::::J  S:::::S            ") +
			chalk.white.bgBlue.bold("\nC:::::C                aaaaaaaaa:::::an::::::::::::::nn             J:::::J   S::::SSSS         ") +
			chalk.white.bgBlue.bold("\nC:::::C                         a::::ann:::::::::::::::n            J:::::j    SS::::::SSSSS    ") +
			chalk.white.bgBlue.bold("\nC:::::C                  aaaaaaa:::::a  n:::::nnnn:::::n            J:::::J      SSS::::::::SS  ") +
			chalk.white.bgBlue.bold("\nC:::::C                aa::::::::::::a  n::::n    n::::nJJJJJJJ     J:::::J         SSSSSS::::S ") +
			chalk.white.bgBlue.bold("\nC:::::C               a::::aaaa::::::a  n::::n    n::::nJ:::::J     J:::::J              S:::::S") +
			chalk.white.bgBlue.bold("\n C:::::C       CCCCCCa::::a    a:::::a  n::::n    n::::nJ::::::J   J::::::J              S:::::S") +
			chalk.white.bgBlue.bold("\n  C:::::CCCCCCCC::::Ca::::a    a:::::a  n::::n    n::::nJ:::::::JJJ:::::::J  SSSSSSS     S:::::S") +
			chalk.white.bgBlue.bold("\n   CC:::::::::::::::Ca:::::aaaa::::::a  n::::n    n::::n JJ:::::::::::::JJ   S::::::SSSSSS:::::S") +
			chalk.white.bgBlue.bold("\n     CCC::::::::::::C a::::::::::aa:::a n::::n    n::::n   JJ:::::::::JJ     S:::::::::::::::SS ") +
			chalk.white.bgBlue.bold("\n        CCCCCCCCCCCCC  aaaaaaaaaa  aaaa nnnnnn    nnnnnn     JJJJJJJJJ        SSSSSSSSSSSSSSS   ") +
			"\n" +
			chalk.blue.bold("Thanks for writing a CanJS plugin!");

		this.log(welcome);

		var prompts = [{
			name: 'pluginName',
			type: 'input',
			message: 'What is the name of your plugin?',
			default: 'canjsplugin'
		},
		{
			name: 'githubUser',
			message: 'What is your GitHub username?',
			default: ''
		},
		{
			name: 'pluginDescription',
			message: 'What does your plugin do?',
			default: 'An awesome plugin for CanJS'
		},
		{
			name: 'useTravis',
			type: 'confirm',
			message: 'do you want to use TravisCI?'
		}];

		this.prompt(prompts, function (props) {
			this.pluginName = props.pluginName;
			this.pluginFullName = 'canjs-' + this.pluginName;
			this.githubUser = props.githubUser;
			this.pluginDescription = props.pluginDescription;
			this.useTravis = props.useTravis;

			done();
		}.bind(this));
	},

	userInfo: function() {
		var done = this.async();
		if (this.githubUser.toLowerCase() !== '') {
			this.hasGitHubInfo = true;
			getGitHubUserInfo(this.githubUser, function (res) {
				this.name = res.name;
				this.githubUrl = res.html_url;
				if (res.email) {
					this.email = res.email;
				}
			done();
			}.bind(this));
		} else {
			this.hasGitHubInfo = false;
			this.name = '';
			this.githubUrl = '';
			this.email = '';
			done();
		}
	},

	

	git: function() {
		this.copy('gitignore', '.gitignore');
	},

	bower: function() {
		this.copy('_bower.json', 'bower.json');
		this.copy('bowerrc', '.bowerrc');
	},

	jshint: function() {
		this.copy('jshintrc', '.jshintrc');
	},

	jsbeautify: function() {
		this.copy('jsbeautifyrc', '.jsbeautifyrc');
	},

	gruntfile: function() {
		this.template('_Gruntfile.js', 'Gruntfile.js');
	},

	editorconfig: function () {
		this.copy('editorconfig', '.editorconfig');
	},

	packageJSON: function () {
		this.template('_package.json', 'package.json');
	},

	src: function () {
		this.mkdir('src');
		this.copy('src/src.js', 'src/' + this.pluginFullName + '.js');
	},

	readme: function () {
		this.template('_README.md', 'README.md');
	},

	example: function () {
		var gen = this;
		var examples = ['amd', 'stand-alone', 'steal'];

		this.mkdir('example');

		examples.forEach(function(name){
			gen.mkdir('example/' + name);
			gen.template('example/' + name + '/_index.html', 'example/' + name +'/index.html');
		});

		this.copy('example/steal/stealconfig.js', 'example/steal/stealconfig.js');
		this.bulkDirectory('example/steal/steal', 'example/steal/steal');
	},

	test: function () {
		this.mkdir('test');
		this.template('test/_qunit.html', 'test/qunit.html');
		this.template('test/_qunit.js', 'test/' + this.pluginFullName + '_tests.js');
	}

});

module.exports = CanjsPluginGenerator;