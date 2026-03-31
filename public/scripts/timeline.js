
// ─── DATA ───────────────────────────────────────────────────────────────────
const events = [
	// LITERATURA
	{
		id: 'mallarmé', year: 1897, discipline: 'literatura', emoji: '📖',
		title: 'Un coup de dés', creator: 'Stéphane Mallarmé',
		desc: 'Poema tipográfico que distribuye el texto fragmentado en el espacio de la página como partitura visual. Primer gran manifiesto de la escritura espacial y discontinua.',
		quote: '"Un lanzamiento de dados jamás abolirá el azar."',
		cite: '— Stéphane Mallarmé, 1897',
		tags: ['Simbolismo', 'Poesía concreta', 'Apollinaire', 'e.e. cummings'],
		link: 'https://es.wikipedia.org/wiki/Un_coup_de_d%C3%A9s_jamais_n%27abolira_le_hasard'
	},
	{
		id: 'apollinaire', year: 1913, discipline: 'literatura', emoji: '🌀',
		title: 'Caligramas', creator: 'Guillaume Apollinaire',
		desc: 'Poemas que adoptan la forma visual del objeto descrito. La fragmentación tipográfica y el montaje de voces anticipa el stream of consciousness.',
		quote: '"Venís de un mundo extinguido."',
		cite: '— Apollinaire, Calligrams, 1918',
		tags: ['Vanguardia francesa', 'Futurismo', 'Tzara', 'Poesía concreta'],
		link: 'https://es.wikipedia.org/wiki/Caligramas_(Apollinaire)'
	},
	{
		id: 'dadaismo', year: 1916, discipline: 'literatura', emoji: '✂️',
		title: 'Manifiesto Dadá', creator: 'Tristan Tzara',
		desc: 'Tzara propone cortar un artículo de periódico en palabras, mezclarlas en una bolsa y extraerlas al azar. El poema como radical desarticulación del lenguaje burgués.',
		quote: '"Tome un periódico. Tome unas tijeras."',
		cite: '— Tristan Tzara, instrucciones para un poema dadaísta, 1920',
		tags: ['Dadá', 'Cut-up', 'William Burroughs', 'Azar'],
		link: 'https://es.wikipedia.org/wiki/Dad%C3%A1'
	},
	{
		id: 'eliot', year: 1922, discipline: 'literatura', emoji: '🏚️',
		title: 'La tierra baldía', creator: 'T.S. Eliot',
		desc: 'Poema fundacional del modernismo anglófono. Voces fragmentadas, citas múltiples, cambios de idioma y de registro que recomponen la posguerra como escombros culturales.',
		quote: '"These fragments I have shored against my ruins."',
		cite: '— T.S. Eliot, The Waste Land, 1922',
		tags: ['Modernismo', 'Intertextualidad', 'Pound', 'Montaje'],
		link: 'https://es.wikipedia.org/wiki/La_tierra_bald%C3%ADa'
	},
	{
		id: 'woolf', year: 1925, discipline: 'literatura', emoji: '🌊',
		title: 'La señora Dalloway', creator: 'Virginia Woolf',
		desc: 'La novela desmantela la cronología lineal mediante el flujo de conciencia: múltiples perspectivas que se alternan, el tiempo subjetivo fragmentando el tiempo social.',
		quote: '"Ella existía incluso cuando no la veían."',
		cite: '— Virginia Woolf, Mrs Dalloway, 1925',
		tags: ['Stream of consciousness', 'Joyce', 'Subjetividad', 'Modernismo'],
		link: 'https://es.wikipedia.org/wiki/La_se%C3%B1ora_Dalloway'
	},
	{
		id: 'borges', year: 1944, discipline: 'literatura', emoji: '🔮',
		title: 'Ficciones', creator: 'Jorge Luis Borges',
		desc: 'Laberintos narrativos donde la biblioteca es infinita, el tiempo se bifurca y la identidad se pluraliza. Borges convierte la fragmentación en epistemología: conocer es nunca conocer del todo.',
		quote: '"El tiempo se bifurca perpetuamente hacia futuros innumerables."',
		cite: '— Borges, "El jardín de senderos que se bifurcan", 1941',
		tags: ['Posmodernismo', 'Cortázar', 'Hipertexto', 'Laberinto'],
		link: 'https://es.wikipedia.org/wiki/Ficciones'
	},
	{
		id: 'cortazar', year: 1963, discipline: 'literatura', emoji: '🎲',
		title: 'Rayuela', creator: 'Julio Cortázar',
		desc: 'Novela con instrucciones de lectura múltiples: el lector puede seguir el orden convencional o saltar según un tablero. La fragmentación como forma de libertad y de juego.',
		quote: '"¿Encontraría a la Maga?"',
		cite: '— Julio Cortázar, Rayuela, 1963',
		tags: ['Boom latinoamericano', 'Borges', 'Nouveau roman', 'Lector activo'],
		link: 'https://es.wikipedia.org/wiki/Rayuela_(novela)'
	},
	{
		id: 'burroughs', year: 1959, discipline: 'literatura', emoji: '🔪',
		title: 'El almuerzo desnudo', creator: 'William S. Burroughs',
		desc: 'Escritura mediante cut-up: los textos se cortan físicamente y se reensamblan al azar. La narrativa lineal como prisión; la fragmentación como fuga.',
		quote: '"La palabra es un virus."',
		cite: '— William S. Burroughs, The Electronic Revolution, 1970',
		tags: ['Beat generation', 'Cut-up', 'Tzara', 'Posmodernismo'],
		link: 'https://es.wikipedia.org/wiki/El_almuerzo_desnudo'
	},
	{
		id: 'bolaño', year: 2004, discipline: 'literatura', emoji: '🌃',
		title: '2666', creator: 'Roberto Bolaño',
		desc: 'Cinco novelas dentro de una, unidas por Ciudad Juárez como centro oscuro. La fragmentación es violencia estructural: lo que no puede nombrarse se dispersa en múltiples voces.',
		quote: '"El mal existe, pero el mal principal es el olvido."',
		cite: '— Roberto Bolaño, 2666, 2004',
		tags: ['Posmodernismo latinoamericano', 'Bolaño', 'Narrativa coral', 'Violencia'],
		link: 'https://es.wikipedia.org/wiki/2666'
	},
	{
		id: 'zambra', year: 2011, discipline: 'literatura', emoji: '📝',
		title: 'Formas de volver a casa', creator: 'Alejandro Zambra',
		desc: 'Metaficción chilena que fragmenta el relato entre novela, autobiografía y ensayo. La dictadura como ruptura que se filtra en la sintaxis misma.',
		quote: '"Éramos personajes secundarios en nuestras propias vidas."',
		cite: '— Alejandro Zambra, Formas de volver a casa, 2011',
		tags: ['Literatura chilena', 'Metaficción', 'Bolaño', 'Memoria'],
		link: 'https://es.wikipedia.org/wiki/Alejandro_Zambra'
	},

	// CINE
	{
		id: 'eisenstein', year: 1925, discipline: 'cine', emoji: '🎬',
		title: 'El acorazado Potemkin', creator: 'Sergei Eisenstein',
		desc: 'Teoría del montaje de atracciones: el choque entre planos crea significados imposibles en una sola imagen. La fragmentación fílmica como dialéctica política.',
		quote: '"Dos fragmentos cinematográficos de cualquier tipo colocados juntos inevitablemente crean un nuevo concepto."',
		cite: '— Sergei Eisenstein, Film Form, 1929',
		tags: ['Montaje soviético', 'Godard', 'Cine político', 'Dialéctica'],
		link: 'https://es.wikipedia.org/wiki/El_acorazado_Potemkin'
	},
	{
		id: 'bunuel', year: 1929, discipline: 'cine', emoji: '👁️',
		title: 'Un perro andaluz', creator: 'Luis Buñuel & Salvador Dalí',
		desc: 'El manifiesto del cine surrealista: imágenes oníricas sin causalidad narrativa. La lógica del sueño fragmenta la continuidad cinematográfica en pura asociación libre.',
		quote: '"El único método que funcionaba para nosotros era que ninguna imagen pudiera explicarse racionalmente."',
		cite: '— Luis Buñuel, Mi último suspiro, 1982',
		tags: ['Surrealismo', 'Cine onírico', 'Lynch', 'Anti-narrativa'],
		link: 'https://es.wikipedia.org/wiki/Un_perro_andaluz'
	},
	{
		id: 'godard', year: 1960, discipline: 'cine', emoji: '🎞️',
		title: 'Al final de la escapada', creator: 'Jean-Luc Godard',
		desc: 'Jump cuts que rompen la continuidad espacio-temporal. Godard hace visible el corte, revela el artificio: el cine como fragmento consciente de sí mismo.',
		quote: '"Un film es la vida de alguien que ha pasado a través del objetivo de una cámara."',
		cite: '— Jean-Luc Godard',
		tags: ['Nouvelle Vague', 'Jump cut', 'Auteur', 'Eisenstein'],
		link: 'https://es.wikipedia.org/wiki/Al_final_de_la_escapada'
	},
	{
		id: 'resnais', year: 1961, discipline: 'cine', emoji: '🌀',
		title: 'El año pasado en Marienbad', creator: 'Alain Resnais',
		desc: 'La memoria como laberinto sin solución: el pasado, el presente y la alucinación coexisten sin jerarquía temporal. El guión de Robbe-Grillet fragmenta la causalidad.',
		quote: '"Ya sea que usted haya estado aquí antes o no."',
		cite: '— Alain Robbe-Grillet, guión, 1961',
		tags: ['Nouveau roman', 'Memoria', 'Resnais', 'Anti-narrativa'],
		link: 'https://es.wikipedia.org/wiki/El_a%C3%B1o_pasado_en_Marienbad'
	},
	{
		id: 'glauber', year: 1964, discipline: 'cine', emoji: '🌵',
		title: 'Dios y el diablo en la tierra del sol', creator: 'Glauber Rocha',
		desc: 'Cinema Novo brasileiro: fragmentación narrativa al servicio de la violencia social latinoamericana. La cámara en mano y el montaje áspero rechazan el pulimento del cine de estudio.',
		quote: '"Una idea en la cabeza y una cámara en la mano."',
		cite: '— Glauber Rocha, "Estética del hambre", 1965',
		tags: ['Cinema Novo', 'Tercer cine', 'Fragmentación política', 'Brasil'],
		link: 'https://es.wikipedia.org/wiki/Dios_y_el_Diablo_en_la_Tierra_del_Sol'
	},
	{
		id: 'solanas', year: 1968, discipline: 'cine', emoji: '✊',
		title: 'La hora de los hornos', creator: 'Solanas & Getino',
		desc: 'Documental político de 4 horas en tres partes. El montaje panfletario, los intertítulos, el sonido fragmentado: el Tercer Cine argentino como arma de liberación.',
		quote: '"El cine es el arma más importante para la revolución."',
		cite: '— Fernando Solanas',
		tags: ['Tercer cine', 'Argentina', 'Documental', 'Cine político'],
		link: 'https://es.wikipedia.org/wiki/La_hora_de_los_hornos'
	},
	{
		id: 'kubrick', year: 1968, discipline: 'cine', emoji: '🌌',
		title: '2001: Odisea del espacio', creator: 'Stanley Kubrick',
		desc: 'El elipsis más famoso del cine: de un hueso en el aire a una nave espacial en órbita. La fragmentación temporal radical como expresión de la evolución y la alienación.',
		quote: '"Abre la compuerta del módulo HAL, por favor."',
		cite: '— 2001: A Space Odyssey, 1968',
		tags: ['Elipsis', 'Ciencia ficción', 'Fragmentación temporal', 'Intertítulos'],
		link: 'https://es.wikipedia.org/wiki/2001:_A_Space_Odyssey'
	},
	{
		id: 'lynch', year: 2001, discipline: 'cine', emoji: '🔴',
		title: 'Mulholland Drive', creator: 'David Lynch',
		desc: 'La narrativa se fractura en su segunda mitad revelando que lo anterior era sueño. Los fragmentos no se recomponen: Lynch lleva el surrealismo buñueliano a Hollywood.',
		quote: '"Silencio."',
		cite: '— David Lynch, Mulholland Drive, 2001',
		tags: ['Surrealismo', 'Buñuel', 'Post-clásico', 'Psicoanálisis'],
		link: 'https://es.wikipedia.org/wiki/Mulholland_Drive_(pel%C3%ADcula)'
	},
	{
		id: 'reygadas', year: 2012, discipline: 'cine', emoji: '🌾',
		title: 'Post Tenebras Lux', creator: 'Carlos Reygadas',
		desc: 'El cineasta mexicano fragmenta los géneros y los tiempos narrativos con planos contemplativos y rupturas lógicas. El cine lento latinoamericano como estética de lo inconcluso.',
		quote: '"El tiempo es una ilusión que construimos juntos."',
		cite: '— Carlos Reygadas',
		tags: ['Cine lento', 'México', 'Post-narrativo', 'Contemplación'],
		link: 'https://es.wikipedia.org/wiki/Post_Tenebras_Lux'
	},

	// MÚSICA
	{
		id: 'schoenberg', year: 1908, discipline: 'musica', emoji: '🎼',
		title: 'Tres piezas para piano Op. 11', creator: 'Arnold Schönberg',
		desc: 'Primera música completamente atonal: la jerarquía armónica se fragmenta. La tonalidad como sistema de expectativas que Schönberg destruye sistemáticamente.',
		quote: '"Emancipación de la disonancia."',
		cite: '— Arnold Schönberg',
		tags: ['Atonalidad', 'Segunda Escuela de Viena', 'Webern', 'Serialismo'],
		link: 'https://es.wikipedia.org/wiki/Arnold_Sch%C3%B6nberg'
	},
	{
		id: 'stravinski', year: 1913, discipline: 'musica', emoji: '🩰',
		title: 'La consagración de la primavera', creator: 'Igor Stravinsky',
		desc: 'Ritmos fracturados, polirritmos, cambios de compás radicales. El escándalo del estreno parisino: la fragmentación rítmica como violencia sonora y renovación total de la música occidental.',
		quote: '"El mejor modo de desobedecer es obedecer completamente."',
		cite: '— Igor Stravinsky',
		tags: ['Modernismo musical', 'Ritos', 'Polirritmo', 'Ballet Ruso'],
		link: 'https://es.wikipedia.org/wiki/La_consagraci%C3%B3n_de_la_primavera'
	},
	{
		id: 'cage', year: 1952, discipline: 'musica', emoji: '🤫',
		title: '4\'33"', creator: 'John Cage',
		desc: 'Cuatro minutos y treinta y tres segundos de silencio. El sonido ambiental y el ruido accidental se convierten en música. La fragmentación del silencio como acto compositivo radical.',
		quote: '"No hay silencio. Siempre hay algo que escuchar."',
		cite: '— John Cage, Silence, 1961',
		tags: ['Silencio', 'Azar', 'Musique concrète', 'Fluxus'],
		link: 'https://es.wikipedia.org/wiki/4%E2%80%B233%E2%80%B3'
	},
	{
		id: 'schaeffer', year: 1948, discipline: 'musica', emoji: '💿',
		title: 'Études de bruits', creator: 'Pierre Schaeffer',
		desc: 'Fundación de la musique concrète: grabaciones de trenes, trompos, sonidos cotidianos manipulados y montados como collage sonoro. El sonido fragmentado de su contexto.',
		quote: '"El objeto sonoro es sonido en sí mismo, no en su fuente."',
		cite: '— Pierre Schaeffer',
		tags: ['Música concreta', 'Electroacústica', 'Grabación', 'Collage sonoro'],
		link: 'https://es.wikipedia.org/wiki/Pierre_Schaeffer'
	},
	{
		id: 'stockhausen', year: 1956, discipline: 'musica', emoji: '📡',
		title: 'Gesang der Jünglinge', creator: 'Karlheinz Stockhausen',
		desc: 'Canto de un niño fragmentado, tratado electrónicamente y dispersado en el espacio mediante múltiples altavoces. El primer gran logro de la música electrónica espacializada.',
		quote: '"La música debe provenir de todas partes."',
		cite: '— Karlheinz Stockhausen',
		tags: ['Electroacústica', 'Espacialización', 'Serialismo', 'Cologne'],
		link: 'https://es.wikipedia.org/wiki/Gesang_der_J%C3%BCnglinge'
	},
	{
		id: 'villalobo', year: 1923, discipline: 'musica', emoji: '🌴',
		title: 'Choros', creator: 'Heitor Villa-Lobos',
		desc: 'Serie de piezas que fragmentan y fusionan la música popular brasileña con el modernismo europeo. La síncopa y la superposición como identidad latinoamericana quebrada y recompuesta.',
		quote: '"La fusión de la selva y la ciudad."',
		cite: '— Heitor Villa-Lobos',
		tags: ['Modernismo latinoamericano', 'Folklore', 'Brasil', 'Fusión'],
		link: 'https://es.wikipedia.org/wiki/Heitor_Villa-Lobos'
	},
	{
		id: 'xenakis', year: 1958, discipline: 'musica', emoji: '📐',
		title: 'Metastasis / Achorripsis', creator: 'Iannis Xenakis',
		desc: 'Música estocástica: las masas sonoras se calculan con teoría de probabilidades. El sonido como multitud de partículas fragmentadas, nunca melódico sino estadístico.',
		quote: '"La música es arquitectura en el tiempo."',
		cite: '— Iannis Xenakis',
		tags: ['Estocástico', 'Matemáticas', 'Masa sonora', 'Arquitectura'],
		link: 'https://es.wikipedia.org/wiki/Iannis_Xenakis'
	},
	{
		id: 'aphex', year: 1994, discipline: 'musica', emoji: '🤖',
		title: 'Selected Ambient Works Vol. II', creator: 'Aphex Twin',
		desc: 'Texturas fragmentadas, sin ritmo convencional, sin melodía reconocible. Richard D. James hereda a Schaeffer y Cage y los lleva a la era del sampler digital. El ambient como fragmento infinito.',
		quote: '"Quiero hacer música que te haga sentir algo que no puedes nombrar."',
		cite: '— Richard D. James (Aphex Twin)',
		tags: ['Electrónica', 'Ambient', 'Música concreta', 'IDM'],
		link: 'https://es.wikipedia.org/wiki/Selected_Ambient_Works_Volume_II'
	},
	{
		id: 'matmos', year: 2001, discipline: 'musica', emoji: '🫀',
		title: 'A Chance to Cut is a Chance to Cure', creator: 'Matmos',
		desc: 'Álbum construido íntegramente con sonidos de cirugías: huesos, liposucción, láser ocular. Radicalización del musique concrète: el cuerpo fragmentado como fuente sonora.',
		quote: '"Todo sonido es válido como material musical."',
		cite: '— Matmos',
		tags: ['Música concreta', 'Body music', 'Experimental', 'Postmoderno'],
		link: 'https://es.wikipedia.org/wiki/Matmos'
	},
	{
		id: 'haswell', year: 2016, discipline: 'musica', emoji: '⚡',
		title: 'Reproces', creator: 'Russell Haswell & Peter Rehberg',
		desc: 'Música de error y glitch: el fallo de los sistemas digitales como estética. La fragmentación del dato corrupto, el bit roto como forma de expresión en la era de la sobreproducción.',
		quote: '"El error es la nota más interesante."',
		cite: '— Rashad Becker (productor de referencia en el campo)',
		tags: ['Glitch', 'Error', 'Digital', 'Noise'],
		link: 'https://es.wikipedia.org/wiki/Glitch_music'
	},

	// ARTES VISUALES
	{
		id: 'picasso', year: 1907, discipline: 'visuales', emoji: '🔷',
		title: 'Las señoritas de Aviñón', creator: 'Pablo Picasso',
		desc: 'El cubismo fragmenta el cuerpo en múltiples perspectivas simultáneas. La representación unificada se destruye: el ojo ya no puede ver todo desde un solo punto.',
		quote: '"El arte es mentira que nos hace ver la verdad."',
		cite: '— Pablo Picasso',
		tags: ['Cubismo', 'Braque', 'Simultaneidad', 'Anti-perspectiva'],
		link: 'https://es.wikipedia.org/wiki/Las_se%C3%B1oritas_de_Avi%C3%B1%C3%B3n'
	},
	{
		id: 'schwitters', year: 1919, discipline: 'visuales', emoji: '🗞️',
		title: 'Merzbau', creator: 'Kurt Schwitters',
		desc: 'Construcciones de desechos: billetes de tren, alambre, basura recogida de la calle. El collage como arqueología del fragmento cotidiano; Schwitters anticipa el arte de instalación.',
		quote: '"Todo lo que el artista escupe es arte."',
		cite: '— Kurt Schwitters',
		tags: ['Dadá', 'Collage', 'Assemblage', 'Arte povera'],
		link: 'https://es.wikipedia.org/wiki/Kurt_Schwitters'
	},
	{
		id: 'duchamp', year: 1917, discipline: 'visuales', emoji: '🚽',
		title: 'Fountain (Readymade)', creator: 'Marcel Duchamp',
		desc: 'El objeto de uso cotidiano como obra de arte: el readymade fragmenta la distinción entre arte y vida. El gesto conceptual es la obra; el objeto es solo un soporte.',
		quote: '"El artista del futuro se limitará a señalar."',
		cite: '— Marcel Duchamp',
		tags: ['Readymade', 'Arte conceptual', 'Fluxus', 'Postmodernismo'],
		link: 'https://es.wikipedia.org/wiki/Fountain_(Duchamp)'
	},
	{
		id: 'lam', year: 1943, discipline: 'visuales', emoji: '🌿',
		title: 'La jungla', creator: 'Wifredo Lam',
		desc: 'El cubismo en el Caribe: cuerpos fragmentados que fusionan las figuras afrocubanas con el lenguaje plástico de Picasso. La fragmentación como espacio de resistencia colonial.',
		quote: '"Quería que mi pintura actuara como un hecho perturbador."',
		cite: '— Wifredo Lam',
		tags: ['Cubismo latinoamericano', 'Santería', 'Cuba', 'Picasso'],
		link: 'https://es.wikipedia.org/wiki/Wifredo_Lam'
	},
	{
		id: 'fluxus', year: 1960, discipline: 'visuales', emoji: '🎭',
		title: 'Eventos Fluxus', creator: 'George Maciunas & Yoko Ono',
		desc: 'Performances basadas en instrucciones fragmentadas: "Destroza esta pintura", "Entra en un cuarto y respira". El arte como acción discontinua, el objeto artístico disuelto en el tiempo.',
		quote: '"El arte es lo que el artista llama arte."',
		cite: '— George Maciunas',
		tags: ['Performance', 'Arte conceptual', 'Cage', 'Instrucción'],
		link: 'https://es.wikipedia.org/wiki/Fluxus'
	},
	{
		id: 'boetti', year: 1971, discipline: 'visuales', emoji: '🗺️',
		title: 'Mappa', creator: 'Alighiero Boetti',
		desc: 'Mapas del mundo bordados por artesanas afganas siguiendo instrucciones enviadas por correo. El arte fragmentado en el espacio (Italia/Afganistán), el tiempo (años de bordado), los autores (múltiples manos).',
		quote: '"Hacer y dejar hacer."',
		cite: '— Alighiero Boetti',
		tags: ['Arte conceptual', 'Arte povera', 'Colaboración', 'Proceso'],
		link: 'https://es.wikipedia.org/wiki/Alighiero_Boetti'
	},
	{
		id: 'sierra', year: 2000, discipline: 'visuales', emoji: '🧱',
		title: 'Workers who cannot be paid', creator: 'Santiago Sierra',
		desc: 'Arte político latinoamericano: personas reales contratadas para realizar acciones sin sentido o dolorosas. La fragmentación del sujeto social como material artístico bruto.',
		quote: '"Pago el salario mínimo para evidenciar su existencia."',
		cite: '— Santiago Sierra',
		tags: ['Arte político', 'México', 'Trabajo', 'Cuerpo'],
		link: 'https://es.wikipedia.org/wiki/Santiago_Sierra_(artista)'
	},
	{
		id: 'glitch', year: 2010, discipline: 'visuales', emoji: '📺',
		title: 'Estética Glitch / Post-internet', creator: 'Rosa Menkman & Artistas digitales',
		desc: 'El error digital como belleza: píxeles corruptos, compresión JPEG llevada al extremo. El glitch art convierte el fallo del sistema en forma estética y crítica política de la perfección tecnológica.',
		quote: '"El glitch es el momento en que el sistema muestra lo que es."',
		cite: '— Rosa Menkman, The Glitch Moment(um), 2011',
		tags: ['Arte digital', 'Error', 'Post-internet', 'Corrupción de datos'],
		link: 'https://es.wikipedia.org/wiki/Arte_glitch'
	},
];

