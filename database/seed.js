import pool from './main.js';

async function seed() {
  const connection = await pool.getConnection();

  try {
    console.log('Seeding character vectors...');

    // Basic shapes/characters for demonstration
    const characters = [
      { char: 'A', vector: '<path d="M50 10 L10 90 L90 90 Z M30 60 L70 60" stroke="black" fill="none" stroke-width="2"/>' },
      { char: 'B', vector: '<path d="M20 10 L20 90 L60 90 C80 90 80 50 60 50 L20 50 M60 50 C80 50 80 10 60 10 L20 10" stroke="black" fill="none" stroke-width="2"/>' },
      { char: 'C', vector: '<path d="M80 20 C60 0 20 0 20 50 C20 100 60 100 80 80" stroke="black" fill="none" stroke-width="2"/>' },
      { char: 'D', vector: '<path d="M20 10 L20 90 L50 90 C80 90 80 10 50 10 L20 10" stroke="black" fill="none" stroke-width="2"/>' },
      { char: 'E', vector: '<path d="M80 10 L20 10 L20 50 L70 50 M20 90 L80 90 M20 50 L20 90" stroke="black" fill="none" stroke-width="2"/>' },
      { char: 'F', vector: '<path d="M80 10 L20 10 L20 50 L70 50 M20 50 L20 90" stroke="black" fill="none" stroke-width="2"/>' },
      { char: 'G', vector: '<path d="M80 20 C60 0 20 0 20 50 C20 100 60 100 80 80 L80 50 L50 50" stroke="black" fill="none" stroke-width="2"/>' },
      { char: 'H', vector: '<path d="M20 10 L20 90 M80 10 L80 90 M20 50 L80 50" stroke="black" fill="none" stroke-width="2"/>' },
      { char: 'I', vector: '<path d="M50 10 L50 90 M30 10 L70 10 M30 90 L70 90" stroke="black" fill="none" stroke-width="2"/>' },
      { char: 'J', vector: '<path d="M60 10 L60 70 C60 100 20 100 20 80" stroke="black" fill="none" stroke-width="2"/>' },
      { char: 'K', vector: '<path d="M20 10 L20 90 M20 50 L70 10 M20 50 L70 90" stroke="black" fill="none" stroke-width="2"/>' },
      { char: 'L', vector: '<path d="M20 10 L20 90 L80 90" stroke="black" fill="none" stroke-width="2"/>' },
      { char: 'M', vector: '<path d="M10 90 L10 10 L50 50 L90 10 L90 90" stroke="black" fill="none" stroke-width="2"/>' },
      { char: 'N', vector: '<path d="M20 90 L20 10 L80 90 L80 10" stroke="black" fill="none" stroke-width="2"/>' },
      { char: 'O', vector: '<circle cx="50" cy="50" r="40" stroke="black" fill="none" stroke-width="2"/>' },
      { char: 'P', vector: '<path d="M20 10 L20 90 M20 10 L50 10 C70 10 70 50 50 50 L20 50" stroke="black" fill="none" stroke-width="2"/>' },
      { char: 'Q', vector: '<circle cx="50" cy="50" r="40" stroke="black" fill="none" stroke-width="2"/> <line x1="70" y1="70" x2="90" y2="90" stroke="black" stroke-width="2"/>' },
      { char: 'R', vector: '<path d="M20 10 L20 90 M20 10 L50 10 C70 10 70 50 50 50 L20 50 M50 50 L80 90" stroke="black" fill="none" stroke-width="2"/>' },
      { char: 'S', vector: '<path d="M80 20 C60 0 20 0 20 40 C20 60 80 60 80 80 C80 100 40 100 20 80" stroke="black" fill="none" stroke-width="2"/>' },
      { char: 'T', vector: '<path d="M50 10 L50 90 M10 10 L90 10" stroke="black" fill="none" stroke-width="2"/>' },
      { char: 'U', vector: '<path d="M20 10 L20 70 C20 100 80 100 80 70 L80 10" stroke="black" fill="none" stroke-width="2"/>' },
      { char: 'V', vector: '<path d="M10 10 L50 90 L90 10" stroke="black" fill="none" stroke-width="2"/>' },
      { char: 'W', vector: '<path d="M10 10 L30 90 L50 40 L70 90 L90 10" stroke="black" fill="none" stroke-width="2"/>' },
      { char: 'X', vector: '<path d="M20 10 L80 90 M80 10 L20 90" stroke="black" fill="none" stroke-width="2"/>' },
      { char: 'Y', vector: '<path d="M20 10 L50 50 L80 10 M50 50 L50 90" stroke="black" fill="none" stroke-width="2"/>' },
      { char: 'Z', vector: '<path d="M20 10 L80 10 L20 90 L80 90" stroke="black" fill="none" stroke-width="2"/>' },
    ];

    // Delete existing vectors first to avoid duplicates (optional)
    // await connection.query('DELETE FROM svg_vectors');

    for (const item of characters) {
      // For character vectors, we use sigil_id = 0 or NULL if allowed, 
      // but in schema it's NOT NULL. Let's create a dummy sigil or change schema.
      // Actually, character vectors shouldn't necessarily belong to a sigil.
      // Let's check the schema again. 
      // svg_vectors: sigil_id INT NOT NULL.
      // I'll update the schema to make sigil_id NULLABLE or use a reserved ID.
      // For now, let's just make it NULLABLE.
      
      const [existing] = await connection.query('SELECT id FROM svg_vectors WHERE filename = ?', [item.char]);
        await connection.query(
          'INSERT INTO svg_vectors (filename, vector_data, width, height, file_size, sigil_id) VALUES (?, ?, ?, ?, ?, ?)',
          [item.char, item.vector, 100, 100, item.vector.length, null]
        );
    }

    console.log('Seeding complete.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    connection.release();
    process.exit();
  }
}

seed();
