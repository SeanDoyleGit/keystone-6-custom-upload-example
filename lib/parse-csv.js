import parse from 'csv-parse/lib/sync';

function streamFile(file) {
  return new Promise((resolve, reject) => {
    let stream = file.createReadStream();

    const chunks = [];

    stream
      .on('data', (chunk) => chunks.push(chunk))
      .on('error', (error) => reject(error))
      .on('end', () => resolve(Buffer.concat(chunks)));
  });
}

// Parses the .csv file and returns an array of objects
// e.g. [{ heading1: "value1", heading2: "value2" }]
export async function parseCSV(file) {
  const fileData = await streamFile(file);
  const data = parse(fileData);

  const output = [];
  const headings = data.splice(0, 1)[0];

  data.forEach((row) => {
    output.push(row.reduce((obj, value, index) => ({ ...obj, [headings[index]]: value }), {}));
  });

  return output;
}
