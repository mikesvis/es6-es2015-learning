import buble from 'rollup-plugin-buble';

export default {
	// entry: 'src/main.js',
	input: 'main.js',
	output: {
		file: 'main.dist.js',
		format: 'esm'
	},
	plugins: [buble()]
}