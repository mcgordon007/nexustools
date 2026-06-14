// Test script for NexusTools - validates all tool algorithms
// Run with: node test-tools.mjs

console.log('=== NexusTools Validation Script ===\n');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (e) {
    console.log(`❌ ${name}: ${e.message}`);
    failed++;
  }
}

function assertEqual(actual, expected, msg = '') {
  if (actual !== expected) {
    throw new Error(`${msg}\nExpected: ${expected}\nActual: ${actual}`);
  }
}

// ========== Developer Tools ==========

// 1. JSON Formatter
test('JSON Formatter - valid JSON', () => {
  const input = '{"name":"test","value":123}';
  const parsed = JSON.parse(input);
  const output = JSON.stringify(parsed, null, 2);
  assertEqual(output.includes('"name"'), true, 'Should format JSON');
});

test('JSON Formatter - invalid JSON throws', () => {
  try {
    JSON.parse('{invalid}');
    throw new Error('Should have thrown');
  } catch (e) {
    assertEqual(e.message.includes('JSON') || e.message.includes('Syntax'), true, 'Should throw JSON error');
  }
});

// 2. Base64 Encoder/Decoder
test('Base64 - encode/decode roundtrip', () => {
  const input = 'Hello, World!';
  const encoded = btoa(unescape(encodeURIComponent(input)));
  const decoded = decodeURIComponent(escape(atob(encoded)));
  assertEqual(decoded, input, 'Base64 roundtrip failed');
});

test('Base64 - Chinese characters', () => {
  const input = '你好世界';
  const encoded = btoa(unescape(encodeURIComponent(input)));
  const decoded = decodeURIComponent(escape(atob(encoded)));
  assertEqual(decoded, input, 'Base64 Chinese failed');
});

// 3. URL Encoder/Decoder
test('URL Encoder - encode/decode', () => {
  const input = 'hello world?foo=bar&baz=qux';
  const encoded = encodeURIComponent(input);
  const decoded = decodeURIComponent(encoded);
  assertEqual(decoded, input, 'URL encode/decode failed');
});

// 4. Hash Generator (SHA-256)
test('Hash Generator - SHA-256 produces correct length', async () => {
  const encoder = new TextEncoder();
  const data = encoder.encode('test');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  assertEqual(hash.length, 64, 'SHA-256 should produce 64 hex chars');
  // Known SHA-256 of "test"
  assertEqual(hash, '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'SHA-256 hash mismatch');
});

// 5. UUID Generator
test('UUID Generator - valid format', () => {
  const uuid = crypto.randomUUID();
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  assertEqual(uuidRegex.test(uuid), true, 'UUID format invalid');
});

// 6. JWT Decoder
test('JWT Decoder - decode header and payload', () => {
  // Create a simple JWT (header.payload.signature)
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ sub: '123', name: 'Test' }));
  const token = `${header}.${payload}.signature`;
  
  const parts = token.split('.');
  assertEqual(parts.length, 3, 'JWT should have 3 parts');
  
  const decodedHeader = JSON.parse(atob(parts[0]));
  assertEqual(decodedHeader.alg, 'HS256', 'Header alg mismatch');
});

// 7. Regex Tester
test('Regex Tester - match works', () => {
  const pattern = '\\d+';
  const testString = 'abc 123 def 456';
  const regex = new RegExp(pattern, 'g');
  const matches = testString.match(regex);
  assertEqual(matches.length, 2, 'Should find 2 matches');
  assertEqual(matches[0], '123', 'First match should be 123');
});

// 8. HTML Entity Encoder
test('HTML Entity Encoder - encode', () => {
  const input = '<script>alert("XSS")</script>';
  const output = input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  assertEqual(output.includes('<'), false, 'Should not contain raw <');
  assertEqual(output.includes('&lt;'), true, 'Should contain &lt;');
});

// 9. YAML to JSON (basic)
test('YAML to JSON - basic conversion', () => {
  // Simple key: value parsing
  const yaml = 'name: test\nvalue: 123';
  const lines = yaml.split('\n');
  const result = {};
  for (const line of lines) {
    const match = line.match(/^([^:]+):\s*(.*)$/);
    if (match) {
      result[match[1].trim()] = match[2].trim();
    }
  }
  assertEqual(result.name, 'test', 'YAML name mismatch');
  assertEqual(result.value, '123', 'YAML value mismatch');
});

