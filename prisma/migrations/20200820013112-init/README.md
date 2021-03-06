# Migration `20200820013112-init`

This migration has been generated by Xingyi Chen at 8/20/2020, 9:31:12 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `db`.`User` (
`id` varchar(191)  NOT NULL ,
`email` varchar(191)  ,
`phone` varchar(191)  NOT NULL ,
`name` varchar(191)  ,
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `db`.`Workflow` (
`name` varchar(191)  ,
`id` varchar(191)  NOT NULL ,
`assigneeId` varchar(191)  ,
`reportorId` varchar(191)  ,
`creatorId` varchar(191)  NOT NULL ,
`previousId` varchar(191)  ,
`parentId` varchar(191)  ,
`state` ENUM('todo', 'inprogress', 'done', 'closed')  ,
`type` ENUM('sequencial', 'parallel')  ,
UNIQUE Index `Workflow_previousId_unique`(`previousId`),
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

ALTER TABLE `db`.`Workflow` ADD FOREIGN KEY (`assigneeId`) REFERENCES `db`.`User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE `db`.`Workflow` ADD FOREIGN KEY (`creatorId`) REFERENCES `db`.`User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `db`.`Workflow` ADD FOREIGN KEY (`reportorId`) REFERENCES `db`.`User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE `db`.`Workflow` ADD FOREIGN KEY (`previousId`) REFERENCES `db`.`Workflow`(`id`) ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE `db`.`Workflow` ADD FOREIGN KEY (`parentId`) REFERENCES `db`.`Workflow`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200820013112-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,51 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "mysql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+enum WorkflowState {
+  todo
+  inprogress
+  done
+  closed
+}
+enum WorkflowType {
+  sequencial
+  parallel
+}
+
+model User {
+  id    String  @id @default(uuid())
+  email String?
+  phone String
+  name  String?
+  createdByMe Workflow[]  @relation("createdByMe")
+  assignedToMe Workflow[] @relation("assignedToMe")
+  reportedToMe Workflow[] @relation("reportedToMe")
+}
+
+model Workflow {
+  name  String?
+  id  String @id @default(uuid())
+  assigneeId  String?
+  reportorId String?
+  creatorId  String
+  previousId String?
+  parentId String?
+  state WorkflowState? 
+  type  WorkflowType?
+  assignee  User?  @relation("assignedToMe",fields: [assigneeId], references: [id])
+  creator  User  @relation("createdByMe", fields: [creatorId], references: [id])
+  reportor User? @relation("reportedToMe", fields: [reportorId], references: [id])
+  previous  Workflow? @relation("neighbor",fields: [previousId], references: [id])
+  next  Workflow? @relation("neighbor")
+  parent  Workflow? @relation("parentChild", fields: [parentId], references: [id])
+  children  Workflow[] @relation("parentChild")
+}
```


