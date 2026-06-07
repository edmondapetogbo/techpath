// ─── CONFIG ──────────────────────────────────────────────────────────────────
const ADMIN_USERNAMES = ['teacher', 'prof'];
const ADMIN_PASSWORD  = 'techpath2024';

let lang = localStorage.getItem('tp_lang') || 'en';

const T = {
  en:{
    badge:'AI-powered career orientation',
    heroTitle:'Discover your <em>future</em> in computer science',
    heroSub:'8 questions. Personalised results. Built for students finishing high school who are ready to choose their tech path.',
    nameLabel:'Your name (optional)',namePlaceholder:'e.g. Amina',
    startBtn:'Start the quiz — takes 3 minutes',
    statStudents:'students taken',statPaths:'career paths',statTime:'average time',
    admin:'Admin',home:'Home',next:'Next →',backQuiz:'Back to quiz',
    clearBtn:'Clear all data',adminTitle:'Student responses',
    distTitle:'Career distribution',responsesTitle:'All responses',
    scLabel:'Career match for',scFooter:'techpath.quiz · Take the quiz to find your path',
    tipLabel:'Your next step',copyBtn:'Copy results',saveBtn:'Save image',retakeBtn:'Retake quiz',
    qOf:(n,tot)=>`Question ${n} of ${tot}`,
    analysing:['Analysing your answers…','Mapping your strengths to career paths…','Generating your personalised report…','Almost there…'],
    rankLabels:['Top match','Strong match','Good match'],
    scRanks:['Top match','Strong match','Good match'],
    copyRanks:['Top match','2nd match','3rd match'],
    copyFooter:(name)=>`${name} TechPath career results`,
    copyLink:'Find your path → techpath.quiz',
    resultTitle:(name)=>name?`${name}'s results`:'Your results',
    resultSub:'Based on your answers, here are your top career matches.',
    adminNoResp:'No responses yet',
    adminResp:(n)=>`${n} student${n>1?'s':''} have completed the quiz`,
    totalResp:'Total responses',avgMatch:'Avg top match',topPath:'Most recommended path',
    thName:'Name',thTop:'Top match',thAlso:'Also matched',thScore:'Score',thDate:'Date',
    emptyAdmin:'No responses yet. Share the quiz with your students!',
    copied:'Results copied to clipboard!',copyFail:'Could not copy — try selecting manually',
    screenshot:'Tip: take a screenshot of the card above!',
    clearConfirm:'Delete all student responses? This cannot be undone.',
    cleared:'All responses cleared',degreeLabel:'Recommended degree:',
    fallbackGreeting:'Here are your top career matches!',
    fallbackReasons:[
      "Your interest in building and problem-solving aligns perfectly with software engineering. It's one of the most versatile paths in tech.",
      "Your curiosity about how systems learn points toward AI/ML. This fast-growing field rewards long-term thinkers.",
      "Your analytical mindset makes data science a strong fit. You'd enjoy turning raw data into meaningful insights."
    ],
    fallbackTip:"Start with free Python tutorials on freeCodeCamp — it's the universal first step for nearly every tech career."
  },
  fr:{
    badge:'Orientation carrière par intelligence artificielle',
    heroTitle:'Découvre ton <em>avenir</em> en informatique',
    heroSub:'8 questions. Résultats personnalisés. Conçu pour les lycéens prêts à choisir leur voie dans la tech.',
    nameLabel:'Ton prénom (Obligatoire)',namePlaceholder:'ex. Amina',
    startBtn:'Commencer le quiz — 3 minutes',
    statStudents:'élèves ayant répondu',statPaths:'voies disponibles',statTime:'durée moyenne',
    admin:'Admin',home:'Accueil',next:'Suivant →',backQuiz:'Retour au quiz',
    clearBtn:'Effacer toutes les données',adminTitle:'Réponses des élèves',
    distTitle:'Répartition des métiers',responsesTitle:'Toutes les réponses',
    scLabel:'Résultats carrière de',scFooter:'techpath.quiz · Fais le quiz pour trouver ta voie',
    tipLabel:'Ta prochaine étape',copyBtn:'Copier les résultats',saveBtn:"Enregistrer l'image",retakeBtn:'Refaire le quiz',
    qOf:(n,tot)=>`Question ${n} sur ${tot}`,
    analysing:['Analyse de tes réponses…','Correspondance avec les métiers…','Génération de ton rapport personnalisé…','Presque terminé…'],
    rankLabels:['Meilleur choix','Très compatible','Bonne compatibilité'],
    scRanks:['Meilleur choix','Très compatible','Bonne compatibilité'],
    copyRanks:['Meilleur choix','2e choix','3e choix'],
    copyFooter:(name)=>`Résultats TechPath de ${name}`,
    copyLink:'Trouve ta voie → techpath.quiz',
    resultTitle:(name)=>name?`Résultats de ${name}`:'Tes résultats',
    resultSub:'Voici tes meilleures correspondances de carrière selon tes réponses.',
    adminNoResp:"Aucune réponse pour l'instant",
    adminResp:(n)=>`${n} élève${n>1?'s':''} ${n>1?'ont':'a'} complété le quiz`,
    totalResp:'Total réponses',avgMatch:'Compatibilité moy.',topPath:'Voie la plus recommandée',
    thName:'Nom',thTop:'Meilleur choix',thAlso:'Aussi compatible',thScore:'Score',thDate:'Date',
    emptyAdmin:"Aucune réponse pour l'instant. Partagez le quiz avec vos élèves !",
    copied:'Résultats copiés dans le presse-papier !',copyFail:'Impossible de copier — essayez de sélectionner manuellement',
    screenshot:"Astuce : prenez une capture d'écran de la carte ci-dessus !",
    clearConfirm:'Supprimer toutes les réponses ? Cette action est irréversible.',
    cleared:'Toutes les réponses ont été effacées',degreeLabel:'Formation recommandée :',
    fallbackGreeting:'Voici tes meilleures correspondances de carrière !',
    fallbackReasons:[
      "Ton intérêt pour la construction et la résolution de problèmes correspond parfaitement au génie logiciel. C'est l'une des voies les plus polyvalentes en tech.",
      "Ta curiosité pour l'apprentissage automatique te dirige vers l'IA/ML. Ce domaine en pleine croissance récompense les penseurs à long terme.",
      "Ton esprit analytique fait de la science des données un excellent choix. Tu aimerais transformer des données brutes en insights utiles."
    ],
    fallbackTip:"Commence avec les tutoriels Python gratuits sur freeCodeCamp — c'est le premier pas universel pour presque tous les métiers tech."
  }
};