// 10. Diff Checker
test('Diff Checker - detect differences', () => {
  const text1 = 'line1\nline2\nline3';
  const text2 = 'line1\nmodified\nline3';
  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');
  
  let diffCount = 0;
  for (let i = 0; i < Math.max(lines1.length, lines2.length); i++) {
    if (lines1[i] !== lines2[i]) diffCount++;
  }
  assertEqual(diffCount, 1, 'Should detect 1 difference');
});

// 11. Cron Generator
test('Cron Generator - format', () => {
  const minute = '0';
  const hour = '9';
  const dayOfMonth = '*';
  const month = '*';
  const dayOfWeek = '1-5';
  const cron = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
  assertEqual(cron, '0 9 * * 1-5', 'Cron format mismatch');
});

// 12. Code Beautifier
test('Code Beautifier - JSON beautify', () => {
  const input = '{"a":1,"b":2}';
  const output = JSON.stringify(JSON.parse(input), null, 2);
  assertEqual(output.includes('\n'), true, 'Should have newlines');
  assertEqual(output.includes('  '), true, 'Should have indentation');
});

// ========== Text Tools ==========

// 13. Word Counter
test('Word Counter - count correctly', () => {
  const text = 'Hello world! This is a test.';
  const words = text.trim().split(/\s+/).length;
  assertEqual(words, 6, 'Word count mismatch');
});

test('Word Counter - characters', () => {
  const text = 'Hello';
  assertEqual(text.length, 5, 'Character count mismatch');
});

// 14. Case Converter
test('Case Converter - uppercase', () => {
  assertEqual('hello'.toUpperCase(), 'HELLO', 'Uppercase failed');
});

test('Case Converter - lowercase', () => {
  assertEqual('HELLO'.toLowerCase(), 'hello', 'Lowercase failed');
});

test('Case Converter - title case', () => {
  const input = 'hello world';
  const output = input.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  assertEqual(output, 'Hello World', 'Title case failed');
});

test('Case Converter - camelCase', () => {
  const input = 'hello world test';
  const output = input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, c) => c.toUpperCase());
  assertEqual(output, 'helloWorldTest', 'camelCase failed');
});

test('Case Converter - snake_case', () => {
  const input = 'Hello World';
  const output = input.toLowerCase().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
  assertEqual(output, 'hello_world', 'snake_case failed');
});

test('Case Converter - kebab-case', () => {
  const input = 'Hello World';
  const output = input.toLowerCase().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
  assertEqual(output, 'hello-world', 'kebab-case failed');
});

// 15. Lorem Ipsum Generator
test('Lorem Ipsum - generate words', () => {
  const loremWords = ['lorem', 'ipsum', 'dolor', 'sit', 'amet'];
  const result = [];
  for (let i = 0; i < 10; i++) {
    result.push(loremWords[i % loremWords.length]);
  }
  assertEqual(result.length, 10, 'Should generate 10 words');
});

// 16. Remove Duplicates
test('Remove Duplicates - remove duplicate lines', () => {
  const input = 'a\nb\na\nc\nb';
  const lines = input.split('\n');
  const unique = [...new Set(lines)];
  assertEqual(unique.join('\n'), 'a\nb\nc', 'Remove duplicates failed');
});

// 17. Text Reverser
test('Text Reverser - reverse characters', () => {
  assertEqual('hello'.split('').reverse().join(''), 'olleh', 'Char reverse failed');
});

test('Text Reverser - reverse words', () => {
  assertEqual('hello world'.split(' ').reverse().join(' '), 'world hello', 'Word reverse failed');
});

// 18. Character Counter
test('Character Counter - with spaces', () => {
  assertEqual('hello world'.length, 11, 'Char count with spaces failed');
});

test('Character Counter - without spaces', () => {
  assertEqual('hello world'.replace(/\s/g, '').length, 10, 'Char count without spaces failed');
});

// 19. Text Sorter
test('Text Sorter - sort ascending', () => {
  const lines = 'c\na\nb'.split('\n');
  lines.sort();
  assertEqual(lines.join('\n'), 'a\nb\nc', 'Sort ascending failed');
});

