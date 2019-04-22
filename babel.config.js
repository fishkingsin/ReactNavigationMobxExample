module.exports = {
	'presets': ['module:metro-react-native-babel-preset'],
	'plugins': [
		'@babel/plugin-transform-flow-strip-types',
		['@babel/plugin-proposal-decorators', { 'legacy': true }],
		['@babel/plugin-proposal-class-properties', { 'loose': true }],
		[
			'module-resolver',
			{
				'cwd': 'babelrc',
				'extensions': [
					'.js',
					'.ios.js',
					'.android.js'
				],
				'alias': {
					'~': './src',
					'~comp': './src/components',
					'~cont': './src/containers',
					'helper': './testHelpers'
				}
			}
		],
		'relay',
		'jest-hoist',
		'import-glob'
	],
};