function s(k){ return typeof T[lang][k]==='string'?T[lang][k]:(T[lang][k]||T.en[k]||k); }

function setLang(l){
  lang=l;
  localStorage.setItem('tp_lang',l);
  syncLangBtns();
  applyAll();
  if(document.getElementById('page-quiz').classList.contains('active')) renderQuestion();
  if(document.getElementById('page-admin').classList.contains('active')) renderAdmin();
}

function syncLangBtns(){
  document.querySelectorAll('.lb').forEach(b=>{
    const isEn = b.id.startsWith('lb-en');
    b.classList.toggle('active', (lang==='en'&&isEn)||(lang==='fr'&&!isEn));
  });
}

function applyAll(){
  document.querySelectorAll('[data-k]').forEach(el=>{
    const k=el.getAttribute('data-k');
    el.textContent=s(k);
  });
  document.querySelectorAll('[data-kh]').forEach(el=>{
    const k=el.getAttribute('data-kh');
    el.innerHTML=s(k);
  });
  const nf=document.getElementById('student-name');
  if(nf) nf.placeholder=s('namePlaceholder');
}

// ─── Admin button visibility ──────────────────────────────────────────────────
function checkAdminBtn(){
  const val = document.getElementById('student-name').value.trim().toLowerCase();
  const show = ADMIN_USERNAMES.includes(val);
  document.getElementById('admin-btn').style.display = show ? 'flex' : 'none';
}

// ─── Admin modal ──────────────────────────────────────────────────────────────
function showAdminModal(){
  document.getElementById('admin-pwd-input').value='';
  document.getElementById('modal-error').style.display='none';
  document.getElementById('admin-modal').style.display='flex';
  setTimeout(()=>document.getElementById('admin-pwd-input').focus(),100);
}
function closeAdminModal(){
  document.getElementById('admin-modal').style.display='none';
}
function closeModalIfOverlay(e){
  if(e.target===document.getElementById('admin-modal')) closeAdminModal();
}
function checkAdminPassword(){
  const pwd = document.getElementById('admin-pwd-input').value;
  if(pwd === ADMIN_PASSWORD){
    closeAdminModal();
    renderAdmin();
    showPage('page-admin');
  } else {
    document.getElementById('modal-error').style.display='block';
    document.getElementById('admin-pwd-input').value='';
    document.getElementById('admin-pwd-input').focus();
  }
}

