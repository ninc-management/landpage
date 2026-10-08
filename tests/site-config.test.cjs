const { test } = require('node:test');
const assert = require('node:assert/strict');
const { resolveSiteSettings } = require('../config/site.cjs');

test('the current custom domain uses the root path', () => {
  assert.deepEqual(resolveSiteSettings({}), { url: 'https://ninc.digital/', basePath: '', customDomain: 'ninc.digital' });
});
test('project Pages preserves /landpage for chunks, images and canonical URLs', () => {
  assert.deepEqual(resolveSiteSettings({ NINC_SITE_URL: 'https://ninc-management.github.io/landpage' }), {
    url: 'https://ninc-management.github.io/landpage/', basePath: '/landpage', customDomain: null,
  });
});
test('rejects local, insecure or inconsistent publication addresses', () => {
  for (const url of ['http://ninc.digital', 'https://localhost', 'https://127.0.0.1', 'invalid', 'https://user:pass@example.com', 'https://example.com/?test=1']) {
    assert.throws(() => resolveSiteSettings({ NINC_SITE_URL: url }));
  }
  assert.throws(() => resolveSiteSettings({ NINC_SITE_URL: 'https://ninc.digital/', NEXT_PUBLIC_BASE_PATH: '/landpage' }));
});
