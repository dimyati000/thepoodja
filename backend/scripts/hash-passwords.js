require('dotenv').config();
const prisma = require('../prisma');
const bcrypt = require('bcryptjs');

async function main() {
  const admins = await prisma.admin.findMany();
  let updatedCount = 0;

  for (const admin of admins) {
    if (admin.password && !admin.password.startsWith('$2a$') && !admin.password.startsWith('$2b$')) {
      console.log(`Hashing password for admin: ${admin.email}`);
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      await prisma.admin.update({
        where: { id: admin.id },
        data: { password: hashedPassword }
      });
      updatedCount++;
    }
  }

  console.log(`Successfully hashed ${updatedCount} plaintext passwords.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
