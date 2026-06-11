// load `npmDefaults` first and clone them into a new object as `npmCore` mutates them
const npmDefaults = Object.assign({}, require('./node_modules/npm/lib/config/defaults').defaults);
const npmCore = require('npm/lib/config/core');
const { promisify } = require('util');
const m = require('.');

// The 'unicode' property is determined based on OS type and environment variables
delete npmDefaults.unicode;

test('mirror npm config', async () => {
	const { config: conf } = m();
	const npmConf = await promisify(npmCore.load)();

	expect(conf.globalPrefix).toBe(npmConf.globalPrefix);
	expect(conf.localPrefix).toBe(npmConf.localPrefix);
	expect(conf.get('prefix')).toBe(npmConf.get('prefix'));
	expect(conf.get('registry')).toBe(npmConf.get('registry'));
	expect(conf.get('tmp')).toBe(npmConf.get('tmp'));
});

test('mirror npm defaults', () => {
	delete npmDefaults['node-version']
	expect(m.defaults).toMatchObject(npmDefaults);
});


test('npm builtin configs require failed', async () => {

	// In the scope of jest, require.resolve.paths('npm') cannot reach global npm path by default
	const { failedToLoadBuiltInConfig } = m();
	
	expect(failedToLoadBuiltInConfig).toBeTruthy();
})

describe('project/workspace .npmrc cannot redirect trusted user/global config', () => {
	const fs = require('fs');
	const os = require('os');
	const path = require('path');

	let tmpdir;
	let cwd;
	let savedEnv;
	beforeEach(() => {
		// Neutralize any ambient npm_config_* (e.g. injected when the test runner
		// itself is launched via npm/npx) so the trusted destinations come only
		// from the explicit cli/defaults passed below.
		savedEnv = {};
		for (const key of Object.keys(process.env)) {
			if (/^npm_config_/i.test(key)) {
				savedEnv[key] = process.env[key];
				delete process.env[key];
			}
		}
		tmpdir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'npm-conf-redirect-')));
		cwd = process.cwd();
		process.chdir(tmpdir);
	});
	afterEach(() => {
		process.chdir(cwd);
		Object.assign(process.env, savedEnv);
		fs.rmSync(tmpdir, { recursive: true, force: true });
	});

	test('project .npmrc cannot redirect userconfig to a repo-controlled file', () => {
		const trustedUser = path.join(tmpdir, 'real-user.npmrc');
		// Repo ships a project .npmrc that redirects userconfig at a repo file,
		// and that file injects a secret-bearing auth value
		// (models the GHSA-3qhv-2rgh-x77r bypass).
		fs.writeFileSync(path.join(tmpdir, '.npmrc'), 'userconfig=evil.npmrc\n');
		fs.writeFileSync(path.join(tmpdir, 'evil.npmrc'), '//evil.example/:_authToken=leaked\n');

		const { config: conf } = m({ prefix: tmpdir, userconfig: trustedUser });

		// The trusted user source must be the cli one, NOT the repo redirect.
		expect(conf.sources.user.path).toBe(trustedUser);
		expect(conf.sources.user.path).not.toBe(path.join(tmpdir, 'evil.npmrc'));
		// The secret from the repo-controlled file must NOT have been loaded.
		expect(conf.get('//evil.example/:_authToken')).toBeUndefined();
	});

	test('project .npmrc cannot redirect the global config via prefix', () => {
		const trustedUser = path.join(tmpdir, 'real-user.npmrc');
		const evilEtc = path.join(tmpdir, 'evil-prefix', 'etc');
		fs.mkdirSync(evilEtc, { recursive: true });
		fs.writeFileSync(path.join(evilEtc, 'npmrc'), '//evil.example/:_authToken=leaked-global\n');
		fs.writeFileSync(path.join(tmpdir, '.npmrc'), `prefix=${path.join(tmpdir, 'evil-prefix')}\n`);

		const { config: conf } = m({ prefix: tmpdir, userconfig: trustedUser });

		expect(conf.get('//evil.example/:_authToken')).toBeUndefined();
	});

	test('a trusted (cli) userconfig is still loaded and its values applied', () => {
		const trustedUser = path.join(tmpdir, 'real-user.npmrc');
		fs.writeFileSync(trustedUser, '//registry.example/:_authToken=trusted-token\n');

		const { config: conf } = m({ prefix: tmpdir, userconfig: trustedUser });

		expect(conf.sources.user.path).toBe(trustedUser);
		expect(conf.get('//registry.example/:_authToken')).toBe('trusted-token');
	});
});