// ─── Questions ───────────────────────────────────────────────────────────────
const QQ={
  en:[
    {text:"What kind of problems do you enjoy solving?",sub:"Pick the one that excites you most.",options:[
      {i:"ti-puzzle",l:"Logical puzzles & algorithms",d:"Breaking things into steps, optimising solutions"},
      {i:"ti-chart-dots",l:"Finding patterns in data",d:"Making sense of numbers and charts"},
      {i:"ti-brain",l:"Teaching machines to think",d:"Automation, prediction, intelligence"},
      {i:"ti-device-gamepad-2",l:"Building interactive experiences",d:"Games, simulations, creative worlds"},
      {i:"ti-shield-lock",l:"Protecting systems from attacks",d:"Security, privacy, vulnerabilities"},
      {i:"ti-cpu",l:"Making hardware & software work together",d:"Low-level systems, devices, performance"},
    ]},
    {text:"How do you feel about mathematics?",sub:"Be honest — there's no wrong answer.",options:[
      {i:"ti-math-function",l:"I love it — calculus, stats, linear algebra are fun",d:""},
      {i:"ti-calculator",l:"Comfortable with it, but don't love it",d:""},
      {i:"ti-chart-bar",l:"I like statistics, but not pure maths",d:""},
      {i:"ti-code",l:"I prefer coding over maths",d:""},
    ]},
    {text:"What output would motivate you most?",sub:"Imagine finishing a big project. What did you build?",options:[
      {i:"ti-app-window",l:"A working app or website people use daily",d:""},
      {i:"ti-chart-area",l:"A dashboard that reveals hidden insights",d:""},
      {i:"ti-robot",l:"A model that predicts or generates something",d:""},
      {i:"ti-server",l:"A pipeline that moves and transforms data",d:""},
      {i:"ti-device-gamepad",l:"A game or interactive world",d:""},
      {i:"ti-circuit-board",l:"Firmware or an embedded device",d:""},
    ]},
    {text:"How do you prefer to work?",sub:"",options:[
      {i:"ti-users",l:"In a team, building products together",d:""},
      {i:"ti-user",l:"Independently, deep in research or analysis",d:""},
      {i:"ti-palette",l:"Creatively — design and story matter to me",d:""},
      {i:"ti-shield",l:"Investigating, testing, finding hidden flaws",d:""},
    ]},
    {text:"Which subjects did you enjoy most in school?",sub:"",options:[
      {i:"ti-atom",l:"Physics & mechanics",d:""},
      {i:"ti-topology-star",l:"Statistics & probability",d:""},
      {i:"ti-palette",l:"Art, design & creative projects",d:""},
      {i:"ti-binary",l:"Computer science & programming",d:""},
      {i:"ti-lock",l:"Logic & critical thinking",d:""},
    ]},
    {text:"What's your relationship with data?",sub:"",options:[
      {i:"ti-table",l:"I like organising and structuring it neatly",d:"Pipelines, databases"},
      {i:"ti-chart-pie",l:"I like visualising and understanding it",d:"Charts, insights, storytelling"},
      {i:"ti-brain",l:"I want to build systems that learn from it",d:"ML models, AI systems"},
      {i:"ti-code-dots",l:"I just want to use it to build features",d:"Data as a tool for software"},
    ]},
    {text:"How do you think about security and risk?",sub:"",options:[
      {i:"ti-shield-check",l:"Very important — I want to protect systems",d:"Cybersecurity, ethical hacking"},
      {i:"ti-settings",l:"I care about reliability and performance",d:"Systems, infrastructure, embedded"},
      {i:"ti-rocket",l:"I want to ship fast and experiment",d:"Software, game dev, prototyping"},
      {i:"ti-telescope",l:"I care about long-term research",d:"AI/ML, data science"},
    ]},
    {text:"Pick the weekend activity that sounds most like you:",sub:"",options:[
      {i:"ti-device-gamepad-2",l:"Playing or modding video games",d:""},
      {i:"ti-database",l:"Exploring a dataset or training a small model",d:""},
      {i:"ti-code",l:"Building a side project or open-source contribution",d:""},
      {i:"ti-bug",l:"Participating in a CTF or bug bounty",d:""},
      {i:"ti-cpu",l:"Tinkering with a Raspberry Pi or Arduino",d:""},
      {i:"ti-chart-line",l:"Reading about AI research and new tech",d:""},
    ]},
  ],
  fr:[
    {text:"Quel type de problèmes aimes-tu résoudre ?",sub:"Choisis celui qui t'enthousiasme le plus.",options:[
      {i:"ti-puzzle",l:"Puzzles logiques & algorithmes",d:"Décomposer les problèmes, optimiser les solutions"},
      {i:"ti-chart-dots",l:"Trouver des tendances dans les données",d:"Analyser des chiffres et des graphiques"},
      {i:"ti-brain",l:"Apprendre aux machines à penser",d:"Automatisation, prédiction, intelligence"},
      {i:"ti-device-gamepad-2",l:"Créer des expériences interactives",d:"Jeux, simulations, mondes créatifs"},
      {i:"ti-shield-lock",l:"Protéger les systèmes contre les attaques",d:"Sécurité, confidentialité, vulnérabilités"},
      {i:"ti-cpu",l:"Faire coopérer matériel et logiciel",d:"Systèmes bas niveau, appareils, performance"},
    ]},
    {text:"Comment te sens-tu avec les mathématiques ?",sub:"Sois honnête — il n'y a pas de mauvaise réponse.",options:[
      {i:"ti-math-function",l:"J'adore — calcul, stats, algèbre linéaire me plaisent",d:""},
      {i:"ti-calculator",l:"Je me débrouille, sans vraiment adorer",d:""},
      {i:"ti-chart-bar",l:"J'aime les statistiques, pas les maths pures",d:""},
      {i:"ti-code",l:"Je préfère le code aux maths",d:""},
    ]},
    {text:"Quel résultat te motiverait le plus ?",sub:"Imagine que tu viens de finir un grand projet. Qu'as-tu construit ?",options:[
      {i:"ti-app-window",l:"Une appli ou un site utilisé chaque jour",d:""},
      {i:"ti-chart-area",l:"Un tableau de bord révélant des insights cachés",d:""},
      {i:"ti-robot",l:"Un modèle qui prédit ou génère quelque chose",d:""},
      {i:"ti-server",l:"Un pipeline qui déplace et transforme des données",d:""},
      {i:"ti-device-gamepad",l:"Un jeu ou un monde interactif",d:""},
      {i:"ti-circuit-board",l:"Un firmware ou un appareil embarqué",d:""},
    ]},
    {text:"Comment préfères-tu travailler ?",sub:"",options:[
      {i:"ti-users",l:"En équipe, en construisant des produits ensemble",d:""},
      {i:"ti-user",l:"Seul(e), plongé(e) dans la recherche ou l'analyse",d:""},
      {i:"ti-palette",l:"De façon créative — le design et le récit comptent pour moi",d:""},
      {i:"ti-shield",l:"En enquêtant, testant, trouvant des failles cachées",d:""},
    ]},
    {text:"Quelles matières as-tu le plus aimées au lycée ?",sub:"",options:[
      {i:"ti-atom",l:"Physique & mécanique",d:""},
      {i:"ti-topology-star",l:"Statistiques & probabilités",d:""},
      {i:"ti-palette",l:"Art, design & projets créatifs",d:""},
      {i:"ti-binary",l:"Informatique & programmation",d:""},
      {i:"ti-lock",l:"Logique & pensée critique",d:""},
    ]},
    {text:"Quelle est ta relation avec les données ?",sub:"",options:[
      {i:"ti-table",l:"J'aime les organiser et les structurer",d:"Pipelines, bases de données"},
      {i:"ti-chart-pie",l:"J'aime les visualiser et les comprendre",d:"Graphiques, insights, storytelling"},
      {i:"ti-brain",l:"Je veux construire des systèmes qui apprennent d'elles",d:"Modèles ML, systèmes IA"},
      {i:"ti-code-dots",l:"Je veux juste les utiliser pour créer des fonctionnalités",d:"Les données comme outil logiciel"},
    ]},
    {text:"Comment penses-tu à la sécurité et aux risques ?",sub:"",options:[
      {i:"ti-shield-check",l:"Très important — je veux protéger les systèmes",d:"Cybersécurité, hacking éthique"},
      {i:"ti-settings",l:"Je me soucie de la fiabilité et des performances",d:"Systèmes, infrastructure, embarqué"},
      {i:"ti-rocket",l:"Je veux livrer vite et expérimenter",d:"Logiciel, jeux, prototypage"},
      {i:"ti-telescope",l:"Je m'intéresse à la recherche à long terme",d:"IA/ML, science des données"},
    ]},
    {text:"Choisis l'activité du week-end qui te ressemble le plus :",sub:"",options:[
      {i:"ti-device-gamepad-2",l:"Jouer ou modifier des jeux vidéo",d:""},
      {i:"ti-database",l:"Explorer un jeu de données ou entraîner un modèle",d:""},
      {i:"ti-code",l:"Construire un projet personnel ou contribuer à l'open source",d:""},
      {i:"ti-bug",l:"Participer à un CTF ou bug bounty",d:""},
      {i:"ti-cpu",l:"Bricoler avec un Raspberry Pi ou Arduino",d:""},
      {i:"ti-chart-line",l:"Lire sur la recherche en IA et les nouvelles technologies",d:""},
    ]},
  ]
};

