// Generated with `lib/make.js`
'use strict';
const os = require('os');
const path = require('path');
const ciInfo = require('ci-info');

const temp = os.tmpdir();
const uidOrPid = process.getuid ? process.getuid() : process.pid;
const hasUnicode = () => true;
const isWindows = process.platform === 'win32';

const osenv = {
	editor: () => process.env.EDITOR || process.env.VISUAL || (isWindows ? 'notepad.exe' : 'vi'),
	shell: () => isWindows ? (process.env.COMSPEC || 'cmd.exe') : (process.env.SHELL || '/bin/bash')
};

const umask = {
	fromString: () => process.umask()
};

let home = os.homedir();

if (home) {
	process.env.HOME = home;
} else {
	home = path.resolve(temp, 'npm-' + uidOrPid);
}

const cacheExtra = process.platform === 'win32' ? 'npm-cache' : '.npm';
const cacheRoot = process.platform === 'win32' && process.env.APPDATA || home;
const cache = path.resolve(cacheRoot, cacheExtra);

const editor = process.env.EDITOR ||
  process.env.VISUAL ||
  (isWindows ? `undefined\notepad.exe` : 'vi')

const shell = isWindows
  ? process.env.ComSpec || 'cmd'
  : process.env.SHELL || 'sh'

const unicode = /UTF-?8$/i.test(
  process.env.LC_ALL ||
  process.env.LC_CTYPE ||
  process.env.LANG || ''
)

let defaults;
let globalPrefix;

Object.defineProperty(exports, 'defaults', {
	get: function () {
		if (defaults) return defaults;

		if (process.env.PREFIX) {
			globalPrefix = process.env.PREFIX;
		} else if (process.platform === 'win32') {
			// c:\node\node.exe --> prefix=c:\node\
			globalPrefix = path.dirname(process.execPath);
		} else {
			// /usr/local/bin/node --> prefix=/usr/local
			globalPrefix = path.dirname(path.dirname(process.execPath)); // destdir only is respected on Unix

			if (process.env.DESTDIR) {
				globalPrefix = path.join(process.env.DESTDIR, globalPrefix);
			}
		}

	defaults = {
					'_auth' : null,
			'access' : null,
			'all' : false,
			'allow-same-version' : false,
			'also' : null,
			'audit' : true,
			'audit-level' : null,
			'auth-type' : 'web',
			'before' : null,
			'bin-links' : true,
			'browser' : null,
			'ca' : null,
			'cache' : cache,
			'cache-max' : Infinity,
			'cache-min' : 0,
			'cafile' : null,
			'call' : '',
			'cert' : null,
			'cidr' : null,
			'color' : !process.env.NO_COLOR || process.env.NO_COLOR === '0',
			'commit-hooks' : true,
			'cpu' : null,
			'os' : null,
			'depth' : null,
			'description' : true,
			'dev' : false,
			'diff' : [],
			'diff-ignore-all-space' : false,
			'diff-name-only' : false,
			'diff-no-prefix' : false,
			'diff-dst-prefix' : 'b/',
			'diff-src-prefix' : 'a/',
			'diff-text' : false,
			'diff-unified' : 3,
			'dry-run' : false,
			'editor' : editor,
			'engine-strict' : false,
			'fetch-retries' : 2,
			'fetch-retry-factor' : 10,
			'fetch-retry-maxtimeout' : 60000,
			'fetch-retry-mintimeout' : 10000,
			'fetch-timeout' : 5 * 60 * 1000,
			'force' : false,
			'foreground-scripts' : false,
			'format-package-lock' : true,
			'fund' : true,
			'git' : 'git',
			'git-tag-version' : true,
			'global' : false,
			'globalconfig' : '',
			'global-style' : false,
			'heading' : 'npm',
			'https-proxy' : null,
			'if-present' : false,
			'ignore-scripts' : false,
			'include' : [],
			'include-staged' : false,
			'include-workspace-root' : false,
			'init-author-email' : '',
			'init-author-name' : '',
			'init-author-url' : '',
			'init-license' : 'ISC',
			'init-module' : '~/.npm-init.js',
			'init-version' : '1.0.0',
			'init.author.email' : '',
			'init.author.name' : '',
			'init.author.url' : '',
			'init.license' : 'ISC',
			'init.module' : '~/.npm-init.js',
			'init.version' : '1.0.0',
			'install-links' : false,
			'install-strategy' : 'hoisted',
			'json' : false,
			'key' : null,
			'legacy-bundling' : false,
			'legacy-peer-deps' : false,
			'link' : false,
			'local-address' : null,
			'sbom-format' : null,
			'sbom-type' : 'library',
			'location' : 'user',
			'lockfile-version' : null,
			'loglevel' : 'notice',
			'logs-dir' : null,
			'logs-max' : 10,
			'long' : false,
			'maxsockets' : 15,
			'message' : '%s',
			'node-options' : null,
			'noproxy' : '',
			'offline' : false,
			'omit' : process.env.NODE_ENV === 'production' ? ['dev'] : [],
			'omit-lockfile-registry-resolved' : false,
			'only' : null,
			'optional' : null,
			'otp' : null,
			'package' : [],
			'package-lock' : true,
			'package-lock-only' : false,
			'pack-destination' : '.',
			'parseable' : false,
			'prefer-dedupe' : false,
			'prefer-offline' : false,
			'prefer-online' : false,
			'prefix' : '',
			'preid' : '',
			'production' : null,
			'progress' : !ciInfo.isCI,
			'provenance' : false,
			'provenance-file' : null,
			'proxy' : null,
			'read-only' : false,
			'rebuild-bundle' : true,
			'registry' : 'https://registry.npmjs.org/',
			'replace-registry-host' : 'npmjs',
			'save' : true,
			'save-bundle' : false,
			'save-dev' : false,
			'save-exact' : false,
			'save-optional' : false,
			'save-peer' : false,
			'save-prefix' : '^',
			'save-prod' : false,
			'scope' : '',
			'script-shell' : null,
			'searchexclude' : '',
			'searchlimit' : 20,
			'searchopts' : '',
			'searchstaleness' : 15 * 60,
			'shell' : shell,
			'shrinkwrap' : true,
			'sign-git-commit' : false,
			'sign-git-tag' : false,
			'strict-peer-deps' : false,
			'strict-ssl' : true,
			'tag' : 'latest',
			'tag-version-prefix' : 'v',
			'timing' : false,
			'umask' : 0,
			'unicode' : unicode,
			'update-notifier' : true,
			'usage' : false,
			'user-agent' : 'npm/{npm-version} ' + 'node/{node-version} ' + '{platform} ' + '{arch} ' + 'workspaces/{workspaces} ' + '{ci}',
			'userconfig' : '~/.npmrc',
			'version' : false,
			'versions' : false,
			'viewer' : isWindows ? 'browser' : 'man',
			'which' : null,
			'workspace' : [],
			'workspaces' : null,
			'workspaces-update' : true,
			'yes' : null,

		};
		return defaults;
	}
});
	
		