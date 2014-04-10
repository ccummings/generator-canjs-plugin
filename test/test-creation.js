/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('canjs-plugin generator', function () {
	beforeEach(function (done) {
		helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
			if (err) {
				return done(err);
			}

			this.app = helpers.createGenerator('canjs-plugin:app', [
				'../../app'
			]);
			done();
		}.bind(this));
	});

	it('creates expected files', function (done) {
		var expected = [
			'.gitignore',
			'bower.json',
			'.jshintrc',
			'.jsbeautifyrc',
			'Gruntfile.js',
			'.editorconfig',
			'package.json',
			'README.md',
			'src/canjs-timetravel.js',
			'example/amd/index.html',
			'example/steal/index.html',
			'example/steal/stealconfig.js',
			'example/steal/steal/steal.js',
			'example/stand-alone/index.html',
			'test/qunit.html',
			'test/canjs-timetravel_tests.js',
		];

		helpers.mockPrompt(this.app, {
			'pluginName': 'timetravel',
			'githubUser': '',
			'pluginDescription': 'Travel through time.',
			'useTravis': false
		});

		this.app.options['skip-install'] = true;

		this.app.run({}, function () {
			helpers.assertFile(expected);
			done();
		});
	});
});
