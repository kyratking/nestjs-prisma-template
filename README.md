# NestJS Starter Template

This is a starter template for a NestJS project with Prisma as an ORM and a PostgreSQL database.

## Getting Started

To get started:

- Clone the repository and run `npm install`, `yarn install`, or `pnpm install` to install the dependencies.
- Populate the `.env` file with the appropriate values.
- Initiate the Prisma client by running `npx prisma init`.
- Generate the Prisma client types by running `npx prisma generate`.
- Run the application by running `npm run start:dev`, `yarn start:dev`, or `pnpm start:dev`.

## Configuration

This project leverages the NestJS's config module to manage and supply environment variables throughout the application. However, we have some environment variables that are required to be set in the `.env` file to ensure that the application works as expected. So, there's a schema that enforces this. It uses `nestjs-zod` library. You can find the schema in the `src/modules/config/schema` folder.

NestJS config module also allows us to sort the environment variables into different categories. For that, we use the loaders. Each loader is a seperate category in a separate file that you can find in `src/modules/config/loaders` folder. You can add your own loaders and categories as per your requirements. Make sure to import it in the `config.module.ts` file.

## Prisma

Prisma is a modern database toolkit that makes database access easy with an auto-generated query builder and a type-safe database client. It is used in this project to interact with the PostgreSQL database. To push your database changes to the database, run `npx prisma migrate dev` and to generate the Prisma client types, run `npx prisma generate`.

## Prisma Schema Drift

Prisma schema drift is a common problem that you might face when working with Prisma. It occurs when the database schema and the Prisma schema are out of sync. There are many causes for this problem but the most common amongst them is when multiple people are working on their own feature branch and they are all pushing their changes to the database (migrations). This causes the database schema to drift from the Prisma schema. To fix this problem, you can run `npx prisma migrate dev` to push the changes to the database and then run `npx prisma generate` to generate the Prisma client types. But, when a schema drift occurs, the solutions are destructive almost everytime. You might have to drop the database and recreate it. This is why it is important to have a good database migration and project coordination strategy.

## Interacting with the Database

If you are a TypeORM user, you might be used to using the `Repository` pattern to interact with the database. Prisma does not use the `Repository` pattern. Instead, it uses a query builder to interact with the database. You can use the Prisma query builder to interact with the database. These are the steps that you have to follow.

- Create a database model in the `schema.prisma` file.
- Run `npx prisma migrate dev` to push the changes to the database.
- Run `npx prisma generate` to generate the Prisma client types.
- Create a module for the database model or add it to an existing one. Add `PrismaModule` to the `imports` array in the module file.
- Create a service file in which you want to interact with the database.
- In the constructor, import the `PrismaService`.
- Use the `PrismaService` to interact with the database.

```typescript
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<User>= {
    return await this.prisma.user.create({ data: user });
  }
}
```

## Middlewares

This project comes with a default HTTP logger middleware that logs the route information to the database.

## Custom Validators and Transformers

This project comes with following validators:

- Date Validator (dd-MMMM-yyyy) i.e. 01-January-2022
- Integer Validator

This project comes with following transformers:

- Date Transformer (dd-MMMM-yyyy) i.e. 01-January-2022 to JavaScript Date Object
- To lowercase transformer
- Trim transformer

You can use any of the transformers and validators in your DTO by simply importing them and using them as decorators.

## Mailer

This project uses `nodemailer` to send emails. The project has a mailer service that can be used to send emails. This template comes packed with a sample template for `forgot-password` email. You can use this template to send emails to your users.

## Validation Pipe

If you are using transformers on an endpoint, you need to have an option `{ transform: true }` in either your endpoint or globally. I find it problematic to have this option enabled globally as it can cause issues with other endpoints. Therefore, I have created a custom implementation of the `ValidationPipe` that has the `transform` option enabled by default. You can use this pipe in your endpoints to have the `transform` option enabled by default.

## Hashing

For password hashing and salting, this project uses `bcrypt` to hash and compare passwords.

## Custom Wrapper

There are many wrappers that one can create for improving the DX of the application, but one I love the most is `tryOrThrow` wrapper. In backend, it is a common occurence to have multiple validations running in parallel. This wrapper is used to gracefully handle errors and throw them if they occur. To use this wrapper, follow the steps below:

- Create a `validations` array containing all the promises that needs to be resolved in parallel.
- Use the `tryOrThrow` wrapper to resolve the promises and handle the errors gracefully.

```typescript
const validations = [
  this.userService.isUserUnique(firstPartner.email, firstPartner.username),
  this.userService.isUserUnique(secondPartner.email, secondPartner.username),
  this.mediaService.shouldExistPromise(firstPartner.avatar.id),
  this.mediaService.shouldExistPromise(secondPartner.avatar.id),
  this.userService.checkAvatarUniquePromise(firstPartner.avatar),
  this.userService.checkAvatarUniquePromise(secondPartner.avatar),
];
const [firstPartnerUnique, secondPartnerUnique, firstMedia, secondMedia] =
  (await tryOrThrow(validations)) as [boolean, boolean, Media, Media];
```

To add type inference to the `tryOrThrow` wrapper, you can use the `as` keyword to cast the return value to the expected type.

### Note:

The most important part of this topic is how we have to design the validator functions. If we throw an error in the validator function, it isn't caught by the `try/catch` layer but instead, it breaks the application. This has something to do with the NestJS's error handling mechanism. Therefore, we have to make our validator functions a promise in a specific way so that we can pass nice error messages and retrieve data when we want. Below is an example of how we can achieve such functionality.

```javascript
export class MediaService {
  shouldExistPromise(id: number, error?: string) {
    return new Promise<Media>(async (resolve, reject) => {
      const media = await this.getById(id);
      // Reject with the error message and status code
      if (!media) reject([error || 'Media not found', HttpStatus.NOT_FOUND]);
      // Resolve with the return value
      resolve(media);
    });
  }
}
```

## Code Formatting and Linting

Code formatting and linting is a necessary practice to ensure that the code is consistent and follows the best practices. This project uses `prettier` and `eslint` for code formatting and linting. You can run `npm run format` to format the code and `npm run lint` to lint the code.
