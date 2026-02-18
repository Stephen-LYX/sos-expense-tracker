# Commands to use during development 

# Commands to use to view db
1. Prisma Studio (The Visual Interface)
```
npx prisma studio
```

2. Schema Sync 
```
npx prisma db pull
```

3. Migration Status
```
npx prisma migrate status
```


# when user updates prisma.schema 
run 
```
npx prisma migrate dev --name whatever_you_want
```

- then run, so your code is updated to the latest database changes
```
npx prisma generate 
```

