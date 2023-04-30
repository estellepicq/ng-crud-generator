# Angular CRUD Generator

## Description

Minimalist node.js script for creating Reactive Angular CRUDs, with automatic generation of:
- Module
- Service
- Class
- Models for DTO payloads (in/out)
- Component (.html, .scss, .ts)

## Usage

1. `node generate`
2. Answer prompted questions:
    1. **"What is the entity name (ex: tag)?"**

       Type the entity name that you need. For instance if you want to create a city list, type `product`.

    2. **"What is the plural of the entity name (ex: tags)?"**

       Type the plural of the entity name. For the city list, type `cities`.

    3. **"Where to create the new folder (ex: blog/post)?"**

       Path directory of the new folder. For the city list, maybe you want to store in it an `AdminModule` located in `src/app/admin`. If that's so, type `admin`.

    4. **"Do you want to create a module (y/n)?"**

       `y` (yes) or `n` (no) whether you need a dedicated NgModule or not.

## Notes

- You will need to adapt the imports / declarations in the destination NgModule / AppModule
- I use this minamalist script in my personal projects, which all have:
  - Shared table component (`app/shared/ui/table/table.component`)
  - Confirmation dialog service (`app/shared/utils/confirmation-dialog.service`)
  - Snackbar service (`app/shared/utils/snackbar.service`)