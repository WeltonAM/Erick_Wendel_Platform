const File = require("./src/file");
const { error } = require("./src/constants");
const assert = require("assert");

(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv';
        const expected = new Error(error.FILE_EMPTY_ERROR_MESSAGE);
        const result = File.csvToJSON(filePath);

        await assert.rejects(result, expected);
    }

    {
        const filePath = './mocks/five-items-invalid.csv';
        const expected = new Error(error.FILE_EMPTY_ERROR_MESSAGE);
        const result = File.csvToJSON(filePath);

        await assert.rejects(result, expected);
    }

    {
        const filePath = './mocks/invalid-header.csv';
        const expected = new Error(error.FIELD_FIELDS_ERROR_MESSAGE);
        const result = File.csvToJSON(filePath);

        await assert.rejects(result, expected);
    }

    {
        const filePath = './mocks/three-items-valid.csv';
        const expected = [{ id: 1, name: 'John', profession: 'Developer', age: 30 }, { id: 2, name: 'Jane', profession: 'Manager', age: 30 }, { id: 3, name: 'Mary', profession: 'DBA', age: 25 }];

        const result = await File.csvToJSON(filePath);

        assert.deepEqual(result, expected);
    }
})()