// ─── TIMELINE CONFIG ────────────────────────────────────────────────────────
const START_YEAR = 1895;
const END_YEAR = 2024;
const PX_PER_YEAR = 80;
const TRACK_LEFT = 120;

const ERAS = [
	{ label: 'Vanguardias', start: 1895, end: 1940 },
	{ label: 'Neovanguardias', start: 1940, end: 1968 },
	{ label: 'Boom & Nuevos cines', start: 1968, end: 1985 },
	{ label: 'Posmodernismo', start: 1985, end: 2000 },
	{ label: 'Digital & Experimental', start: 2000, end: 2024 },
];

const DISCIPLINES = ['literatura', 'cine', 'musica', 'visuales'];
const DISC_LABELS = { literatura: 'Literatura', cine: 'Cine', musica: 'Música', visuales: 'Artes Visuales' };

const DISC_COLORS = {
	literatura: 'var(--lit)',
	cine: 'var(--cin)',
	musica: 'var(--mus)',
	visuales: 'var(--vis)',
};

// ─── THEME ───────────────────────────────────────────────────────────────────
function toggleTheme() {
	const isLight = document.documentElement.classList.toggle('light');
	localStorage.setItem('theme', isLight ? 'light' : 'dark');
	buildTimeline(); // rebuild to pick up new CSS variable values
}

