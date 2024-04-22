const bcrypt = require('bcryptjs');

async function testHash() {
  const password = 'tigri';
  const hash = await bcrypt.hash(password, 10);
  console.log('Hash:', hash);

  const match = await bcrypt.compare(password, hash);
  console.log('Match:', match);
}

testHash();
