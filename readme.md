# BoxTent Light
## A cosa serve
BoxTent light consente di avere una base di partenza per creare siti statici semplici in HTML/CSS/JS, includendo automazioni per facilitare lo sviluppo e velocizzarlo. Include:

* Compilazione Sass (`.scss`) 
* Ottimizzazione e compressione immagini
* Gestione Favicons
* Autoprefixing del CSS
* Gestione Fonts
* HTML includes

## Come si usa
### Installazione
- Scarica il respository da bitbucket
- Spostane il contenuto tranne i file relativi a git nella cartella del tuo progetto
- Da terminale: `npm install`
- Da terminale: `grunt`
- Vai su `http://localhost:3000` e puoi iniziare a lavorare.

### Struttura cartelle

Lavorare esclusivamente nella cartella `_src`, ciò che vedi sul browser corrisponde al compilato che si trova nella cartella `_dev` (che non dovrai mai modificare).

Nella cartella `_src`:

- `_includes` dovrà contenere gli includes. Ne va usato almeno uno in ogni pagina del sito.
- `fonts` dovrà contenere i font (se ce ne sono). se non ce ne sono o si usa un google font, si può cancellare
- `images` deve contenere le immagini, può contenere sottocartelle e la cartella `favicons` (si deve chiamare così) con le favicons prodotte dal sito http://realfavicongenerator.net/
- `js` contiene i JS, può contenere sottocartelle chiamate come preferisci
- `scss` contiene gli scss.

Con grunt avviato, il watch si occuperà automaticamente di:

- compilare il css
- ottimizzare le immagini e copiare le favicons
- copiare l'html elaborandone gli includes
- copiare i js


