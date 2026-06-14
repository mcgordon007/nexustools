// Extended validation for critical tools
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

console.log('\n=== Extended Validation ===\n');

// Test QR Code generator library
try {
  const qrcode = require('qrcode-generator');
  const qr = qrcode(0, 'M');
  qr.addData('https://nexustools.io');
  qr.make();
  console.log('✅ QR Code Generator - library works');
  console.log(`   Module count: ${qr.getModuleCount()}`);
} catch (e) {
  console.log('❌ QR Code Generator - library error:', e.message);
}

// Test SHA-256 with known values
console.log('\n--- SHA-256 Known Values ---');
const testCases = [
  { input: '', expected: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
  { input: 'hello', expected: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824' },
  { input: 'Hello, World!', expected: 'dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f' }
];

for (const tc of testCases) {
  const encoder = new TextEncoder();
  const data = encoder.encode(tc.input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hash = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  if (hash === tc.expected) {
    console.log(`✅ SHA-256("${tc.input || '(empty)'}") = correct`);
  } else {
    console.log(`❌ SHA-256("${tc.input || '(empty)'}") mismatch`);
    console.log(`   Expected: ${tc.expected}`);
    console.log(`   Got:      ${hash}`);
  }
}

// Test Base64 with various inputs
console.log('\n--- Base64 Encoding ---');
const base64Tests = [
  { input: 'Hello', expected: 'SGVsbG8=' },
  { input: 'Hello, World!', expected: 'SGVsbG8sIFdvcmxkIQ==' },
  { input: '1234567890', expected: 'MTIzNDU2Nzg5MA==' }
];

for (const tc of base64Tests) {
  const encoded = btoa(tc.input);
  if (encoded === tc.expected) {
    console.log(`✅ Base64("${tc.input}") = ${encoded}`);
  } else {
    console.log(`❌ Base64("${tc.input}") mismatch`);
    console.log(`   Expected: ${tc.expected}`);
    console.log(`   Got:      ${encoded}`);
  }
}

// Test URL encoding
console.log('\n--- URL Encoding ---');
const urlTests = [
  { input: 'hello world', expected: 'hello%20world' },
  { input: 'a=b&c=d', expected: 'a%3Db%26c%3Dd' },
  { input: 'https://example.com/path?query=value', expected: 'https%3A%2F%2Fexample.com%2Fpath%3Fquery%3Dvalue' }
];

for (const tc of urlTests) {
  const encoded = encodeURIComponent(tc.input);
  if (encoded === tc.expected) {
    console.log(`✅ URL Encode("${tc.input.substring(0, 20)}...") = correct`);
  } else {
    console.log(`❌ URL Encode mismatch`);
    console.log(`   Expected: ${tc.expected}`);
    console.log(`   Got:      ${encoded}`);
  }
}

// Test Case Converter edge cases
console.log('\n--- Case Converter Edge Cases ---');
const caseTests = [
  { input: 'HELLO WORLD', to: 'lower', expected: 'hello world' },
  { input: 'hello world', to: 'upper', expected: 'HELLO WORLD' },
  { input: 'hello world', to: 'title', expected: 'Hello World' },
  { input: 'HELLO WORLD', to: 'title', expected: 'Hello World' }
];

for (const tc of caseTests) {
  let result;
  switch (tc.to) {
    case 'lower': result = tc.input.toLowerCase(); break;
    case 'upper': result = tc.input.toUpperCase(); break;
    case 'title': result = tc.input.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()); break;
  }
  if (result === tc.expected) {
    console.log(`✅ ${tc.to}("${tc.input}") = "${result}"`);
  } else {
    console.log(`❌ ${tc.to}("${tc.input}") mismatch`);
    console.log(`   Expected: ${tc.expected}`);
    console.log(`   Got:      ${result}`);
  }
}

// Test Word Counter edge cases
console.log('\n--- Word Counter Edge Cases ---');
const wordTests = [
  { input: '', expectedWords: 0 },
  { input: '   ', expectedWords: 0 },
  { input: 'one', expectedWords: 1 },
  { input: 'one two three', expectedWords: 3 },
  { input: 'one  two   three', expectedWords: 3 } // multiple spaces
];

for (const tc of wordTests) {
  const words = tc.input.trim() ? tc.input.trim().split(/\s+/).length : 0;
  if (words === tc.expectedWords) {
    console.log(`✅ Word count("${tc.input || '(empty)'}") = ${words}`);
  } else {
    console.log(`❌ Word count mismatch for "${tc.input}"`);
    console.log(`   Expected: ${tc.expectedWords}, Got: ${words}`);
  }
}

console.log('\n=== All Extended Tests Complete ===');
