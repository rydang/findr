# findr
An application to help find people with similar interests and hobbies

First install node modules.
```
npm install
```

Then choose between running in dev.
```
npm run dev
```
Or building for production.
```
npm run build
npm start
```

A test application to work with Postgres and express-session. I made a conscious effort to move away from JWT's due to their inherent lack of security and stability. Went with the tried and trusted method of session cookies. 

You're going to need to set up a PSQL database with a "findr" database if you want to try this application out.
