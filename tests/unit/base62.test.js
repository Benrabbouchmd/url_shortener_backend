const Base62 = require('../../src/utils.js');

describe('Base62', () => {
    test('should encode and decode numbers correctly', () => {
        const num = Base62.getRange().MIN_VALUE;
        const encoded = Base62.encodeBase62(num);
        expect(encoded.length).toBe(7);
        expect(Base62.decodeBase62(encoded)).toBe(num);
    });
});