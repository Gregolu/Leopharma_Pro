const fs = require('fs');

const file = 'src/app/pages/patients/patients-list.component.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
    /<input type="text" placeholder="Nom, Prénom, ID, Consultation...">/,
    '<input type="text" placeholder="Nom, Prénom, ID, Consultation..." (input)="onSearch($event)">'
);

content = content.replace(
    /this\.patients = filtered\.slice\(0, 5\);/,
    `this.baseFilteredPatients = filtered;
      this.applySearch();`
);

content = content.replace(
    /showFilters = false;/,
    `showFilters = false;
  searchQuery = '';
  baseFilteredPatients: any[] = [];

  onSearch(event: any) {
    this.searchQuery = event.target.value.toLowerCase();
    this.applySearch();
  }

  applySearch() {
    let filtered = this.baseFilteredPatients.length ? this.baseFilteredPatients : this.allPatients;
    if (this.searchQuery) {
      filtered = filtered.filter(p => {
         const search = this.searchQuery.replace(/\\s+/g, ' ').trim();
         const terms = search.split(' ');
         
         const nom = p.nom.toLowerCase();
         const prenom = p.prenom.toLowerCase();
         // Cherche "Nom Prenom" ou "Prenom Nom"
         const fullA = nom + ' ' + prenom;
         const fullB = prenom + ' ' + nom;
         
         return fullA.includes(search) || fullB.includes(search) || (terms.every(t => nom.includes(t) || prenom.includes(t)));
      });
    }
    // Ne pas limiter l'affichage si une recherche est effectuée ou limiter à plus grand si besoin
    // Mais gardons 5 par défaut, limitons juste à la recherche
    this.patients = filtered.slice(0, 5);
  }
`
);

fs.writeFileSync(file, content);
console.log("Search implemented!");