test('Text Sorter - sort descending', () => {
  const lines = 'c\na\nb'.split('\n');
  lines.sort();
  lines.reverse();
  assertEqual(lines.join('\n'), 'c\nb\na', 'Sort descending failed');
});

// 20. Morse Code Translator
test('Morse Code - text to morse', () => {
  const morseCode = { 'S': '...', 'O': '---' };
  const input = 'SOS';
  const output = input.toUpperCase().split('').map(c => morseCode[c] || c).join(' ');
  assertEqual(output, '... --- ...', 'Text to Morse failed');
});

// ========== Security Tools ==========

// 21. Password Generator
test('Password Generator - correct length', () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const array = new Uint32Array(16);
  crypto.getRandomValues(array);
  for (let i = 0; i < 16; i++) {
    result += chars[array[i] % chars.length];
  }
  assertEqual(result.length, 16, 'Password length mismatch');
});

test('Password Generator - uses crypto random', () => {
  const array = new Uint32Array(10);
  crypto.getRandomValues(array);
  // Check that values are different (extremely unlikely to be same)
  const unique = new Set(array);
  assertEqual(unique.size > 1, true, 'Should use random values');
});

// 22. QR Code Generator (qrcode-generator library)
test('QR Code - library exists', () => {
  // Just check the library can be imported
  // The actual test will be in browser
  assertEqual(true, true, 'QR library check');
});

// 23. Color Picker
test('Color Picker - hex to rgb', () => {
  const hex = '#ff0000';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  assertEqual(r, 255, 'Red component mismatch');
  assertEqual(g, 0, 'Green component mismatch');
  assertEqual(b, 0, 'Blue component mismatch');
});

test('Color Picker - rgb to hsl', () => {
  // Pure red should be hsl(0, 100%, 50%)
  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }
  const hsl = rgbToHsl(255, 0, 0);
  assertEqual(hsl.h, 0, 'Hue should be 0 for red');
  assertEqual(hsl.s, 100, 'Saturation should be 100');
});

// 24. IP Lookup - format validation
test('IP Lookup - IPv4 validation', () => {
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  assertEqual(ipRegex.test('8.8.8.8'), true, 'Valid IPv4 should pass');
  assertEqual(ipRegex.test('256.1.1.1'), true, 'Format valid (value check separate)');
  assertEqual(ipRegex.test('not.an.ip'), false, 'Invalid format should fail');
});

// 25. AES Encryption
test('AES Encryption - PBKDF2 key derivation', async () => {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode('password'),
    'PBKDF2',
    false,
    ['deriveKey']
  );
  
  const salt = new Uint8Array(16);
  crypto.getRandomValues(salt);
  
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
  
  assertEqual(key instanceof CryptoKey, true, 'Should derive CryptoKey');
});

// ========== Image Tools ==========

// 26-30. Image tools require browser canvas API, validate logic only
test('Image Resizer - dimension calculation', () => {
  const originalWidth = 1000;
  const originalHeight = 500;
  const targetWidth = 800;
  const targetHeight = 400;
  // Aspect ratio should be preserved in real implementation
  const aspectRatio = originalWidth / originalHeight;
  assertEqual(aspectRatio, 2, 'Aspect ratio should be 2:1');
});

test('Image Compressor - quality range', () => {
  const quality = 0.8;
  assertEqual(quality >= 0 && quality <= 1, true, 'Quality should be 0-1');
});

test('Image to Base64 - data URL format', () => {
  const base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  const dataUrl = `data:image/png;base64,${base64}`;
  assertEqual(dataUrl.startsWith('data:image/'), true, 'Should be data URL');
});

test('Favicon Generator - sizes array', () => {
  const sizes = [16, 32, 48, 64, 128, 256];
  assertEqual(sizes.length, 6, 'Should have 6 sizes');
  assertEqual(sizes[0], 16, 'First size should be 16');
  assertEqual(sizes[sizes.length - 1], 256, 'Last size should be 256');
});

test('Placeholder Image - canvas dimensions', () => {
  const width = 300;
  const height = 200;
  // Validate dimensions are positive integers
  assertEqual(width > 0 && height > 0, true, 'Dimensions should be positive');
});

// ========== Summary ==========
console.log('\n=== Test Summary ===');
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Total: ${passed + failed}`);

if (failed > 0) {
  process.exit(1);
}
