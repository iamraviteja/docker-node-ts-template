import db from "../../src/db";

const data = [
  {
    name: "Alice",
    email: "alice@prisma.io",
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
  },
];

(async function main() {
  await db.user.createMany({
    data,
  });
})();
