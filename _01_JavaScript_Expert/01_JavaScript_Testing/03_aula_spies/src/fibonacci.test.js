const { createSandbox } = require('sinon');
const sinon = createSandbox();
const Fibonacci = require('./fibonacci');
const assert = require('assert');

; (async () => {
    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(fibonacci, 'execute');

        for (const sequence of fibonacci.execute(3)) { }

        const expectedCallCount = 4;
        assert.strictEqual(spy.callCount, expectedCallCount);
    }

    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(fibonacci, 'execute');

        const result = [...fibonacci.execute(5)];

        const expectedCallCount = 6;
        assert.strictEqual(spy.callCount, expectedCallCount);

        const { args } = spy.getCall(2);
        const expectedParams = [3, 1, 2];
        assert.deepStrictEqual(args, expectedParams, 'First call should have the expected params');

        const expectedResult = [0, 1, 1, 2, 3];
        assert.deepStrictEqual(result, expectedResult, 'Result should be the expected one');
    }
})();