document.getElementById('themeToggleBtn')?.addEventListener('click', toggleTheme);

// ─── ZOOM ───────────────────────────────────────────────────────────────────
let zoomLevel = 1;
const ZOOM_STEPS = [0.6, 0.8, 1, 1.3, 1.6, 2];
let zoomIndex = 2;

function changeZoom(dir) {
	zoomIndex = Math.max(0, Math.min(ZOOM_STEPS.length - 1, zoomIndex + dir));
	zoomLevel = ZOOM_STEPS[zoomIndex];
	document.getElementById('zoomLabel').textContent = Math.round(zoomLevel * 100) + '%';
	buildTimeline();
}

document.querySelectorAll('.zoom-btn')
	.forEach(btn => {
		btn.addEventListener('click', () => {
			const zoom = Number(btn.dataset.zoom);
			changeZoom(zoom);
		});
	});

// ─── BUILD ───────────────────────────────────────────────────────────────────
function yearToX(year) {
	return TRACK_LEFT + (year - START_YEAR) * PX_PER_YEAR * zoomLevel;
}

function getVar(name) {
	return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function buildTimeline() {
	const inner = document.getElementById('timelineInner');
	const totalWidth = TRACK_LEFT + (END_YEAR - START_YEAR) * PX_PER_YEAR * zoomLevel + 80;
	inner.style.width = totalWidth + 'px';
	inner.innerHTML = '';

	// Era background bands
	const eraBg = document.createElement('div');
	eraBg.style.cssText = `position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;`;
	ERAS.forEach((era, i) => {
		const x = yearToX(era.start);
		const w = yearToX(era.end) - x;
		const band = document.createElement('div');
		band.style.cssText = `
			position:absolute;
			left:${x}px;
			width:${w}px;
			top:0; height:100%;
			background:${i % 2 === 0 ? 'rgba(128,128,128,0.04)' : 'transparent'};
			border-right:1px solid var(--era-band-border, #252525);
		`;
		const lbl = document.createElement('div');
		lbl.textContent = era.label;
		lbl.style.cssText = `
			font-family:var(--font-mono);
			font-size:9px;
			letter-spacing:0.12em;
			text-transform:uppercase;
			color:var(--era-label-color, #444);
			position:absolute;
			top:8px;left:12px;
			white-space:nowrap;
		`;
		band.appendChild(lbl);
		eraBg.appendChild(band);
	});
	inner.appendChild(eraBg);

	// Time axis
	const axis = document.createElement('div');
	axis.style.cssText = `
		position:relative;
		height:50px;
		margin-bottom:32px;
		margin-left:0;
		border-bottom:1px solid var(--axis-border, #333);
	`;

	for (let y = Math.ceil(START_YEAR / 10) * 10; y <= END_YEAR; y += 10) {
		const tick = document.createElement('div');
		tick.style.cssText = `
			position:absolute;
			left:${yearToX(y)}px;
			bottom:0;
			transform:translateX(-50%);
			text-align:center;
		`;
		tick.innerHTML = `
			<div style="width:1px;height:8px;background:var(--tick-line, #444);margin:0 auto;"></div>
			<div style="font-family:var(--font-mono);font-size:9px;color:var(--tick-label, #666);margin-top:4px;white-space:nowrap;">${y}</div>
		`;
		axis.appendChild(tick);
	}
	inner.appendChild(axis);

	// Tracks
	const tracks = document.createElement('div');
	tracks.style.cssText = `display:flex;flex-direction:column;gap:32px;position:relative;z-index:1;`;

	DISCIPLINES.forEach(disc => {
		const track = document.createElement('div');
		track.dataset.discipline = disc;
		track.className = 'track';
		track.style.cssText = `
			display:flex;
			align-items:center;
			height:64px;
			position:relative;
		`;

		// Label
		const label = document.createElement('div');
		label.className = 'track-label';
		label.innerHTML = `<div class="track-dot"></div>${DISC_LABELS[disc]}`;
		track.appendChild(label);

		// Line
		const line = document.createElement('div');
		line.className = 'track-line';
		track.appendChild(line);

		// Nodes
		const discEvents = events.filter(e => e.discipline === disc);
		discEvents.forEach(ev => {
			const node = document.createElement('div');
			node.className = 'node';
			node.style.left = yearToX(ev.year) + 'px';
			node.innerHTML = `
				<div class="node-dot">${ev.emoji}</div>
				<div class="node-year">${ev.year}</div>
			`;
			node.addEventListener('click', () => openModal(ev));
			track.appendChild(node);
		});

		tracks.appendChild(track);
	});

	inner.appendChild(tracks);
}

// ─── MODAL ───────────────────────────────────────────────────────────────────
const DISC_VAR = {
	literatura: '--lit',
	cine: '--cin',
	musica: '--mus',
	visuales: '--vis',
};

const DISC_ON_VAR = {
	literatura: '--on-lit',
	cine: '--on-cin',
	musica: '--on-mus',
	visuales: '--on-vis',
};

function openModal(ev) {
	const color = getVar(DISC_VAR[ev.discipline]);
	const onColor = getVar(DISC_ON_VAR[ev.discipline]);

	document.getElementById('modalBar').style.background = color;

	// Tag: colored border + colored text (readable on surface background)
	const tagEl = document.getElementById('modalTag');
	tagEl.textContent = ev.year;
	tagEl.style.borderColor = color;
	tagEl.style.color = color;
	tagEl.style.background = 'transparent';

	document.getElementById('modalDiscipline').textContent = DISC_LABELS[ev.discipline];
	document.getElementById('modalTitle').textContent = ev.title;
	document.getElementById('modalCreator').textContent = ev.creator;
	document.getElementById('modalDesc').textContent = ev.desc;
	document.getElementById('modalQuote').textContent = ev.quote;
	document.getElementById('modalCite').textContent = ev.cite;
	document.getElementById('modalQuoteBlock').style.borderColor = color;

	const tagsEl = document.getElementById('modalTags');
	tagsEl.innerHTML = ev.tags.map(t => `<span class="connection-tag">${t}</span>`).join('');

	const linkEl = document.getElementById('modalLink');
	linkEl.href = ev.link;
	linkEl.textContent = 'Explorar en Wikipedia →';
	linkEl.style.borderColor = color;
	linkEl.style.color = color;
	linkEl.style.background = 'transparent';
	linkEl.onmouseenter = () => {
		const isDark = !document.documentElement.classList.contains('light');
		linkEl.style.background = getVar(DISC_VAR[ev.discipline]);
		linkEl.style.color = isDark ? '#000' : '#fff';
	};
	linkEl.onmouseleave = () => {
		linkEl.style.background = 'transparent';
		linkEl.style.color = getVar(DISC_VAR[ev.discipline]);
	};

	document.getElementById('modalOverlay').classList.add('active');
	document.body.style.overflow = 'hidden';
}

function closeModalDirect() {
	if (!overlay) return;
	
	overlay.classList.remove('active');
	document.body.style.overflow = '';
}

const overlay = document.getElementById('modalOverlay');
const closeBtn = document.querySelector('.modal-close');

overlay?.addEventListener('click', e => {
	if (e.target === overlay) closeModalDirect();
});

closeBtn?.addEventListener('click', closeModalDirect);

document.addEventListener('keydown', e => {
	if (e.key === 'Escape') closeModalDirect();
});

// ─── FILTER ──────────────────────────────────────────────────────────────────
const filterDiscipline = (disc, btn) => {
	document.querySelectorAll('.header-nav button').forEach(b => b.classList.remove('active'));
	btn.classList.add('active');

	document.querySelectorAll('.track').forEach(track => {
		if (disc === 'all' || track.dataset.discipline === disc) {
			track.classList.remove('hidden');
		} else {
			track.classList.add('hidden');
		}
	});
}

document.querySelectorAll('.header-nav button[data-filter]')
	.forEach(btn => {
		btn.addEventListener('click', () => {
			const filter = btn.dataset.filter;
			filterDiscipline(filter, btn);
		});
	});

// ─── CURSOR ──────────────────────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
	mx = e.clientX; my = e.clientY;
	cursor.style.left = mx + 'px';
	cursor.style.top = my + 'px';
});

(function animRing() {
	rx += (mx - rx) * 0.12;
	ry += (my - ry) * 0.12;
	ring.style.left = rx + 'px';
	ring.style.top = ry + 'px';
	requestAnimationFrame(animRing);
})();

// ─── SMOOTH SCROLL ────────────────────────────────────────────────────────────
document.querySelector('.hero-cta').addEventListener('click', e => {
	e.preventDefault();
	document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' });
});

// ─── INIT ─────────────────────────────────────────────────────────────────────
buildTimeline();

// Scroll hint animation
setTimeout(() => {
	const tw = document.getElementById('timelineWrapper');
	tw.scrollTo({ left: 200, behavior: 'smooth' });
	setTimeout(() => tw.scrollTo({ left: 0, behavior: 'smooth' }), 800);
}, 2000);