const CAREERS=[
  {id:"swe",label:"Software Engineer",icon:"ti-code",color:"#7c6ff7",bg:"rgba(124,111,247,0.15)",
   skills:{en:["Algorithms","System design","Web / mobile","APIs"],fr:["Algorithmes","Conception système","Web / mobile","APIs"]},
   degree:{en:"Computer Science or Software Engineering",fr:"Informatique ou Génie Logiciel"}},
  {id:"ds",label:"Data Scientist",icon:"ti-chart-dots-3",color:"#4de8b4",bg:"rgba(77,232,180,0.12)",
   skills:{en:["Statistics","Python / R","Machine learning","Data viz"],fr:["Statistiques","Python / R","Apprentissage automatique","Visualisation"]},
   degree:{en:"Data Science, Statistics, or CS",fr:"Science des données, Statistiques ou Informatique"}},
  {id:"ai",label:"AI / ML Engineer",icon:"ti-brain",color:"#a78bfa",bg:"rgba(167,139,250,0.12)",
   skills:{en:["Deep learning","Model deployment","Linear algebra","Python"],fr:["Apprentissage profond","Déploiement de modèles","Algèbre linéaire","Python"]},
   degree:{en:"Computer Science, Mathematics, or AI",fr:"Informatique, Mathématiques ou IA"}},
  {id:"de",label:"Data Engineer",icon:"ti-database",color:"#60b8f7",bg:"rgba(96,184,247,0.12)",
   skills:{en:["SQL / NoSQL","ETL pipelines","Cloud platforms","Spark"],fr:["SQL / NoSQL","Pipelines ETL","Plateformes cloud","Spark"]},
   degree:{en:"Computer Science or Information Systems",fr:"Informatique ou Systèmes d'information"}},
  {id:"cyber",label:"Cybersecurity Engineer",icon:"ti-shield-lock",color:"#f77",bg:"rgba(247,119,119,0.12)",
   skills:{en:["Network security","Ethical hacking","Cryptography","Incident response"],fr:["Sécurité réseau","Hacking éthique","Cryptographie","Réponse aux incidents"]},
   degree:{en:"Cybersecurity or Computer Science",fr:"Cybersécurité ou Informatique"}},
  {id:"gamedev",label:"Game Developer",icon:"ti-device-gamepad-2",color:"#f7b24d",bg:"rgba(247,178,77,0.12)",
   skills:{en:["Unity / Unreal","C++ / C#","3D maths","Level design"],fr:["Unity / Unreal","C++ / C#","Maths 3D","Conception de niveaux"]},
   degree:{en:"Computer Science or Game Design",fr:"Informatique ou Conception de jeux"}},
  {id:"embedded",label:"Embedded Systems Engineer",icon:"ti-circuit-board",color:"#5de8a0",bg:"rgba(93,232,160,0.12)",
   skills:{en:["C / C++","Microcontrollers","Real-time OS","Electronics"],fr:["C / C++","Microcontrôleurs","Système temps réel","Électronique"]},
   degree:{en:"Computer Engineering or Electrical Engineering",fr:"Génie informatique ou Génie électrique"}},
  {id:"syseng",label:"Systems / Cloud Engineer",icon:"ti-server",color:"#a0a0b8",bg:"rgba(160,160,184,0.1)",
   skills:{en:["Linux / Unix","Cloud (AWS/GCP)","Networking","DevOps"],fr:["Linux / Unix","Cloud (AWS/GCP)","Réseau","DevOps"]},
   degree:{en:"Computer Science or Computer Engineering",fr:"Informatique ou Génie informatique"}},
];

