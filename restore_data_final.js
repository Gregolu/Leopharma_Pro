const fs = require('fs');

const pathHtml = 'src/app/pages/exportation/exportation.html';
let html = fs.readFileSync(pathHtml, 'utf8');

// We just need to replace the data parts in the HTML that we hardcoded
html = html.replace("{{ getStudyName(selectedStudy) || 'EndoLife' }}", "{{ getStudyName(selectedStudy) || 'Aucune (Base globale)' }}");

html = html.replace(`<span class="r-label">Selected questionnaires</span>
            <span class="r-value">Follow-up<br>Healthy lifestyle</span>`, `<span class="r-label">Questionnaires sélectionnés</span>
            <span class="r-value">{{ SelectedQuestionnairesCount }} questionnaires actifs</span>`);

html = html.replace(`<span class="r-label">Excluded information</span>
            <div class="r-value stack-info">
              <strong>EHP-5</strong>
              <span>Q1 : <span class="light-text">Sometimes, Often, Always</span></span>
              <span>Q2 : <span class="light-text">Often, Always</span></span>
              <span>Q3 : <span class="light-text">Never to always</span></span>
              <span>Q4: <span class="light-text">Never to always</span></span>
            </div>`, `<span class="r-label">Volume de données</span>
            <div class="r-value stack-info">
              <strong>{{ dynamicCount | number }}</strong>
              <span class="light-text">entrées estimées</span>
            </div>`);

html = html.replace(`<span class="r-label">Exportation name</span>
              <span class="r-value">Export-profile-pain</span>`, `<span class="r-label">Nom de l'exportation</span>
              <span class="r-value">{{ exportName || 'Export global' }}</span>`);

html = html.replace(`<span class="r-label">Export format</span>
              <span class="r-value">.SAV</span>`, `<span class="r-label">Format sélectionné</span>
              <span class="r-value">{{ selectedFormat }}</span>`);

html = html.replace(`<div class="str-row">
              <span class="r-label">Exportation date</span>
              <span class="r-value">03/06/25</span>
            </div>`, ``);

html = html.replace(`<span class="r-label">Export statut</span>
            <span class="r-value status-light">No export</span>`, `<span class="r-label">Statut de l'export</span>
            <span class="r-value status-light">
              {{ lastExportStatus === 'success' ? 'Généré' : (lastExportStatus === 'in-progress' ? 'En cours' : 'Prêt à générer') }}
            </span>`);

html = html.replace(`<h3 class="panel-title-large">Completed export settings</h3>`, `<h3 class="panel-title-large">Paramètres d'export complétés</h3>`);

html = html.replace(`<span class="r-label">Clinical study</span>`, `<span class="r-label">Étude clinique</span>`);

html = html.replace('Edit', 'Modifier');
html = html.replace('Start export', "Lancer l'export");
html = html.replace('Delete this export', 'Annuler cet export');

fs.writeFileSync(pathHtml, html);
console.log('HTML data restored');
