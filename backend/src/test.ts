import { prisma } from "../prisma/db";

async function main() {
 await prisma.user.create({
  data: {
    email: "test@gmail.com",
    name: "Ali",
    password: "hashedpassword123",
  },
});

  const users = await prisma.user.findMany();
  console.log(users);
}

main();