module.exports = {
  "presets": ["module:metro-react-native-babel-preset"],
  "plugins": [
		[
			"module-resolver",
			{
				"cwd": "babelrc",
				"extensions": [
					".js",
					".ios.js",
					".android.js"
				],
				"alias": {
					"~": "./src",
					"~comp": "./src/components",
					"~cont": "./src/containers",
					"helper": "./testHelpers"
				}
			}
		],
		"relay",
    	"jest-hoist",
		"import-glob"
	]
}