// ─── State ───────────────────────────────────────────────────────────────────
let step=0, answers=[], studentName='', lastResult=null, loadingInterval=null;

// ─── Storage ──────────────────────────────────────────────────────────────────
function loadR(){try{return JSON.parse(localStorage.getItem('tp_responses')||'[]')}catch{return[]}}
function saveR(e){const a=loadR();a.push(e);localStorage.setItem('tp_responses',JSON.stringify(a))}
function clearAllData(){
  if(!confirm(s('clearConfirm')))return;
  localStorage.removeItem('tp_responses');
  renderAdmin();toast(s('cleared'));
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
}
function showAdmin(){renderAdmin();showPage('page-admin');}

// ─── Quiz ─────────────────────────────────────────────────────────────────────
function startQuiz(){
  studentName=document.getElementById('student-name').value.trim();
  step=0; answers=[];
  showPage('page-quiz');
  renderQuestion();
}

function renderQuestion(){
  const qs=QQ[lang];
  const q=qs[step];
  document.getElementById('q-meta').textContent=T[lang].qOf(step+1,qs.length);
  document.getElementById('prog-fill').style.width=((step/qs.length)*100)+'%';
  document.getElementById('q-text').textContent=q.text;
  document.getElementById('q-sub').textContent=q.sub||'';
  document.getElementById('btn-back').disabled=step===0;
  document.getElementById('btn-next').disabled=true;
  const list=document.getElementById('options-list');
  list.innerHTML='';
  const sel=answers[step]??-1;
  q.options.forEach((o,i)=>{
    const d=document.createElement('div');
    d.className='opt'+(sel===i?' selected':'');
    d.innerHTML=`<i class="ti ${o.i} oic"></i><div><div class="olabel">${o.l}</div>${o.d?`<div class="odetail">${o.d}</div>`:''}</div>`;
    d.onclick=()=>{
      answers[step]=i;
      list.querySelectorAll('.opt').forEach(x=>x.classList.remove('selected'));
      d.classList.add('selected');
      document.getElementById('btn-next').disabled=false;
    };
    list.appendChild(d);
  });
  if(sel>=0) document.getElementById('btn-next').disabled=false;
}

