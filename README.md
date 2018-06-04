# WT Projekat CodeReviews
Web app za code reviews studentskih projekata. Podržava generisanje izvještaja, dodjeljivanje studenata za code review, login, registraciju i sesije. Backend je rađen u NodeJs, frontend u raw HTML/CSS/JS.

## Pokretanje 
Prije pokretanja potrebno je instalirati potrebne dependencies:
```
npm install
```

Nakon toga, server se pokreće komandom:
```
node index
```

Stranica se može posjetiti na localhost:3000.

## Baza
Server neće raditi bez uspješne konekcije sa bazom. Potrebno je instalirati MySql i kreirati bazu pod nazivom spirala4, te korisnika sa username i passwordom 'root'.