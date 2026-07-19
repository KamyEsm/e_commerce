-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "hasshedPass" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleOnMember" (
    "memberid" INTEGER NOT NULL,
    "roleid" INTEGER NOT NULL,

    CONSTRAINT "RoleOnMember_pkey" PRIMARY KEY ("memberid","roleid")
);

-- AddForeignKey
ALTER TABLE "RoleOnMember" ADD CONSTRAINT "RoleOnMember_memberid_fkey" FOREIGN KEY ("memberid") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleOnMember" ADD CONSTRAINT "RoleOnMember_roleid_fkey" FOREIGN KEY ("roleid") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