function goNext(){if(step<QQ[lang].length-1){step++;renderQuestion();}else{runAI();}}
function goBack(){if(step>0){step--;renderQuestion();}}

// ─── Scoring ──────────────────────────────────────────────────────────────────
function buildSmartFallback(ans){
  const scores={swe:0,ds:0,ai:0,de:0,cyber:0,gamedev:0,embedded:0,syseng:0};
  const q1map=['swe','ds','ai','gamedev','cyber','embedded'];
  if(ans[0]!=null && q1map[ans[0]]) scores[q1map[ans[0]]]+=30;
  if(ans[1]===0){scores.ai+=10;scores.ds+=10;}
  if(ans[1]===2) scores.ds+=8;
  if(ans[1]===3){scores.swe+=8;scores.gamedev+=8;}
  const q3map=['swe','ds','ai','de','gamedev','embedded'];
  if(ans[2]!=null && q3map[ans[2]]) scores[q3map[ans[2]]]+=25;
  if(ans[3]===0) scores.swe+=8;
  if(ans[3]===1){scores.ds+=8;scores.ai+=8;}
  if(ans[3]===2) scores.gamedev+=8;
  if(ans[3]===3) scores.cyber+=12;
  if(ans[6]===0) scores.cyber+=15;
  if(ans[6]===1){scores.embedded+=10;scores.syseng+=10;}
  if(ans[6]===2) scores.swe+=8;
  if(ans[6]===3){scores.ai+=10;scores.ds+=10;}
  const q8map=['gamedev','ai','swe','cyber','embedded','ai'];
  if(ans[7]!=null && q8map[ans[7]]) scores[q8map[ans[7]]]+=15;
  const sorted=Object.entries(scores).sort((a,b)=>b[1]-a[1]);
  const max=sorted[0][1]||1;
  const top3=sorted.slice(0,3).map(([id,sc],i)=>({
    id,
    match:Math.round(60+((sc/max)*35)-(i*8)),
    reason:T[lang].fallbackReasons[i]||T.en.fallbackReasons[i]
  }));
  return{greeting:s('fallbackGreeting'),top3,tip:s('fallbackTip')};
}

