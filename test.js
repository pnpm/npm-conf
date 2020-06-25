// load `npmDefaults` first and clone them into a new object as `npmCore` mutates them
const npmDefaults = Object.assign({}, require('./node_modules/npm/lib/config/defaults').defaults);
const npmCore = require('npm/lib/config/core');
const { promisify } = require('util');
const m = require('.');

// The 'unicode' property is determined based on OS type and environment variables
delete npmDefaults.unicode;

test('mirror npm config', async () => {
	const conf = m();
	const npmConf = await promisify(npmCore.load)();

	expect(conf.globalPrefix).toBe(npmConf.globalPrefix);
	expect(conf.localPrefix).toBe(npmConf.localPrefix);
	expect(conf.get('prefix')).toBe(npmConf.get('prefix'));
	expect(conf.get('registry')).toBe(npmConf.get('registry'));
	expect(conf.get('tmp')).toBe(npmConf.get('tmp'));
});

test('mirror npm defaults', () => {
	expect(m.defaults).toMatchObject(npmDefaults);
});
