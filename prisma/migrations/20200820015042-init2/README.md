# Migration `20200820015042-init2`

This migration has been generated by Xingyi Chen at 8/20/2020, 9:50:42 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `db`.`Workflow` DROP FOREIGN KEY `Workflow_ibfk_5`

ALTER TABLE `db`.`Workflow` DROP FOREIGN KEY `Workflow_ibfk_4`
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200820013112-init..20200820015042-init2
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
@@ -43,9 +43,9 @@
   type  WorkflowType?
   assignee  User?  @relation("assignedToMe",fields: [assigneeId], references: [id])
   creator  User  @relation("createdByMe", fields: [creatorId], references: [id])
   reportor User? @relation("reportedToMe", fields: [reportorId], references: [id])
-  previous  Workflow? @relation("neighbor",fields: [previousId], references: [id])
-  next  Workflow? @relation("neighbor")
-  parent  Workflow? @relation("parentChild", fields: [parentId], references: [id])
-  children  Workflow[] @relation("parentChild")
+  // previous  Workflow? @relation("neighbor",fields: [previousId], references: [id])
+  // next  Workflow? @relation("neighbor")
+  // parent  Workflow? @relation("parentChild", fields: [parentId], references: [id])
+  // children  Workflow[] @relation("parentChild")
 }
```


