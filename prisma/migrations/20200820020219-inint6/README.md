# Migration `20200820020219-inint6`

This migration has been generated by Xingyi Chen at 8/20/2020, 10:02:19 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX `assigneeId` ON `db`.`Workflow`

DROP INDEX `creatorId` ON `db`.`Workflow`

DROP INDEX `reportorId` ON `db`.`Workflow`

ALTER TABLE `db`.`Workflow` ADD FOREIGN KEY (`assigneeId`) REFERENCES `db`.`User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE `db`.`Workflow` ADD FOREIGN KEY (`creatorId`) REFERENCES `db`.`User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `db`.`Workflow` ADD FOREIGN KEY (`reportorId`) REFERENCES `db`.`User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE `db`.`Workflow` ADD FOREIGN KEY (`previousId`) REFERENCES `db`.`Workflow`(`id`) ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE `db`.`Workflow` ADD FOREIGN KEY (`parentId`) REFERENCES `db`.`Workflow`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200820015953-inint5..20200820020219-inint6
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "mysql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -25,11 +25,11 @@
   id    String  @id @default(uuid())
   email String?
   phone String
   name  String?
-  // createdByMe Workflow[]  @relation("createdByMe")
-  // assignedToMe Workflow[] @relation("assignedToMe")
-  // reportedToMe Workflow[] @relation("reportedToMe")
+  createdByMe Workflow[]  @relation("createdByMe")
+  assignedToMe Workflow[] @relation("assignedToMe")
+  reportedToMe Workflow[] @relation("reportedToMe")
 }
 model Workflow {
   name  String?
@@ -40,12 +40,12 @@
   previousId String?
   parentId String?
   state WorkflowState? 
   type  WorkflowType?
-  // assignee  User?  @relation("assignedToMe",fields: [assigneeId], references: [id])
-  // creator  User  @relation("createdByMe", fields: [creatorId], references: [id])
-  // reportor User? @relation("reportedToMe", fields: [reportorId], references: [id])
-  // previous  Workflow? @relation("neighbor",fields: [previousId], references: [id])
-  // next  Workflow? @relation("neighbor")
-  // parent  Workflow? @relation("parentChild", fields: [parentId], references: [id])
-  // children  Workflow[] @relation("parentChild")
+  assignee  User?  @relation("assignedToMe",fields: [assigneeId], references: [id])
+  creator  User  @relation("createdByMe", fields: [creatorId], references: [id])
+  reportor User? @relation("reportedToMe", fields: [reportorId], references: [id])
+  previous  Workflow? @relation("neighbor",fields: [previousId], references: [id])
+  next  Workflow? @relation("neighbor")
+  parent  Workflow? @relation("parentChild", fields: [parentId], references: [id])
+  children  Workflow[] @relation("parentChild")
 }
```