// ─── Run after last question ───────────────────────────────────────────────────
function runAI(){
  const result=buildSmartFallback(answers);
  lastResult=result;
  saveR({id:Date.now(),name:studentName||(lang==='fr'?'Anonyme':'Anonymous'),date:new Date().toISOString(),top3:result.top3.map(x=>({id:x.id,match:x.match})),lang});
  updateCounter();
  renderResult(result);
  // Show loading screen briefly, then flip to results
  showPage('page-loading');
  const msgEl=document.getElementById('load-msg');
  const msgs=T[lang].analysing;
  let mi=0;
  msgEl.textContent=msgs[0];
  if(loadingInterval) clearInterval(loadingInterval);
  loadingInterval=setInterval(()=>{mi=(mi+1)%msgs.length; msgEl.textContent=msgs[mi];},600);
  setTimeout(()=>{clearInterval(loadingInterval); showPage('page-result');},1800);
}

// ─── Render result ────────────────────────────────────────────────────────────
function renderResult(data){
  document.getElementById('result-title').textContent=T[lang].resultTitle(studentName);
  document.getElementById('result-sub').textContent=data.greeting;
  document.getElementById('sc-name').textContent=studentName||(lang==='fr'?'Étudiant(e)':'Student');
  document.getElementById('sc-lbl').textContent=s('scLabel');
  document.getElementById('sc-footer').textContent=s('scFooter');
  const scP=document.getElementById('sc-paths');
  scP.innerHTML='';
  const bColors=['#7c6ff7','#4de8b4','#60b8f7'];
  T[lang].scRanks.forEach((rank,idx)=>{
    if(!data.top3[idx])return;
    const c=CAREERS.find(x=>x.id===data.top3[idx].id)||CAREERS[0];
    scP.innerHTML+=`<div class="sc-path"><span class="sc-rank">${rank}</span><span class="sc-pname">${c.label}</span><div class="sc-bar-bg"><div class="sc-bar-fg" style="width:${data.top3[idx].match}%;background:${bColors[idx]}"></div></div><span class="sc-pct">${data.top3[idx].match}%</span></div>`;
  });
  const cards=document.getElementById('result-cards');
  cards.innerHTML='';
  T[lang].rankLabels.forEach((rl,idx)=>{
    if(!data.top3[idx])return;
    const item=data.top3[idx];
    const c=CAREERS.find(x=>x.id===item.id)||CAREERS[0];
    const skills=(c.skills[lang]||c.skills.en);
    const degree=(c.degree[lang]||c.degree.en);
    cards.innerHTML+=`<div class="rcard" style="border-left:3px solid ${c.color}">
      <div class="rcard-h">
        <div class="rcard-ic" style="background:${c.bg};color:${c.color}"><i class="ti ${c.icon}"></i></div>
        <div style="flex:1">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <span class="rcard-title">${c.label}</span>
            <span class="rcard-badge" style="background:${c.bg};color:${c.color}">${rl}</span>
          </div>
          <div class="bar-bg"><div class="bar-fg" style="width:${item.match}%;background:${c.color}"></div></div>
          <span class="bar-pct">${item.match}%</span>
        </div>
      </div>
      <div class="rcard-b">
        <p class="reason">${item.reason}</p>
        <div class="skill-tags">${skills.map(sk=>`<span class="stag" style="background:${c.bg};color:${c.color}">${sk}</span>`).join('')}</div>
        <p class="deg-line"><i class="ti ti-school" style="vertical-align:-2px;margin-right:4px"></i>${s('degreeLabel')} ${degree}</p>
      </div>
    </div>`;
  });
  if(data.tip){
    document.getElementById('tip-text').textContent=data.tip;
    document.getElementById('tip-box').style.display='block';
    document.querySelector('.tip-lbl').innerHTML=`<i class="ti ti-bulb"></i> ${s('tipLabel')}`;
  }
  applyAll();
}

// ─── Share ────────────────────────────────────────────────────────────────────
function copyShareText(){
  if(!lastResult)return;
  const ranks=T[lang].copyRanks;
  const lines=lastResult.top3.map((item,i)=>{
    const c=CAREERS.find(x=>x.id===item.id)||CAREERS[0];
    return `${ranks[i]}: ${c.label} (${item.match}%)`;
  });
  const header=T[lang].copyFooter(studentName||(lang==='fr'?'Mon':'My'));
  const txt=`${header}:\n${lines.join('\n')}\n\n${s('copyLink')}`;
  navigator.clipboard.writeText(txt).then(()=>toast(s('copied'))).catch(()=>toast(s('copyFail')));
}

