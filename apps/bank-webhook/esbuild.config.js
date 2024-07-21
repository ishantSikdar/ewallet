const { build } = require('esbuild');

build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  outfile: './dist/index.js',
  platform: 'node',
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
