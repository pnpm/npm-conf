// load `npmDefaults` first and clone them into a new object as `npmCore` mutates them
const npmDefaults = Object.assign({}, require('@npmcli/config/lib/definitions').defaults);
const npmConf = require('@npmcli/config/lib/definitions').defaults;
const m = require('.');

test('mirror npm config', async () => {
	const { config: conf } = m();

	expect(conf.get('prefix')).toBe(npmConf['prefix']);
	expect(conf.get('registry')).toBe(npmConf['registry']);
	expect(conf.get('tmp')).toBe(npmConf['tmp']);
});

 test('mirror npm defaults', () => {
	delete npmConf['node-version']
	delete npmConf['cache']
	delete npmDefaults['cache']
	expect(m.defaults).toMatchObject(npmDefaults);
}); 


test('npm builtin configs require failed', async () => {

	// In the scope of jest, require.resolve.paths('npm') cannot reach global npm path by default
	const { failedToLoadBuiltInConfig } = m();
	
	expect(failedToLoadBuiltInConfig).toBeTruthy();
})