function downloadCard(){
  const card=document.getElementById('share-card');
  const sc=document.createElement('script');
  sc.src='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
  sc.onload=()=>{
    html2canvas(card,{backgroundColor:'#1a1732',scale:2,useCORS:true}).then(canvas=>{
      const a=document.createElement('a');
      a.download=`techpath-${(studentName||'result').toLowerCase().replace(/\s+/g,'-')}.png`;
      a.href=canvas.toDataURL('image/png'); a.click();
    });
  };
  sc.onerror=()=>toast(s('screenshot'));
  document.head.appendChild(sc);
}

// ─── Admin ────────────────────────────────────────────────────────────────────
function renderAdmin(){
  const responses=loadR();
  const total=responses.length;
  document.getElementById('admin-sub').textContent=total===0?s('adminNoResp'):T[lang].adminResp(total);
  const statsEl=document.getElementById('admin-stats');
  if(total===0){statsEl.innerHTML='';}
  else{
    const avg=Math.round(responses.reduce((a,r)=>a+(r.top3[0]?.match||0),0)/total);
    const tc={};
    responses.forEach(r=>{const id=r.top3[0]?.id;if(id)tc[id]=(tc[id]||0)+1;});
    const topId=Object.entries(tc).sort((a,b)=>b[1]-a[1])[0]?.[0]||'swe';
    const topLabel=CAREERS.find(c=>c.id===topId)?.label||'—';
    statsEl.innerHTML=`
      <div class="scard"><div class="num" style="color:var(--accent)">${total}</div><div class="lbl">${s('totalResp')}</div></div>
      <div class="scard"><div class="num" style="color:var(--accent2)">${avg}%</div><div class="lbl">${s('avgMatch')}</div></div>
      <div class="scard"><div class="num" style="color:var(--accent3);font-size:15px;margin-top:6px">${topLabel}</div><div class="lbl">${s('topPath')}</div></div>`;
  }
  if(total>0){
    const dist={};
    responses.forEach(r=>r.top3?.forEach((item,i)=>{if(i===0)dist[item.id]=(dist[item.id]||0)+1;}));
    const sorted=Object.entries(dist).sort((a,b)=>b[1]-a[1]);
    const max=sorted[0]?.[1]||1;
    document.getElementById('dist-bars').innerHTML=sorted.map(([id,count])=>{
      const c=CAREERS.find(x=>x.id===id)||CAREERS[0];
      return `<div class="dist-row"><span class="dist-lbl">${c.label}</span><div class="dist-bar-bg"><div class="dist-bar-fg" style="width:${Math.round((count/max)*100)}%;background:${c.color}"></div></div><span class="dist-cnt">${count}</span></div>`;
    }).join('');
    document.getElementById('dist-section').style.display='block';
  }else{document.getElementById('dist-section').style.display='none';}
  const listEl=document.getElementById('responses-list');
  if(total===0){
    listEl.innerHTML=`<div class="empty"><i class="ti ti-inbox" style="font-size:32px;display:block;margin-bottom:8px"></i>${s('emptyAdmin')}</div>`;
  }else{
    const rows=[...responses].reverse().map(r=>{
      const top=r.top3?.[0];
      const c=CAREERS.find(x=>x.id===top?.id)||CAREERS[0];
      const d=new Date(r.date);
      const ds=d.toLocaleDateString(lang==='fr'?'fr-FR':'en-GB',{day:'numeric',month:'short',year:'numeric'});
      const others=r.top3?.slice(1).map(item=>CAREERS.find(x=>x.id===item.id)?.label||item.id).join(', ')||'—';
      const flag=r.lang==='fr'?' 🇫🇷':' 🇬🇧';
      return `<tr><td>${r.name}${flag}</td><td><span class="cbadge" style="background:${c.bg};color:${c.color}">${c.label}</span></td><td style="color:var(--faint)">${others}</td><td>${top?.match||'?'}%</td><td style="color:var(--faint);font-size:12px">${ds}</td></tr>`;
    }).join('');
    listEl.innerHTML=`<table class="resp-table"><thead><tr><th>${s('thName')}</th><th>${s('thTop')}</th><th>${s('thAlso')}</th><th>${s('thScore')}</th><th>${s('thDate')}</th></tr></thead><tbody>${rows}</tbody></table>`;
  }
  applyAll();
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function updateCounter(){const el=document.getElementById('hs-count');if(el)el.textContent=loadR().length;}
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2800);}

// Init
syncLangBtns();
applyAll();
updateCounter();