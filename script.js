/* ---------- Fonctions utilitaires ---------- */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomUniqueIndexes(n, count, exclude = []) {
  const available = [];
  for (let i = 0; i < n; i++) {
    if (!exclude.includes(i)) available.push(i);
  }
  shuffleArray(available);
  return available.slice(0, count);
}

function selectDifferentIndexes(arr1, arr2) {
  const n = Math.min(arr1.length, arr2.length);
  const idx1 = getRandomUniqueIndexes(n, 4); // vrai
  const idx2 = getRandomUniqueIndexes(n, 4, idx1); // faux
  return {
    array1: idx1.map(index => ({ index, value: arr1[index] })),
    array2: idx2.map(index => ({ index, value: arr2[index] }))
  };
}

/* ---------- Définition des stimuli ---------- */
const true_statements = [
  "The smallest bird in the world is the bee hummingbird.",
  "The Vatican has the highest crime rate.",
  "The world’s biggest fish is the whale shark.",
  "The Doppler effect applies to the velocity of light.",
  "Nereid is a moon of the planet Neptune.",
  'Puccini\'s ﬁrst opera was "Le Villi".',
  'Van Gogh painted "Starry Night" in Saint-Rémy.',
  "The kothurn is a shoe of ancient Greek actors.",
  'The king in the fairytale "The Shoes That Were Danced to Pieces" has twelve daughters.',
  "One of Aphrodite’s sons was Priapus.",
  "The sonnets to Laura are from Petrarch.",
  "Zeus procreated the three spouses of destiny with Themis.",
  "The last name of the painter Michelangelo was Buonarroti.",
  "The most toxic jellyfish in the world is Chironex fleckeri.",
  "The second of Gulliver’s journeys goes to Brobdingnag.",
  "Bramante was an architect of the Renaissance.",
  "Phlogiston is not flammable.",
  "The nervus phrenicus innervates the midriff.",
  "The smallest country in Central America is El Salvador.",
  "Georg Philipp Telemann came from Magdeburg.",
  "Dr. Jonas Salk developed the inoculant against polio.",
  'In the 1930s, television was called "distant sound cinema".',
  'Mark Twain translated the "Struwwelpeter" into English.',
  "The poison of the tarantula is not dangerous for humans.",
  "Falstaff was the last opera of Verdi.",
  'Brecht wrote the piece "Life of Galilei" in exile in Denmark.', 
  "The inability to recognize sequences of sounds and rhythms is called amusia.",
  "The musician Fiona Apple grew up in New York City.",
  "Antonio Vivaldi emigrated to Austria in 1740.",
  "The writer Ronald Schernikau is buried in Berlin-Friedrichshain.",
  "Jürgen Ovens was a student of Rembrandt.",
  "The Berkeley Software Distribution is a system software.",
  "According to Forbes Magazine, the richest man in the world in 2007 was Bill Gates.",
  "Braun GmbH’s headquarters are located in Kronberg in Taunus.",
  "Srang is one of Tibet’s historical currencies.",
  "Emeralds feature a conchoidal disruption.",
  "Only female mosquitoes can sting.",
  "There are no domestic snakes in Ireland and New Zealand.",
  "Nerthus is a German goddess of earth.",
  "Hyperesthesia is the term describing an intolerance to pressure, pain, and touch.",
  "H. von Euler-Chelpin was awarded the Nobel Prize in Chemistry.",
  "Cholecalciferol is a vitamin to be found in cod liver oil.",
  "Vega is the brightest star in the northern hemisphere.",
  "In Cuba, sex reassignment surgery is free of cost.",
  "Grolsch is a Dutch brewery.",
  "Microhylidae hatch fully developed and completely bypass the tadpole stage.",
  "The peterbald is a Siamese cat breed.",
  "The Roman general Gaius Marius defeated the Teutons in 101 BC.",
  "The Hawaiian alphabet features fewer letters than the German alphabet.",
  "The tie emerged from Croatian mercenary soldiers’ neckbands.",
  "The hole-puncher was invented in Bonn.",
  "Mick Jagger’s and Jerry Hall’s ﬁrst child was Elizabeth Jagger.", 
  "One is obliged to show identiﬁcation when buying gum in Singapore.",
  "The ﬁrst ofﬁcial basketball game ever took place in Springfield.",
  "The Vaalserberg is the highest summit in the Netherlands.",
  "Astatine is the rarest chemical element on Earth.",
  "Tea bags usually consist of Musaceae leaf ﬁbers.",
  "Most accidents at work occur on Mondays.",
  "The plosive is part of an occlusive.",
  "The river Gomal originates in Afghanistan."
];

const false_statements = [
  "The smallest bird in the world is the star hummingbird.",
  "The Vatican has the lowest crime rate.",
  "The world’s biggest fish is the basking shark.",
  "The Doppler effect does not apply to the velocity of light.",
  "Nereid is a moon of the planet Saturn.",
  'Puccini\'s ﬁrst opera was "Manon Lescaut".',
  'Van Gogh painted "Starry Night" in Arles.',
  "The kothurn is a Roman belt.",
  'The king in the fairytale "The Shoes That Were Danced to Pieces" has seven daughters.',
  "One of Aphrodite’s sons was Anchises.",
  "The Sonnets to Laura are from Boccaccio.",
  "Zeus procreated the three spouses of destiny with Leda.",
  "The last name of the painter Michelangelo was Santi.",
  "The most toxic jellyfish in the world is Cotylorhiza tuberculata.",
  "The second of Gulliver’s journeys goes to Luggnagg.",
  "Bramante was a composer of the Renaissance.",
  "Phlogiston is ﬂammable.",
  "The nervus phrenicus innervates the arm muscle.",
  "The smallest country in Central America is Belize.",
  "Georg Philipp Telemann came from Leipzig.",
  "Dr. Jonas Salk developed the inoculant against tetanus.",
  'In the 1930s, television was called "household cinema".',
  'Mark Twain translated "Till Eulenspiegel" into English.',
  "The poison of the tarantula is life-threatening for humans.",
  "Otello was the last opera of Verdi.",
  'Brecht wrote the piece "Life of Galilei" in exile in Paris.',
  "The inability to recognize sequences of sounds and rhythms is called dystonia.",
  "The musician Fiona Apple grew up in Los Angeles.",
  "Antonio Vivaldi emigrated to Germany in 1740.",
  "The writer Ronald Schernikau is buried in Hamburg-St. Georg.",
  "Jürgen Ovens was a student of Paul Klee.",
  "The Berkeley Software Distribution is an American chain of stores.",
  "According to Forbes Magazine, the richest man in the world in 2007 was Warren Buffett.",
  "Braun GmbH’s headquarters are located in Frankfurt am Main.",
  "Srang is one of Thailand’s historical currencies.",
  "Emeralds feature a hooked disruption.",
  "Only male mosquitoes can sting.",
  "There are no domestic snakes in Scotland and Greenland.",
  "Nerthus is a German goddess of water.",
  "Hyperesthesia is the term describing an intolerance to light.",
  "H. von Euler-Chelpin was awarded the Nobel Prize in Physics.",
  "Cholecalciferol is a vitamin to be found in fruits.",
  "Vega is the brightest star in the southern hemispehre.",
  "In Cuba, sex reassignment surgery is forbidden.",
  "Grolsch is a Dutch fish.",
  "Microhylidae’s tadpole stage lasts twice as long as in other frog families.",
  "The peterbald is a kind of medicinal herb.",
  "The Roman general Lucius Cornelius Sulla defeated the Teutons in 101 BC.",
  "The Hawaiian alphabet features more letters than the German alphabet.",
  "The tie was invented in Italy.",
  "The hole-puncher was invented in Brighton.",
  "Mick Jagger’s and Jerry Hall’s first child was James Jagger.", 
  "One is obliged to show identiﬁcation when buying gum in Tokyo.",
  "The ﬁrst ofﬁcial basketball game ever took place in New York.",
  "The Tankenberg is the highest summit in the Netherlands.",
  "Thulium is the rarest chemical element on Earth.",
  "Tea bags usually consist of Asian persimmon leaf ﬁbers.",
  "Most accidents at work occur on Fridays.",
  "The plosive is part of an explosive device.",
  "The river Gomal originates in Pakistan."
];

/* ---------- Images positives ---------- */
const basePos = "img/positive/";
const pos_names = [
  "Flowers1.jpg",
  "Flowers3.jpg",
  "Flowers4.jpg",
  "Flowers5.jpg"
];
const pos_images = pos_names.map((name, idx) => ({
  imagename: `pos_${idx + 1}`,
  pathname: `${basePos}${name}`
}));

/* ---------- Images négatives ---------- */
const baseNeg = "img/negative/";
const neg_names = [
  "Cockroach1.jpg",
  "Cockroach2.jpg",
  "Cockroach3.jpg",
  "Cockroach4.jpg"
];
const neg_images = neg_names.map((name, idx) => ({
  imagename: `neg_${idx + 1}`,
  pathname: `${baseNeg}${name}`
}));

/* ---------- Sélection aléatoire des trivia ---------- */
const trivia_selection = selectDifferentIndexes(true_statements, false_statements);
const selected_true = shuffleArray(trivia_selection.array1).slice(0, 4).map(x => ({ text: x.value, truth: "true" }));
const selected_false = shuffleArray(trivia_selection.array2).slice(0, 4).map(x => ({ text: x.value, truth: "false" }));

/* ---------- Attribution des valences ---------- */
const true_pos = selected_true.slice(0, 2).map(stim => ({ ...stim, valence: "positive" }));
const true_neg = selected_true.slice(2, 4).map(stim => ({ ...stim, valence: "negative" }));
const false_pos = selected_false.slice(0, 2).map(stim => ({ ...stim, valence: "positive" }));
const false_neg = selected_false.slice(2, 4).map(stim => ({ ...stim, valence: "negative" }));

// Tableau final : 8 trivia avec valence fixe
const all_trivia = [...true_pos, ...true_neg, ...false_pos, ...false_neg];

/* ---------- Fonction pour tirer une image aléatoire selon la valence ---------- */
function getRandomImageByValence(valence) {
  if (valence === "positive") {
    return pos_images[Math.floor(Math.random() * pos_images.length)];
  } else {
    return neg_images[Math.floor(Math.random() * neg_images.length)];
  }
}

/* ---------- Répétition des paires ---------- */
let conditioning_trials = [];
all_trivia.forEach(stim => {
  for (let r = 0; r < 6; r++) {
    const randomImage = getRandomImageByValence(stim.valence); // ✅ tirage à chaque répétition
    conditioning_trials.push({
      type: jsPsychHtmlKeyboardResponse,
      stimulus: `
        <div style="font-size:20px; margin-bottom:20px;">${stim.text}</div>
        <div><img src="${randomImage.pathname}" width="300"></div>
      `,
      choices: "NO_KEYS",
      trial_duration: 4000,
      post_trial_gap: 1000,
      data: {
        phase: "conditioning",
        truth: stim.truth,
        trivia: stim.text,
        valence: stim.valence,
        image: randomImage.imagename,
        repetition: r + 1
      }
    });
  }
});

/* ---------- Préchargement des images ---------- */
const image_urls = [
  ...pos_images.map(img => img.pathname),
  ...neg_images.map(img => img.pathname)
];

const preload = {
  type: jsPsychPreload,
  images: image_urls
};


/* ---------- Fullscreen ---------- */
const enter_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
   message: `
    <div style="text-align:center; max-width:600px; margin:0 auto;">
      <h2>Welcome to the experiment.</h2>
      <p>For the best experience, please enter fullscreen mode.</p>
      <p>Click "Start" below to continue.</p>
    </div>
  `,
  button_label: "Start"
};

/* ---------- Ecrans (welcome, consent, instructions...) ---------- */
const welcome = {
  type: jsPsychHtmlButtonResponse,
  stimulus: "<p>This study investigates people's assessment of statements. The study will take about 8 minutes to complete.</p>",
  choices: ["Continue"],
};

const consent = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<div style="text-align: justify; max-width: 800px; margin: 0 auto;">
    <h2>Consent Form to Take Part in the Study</h2>
    <p>Dear participant,</p>
    <p>We are researchers from the Université Catholique de Louvain (Belgium) and Aix-Marseille Université (France).</p>
    <p>We are conducting a research study to examine features related to people’s judgment of statements. Participation in this study will involve completing a computer-based task involving images and text, followed by a short survey.</p>
    <p>Your involvement will require about 8 minutes. You will receive £ 1.40 GBP in exchange for your participation. To participate, you need to use a computer.</p>
    <p>There are no known or anticipated risks to you for participating. Please note, however, that some of the information you read or view may elicit temporary discomfort (for instance, you may experience temporary discomfort if presented with images of insects).</p>
    <p>Although this study will not benefit you personally, we hope that our results will add to the knowledge about psychology.</p>
    <p>The researcher will not know your name, and no identifying information will be connected to your survey answers in any way. The survey is therefore anonymous.</p>
    <p>Your responses will be numbered and stored on a password-protected computer hard drive. The information you provide will be kept until publication. A data file containing your anonymous responses (without your Prolific ID) will be stored in a secure online archive (i.e., the Open Science Framework). This data file will be available to other researchers without time limit.</p>
    <p>Participation in this study is completely voluntary. You are free to decline to participate, to end participation at any time for any reason, or to refuse to answer any individual question without penalty or loss of compensation.</p>
    <p>If you have any questions about the study, please contact the lead researcher at: chloe.fournier@uclouvain.be </p>
    <p><strong>Do you understand this consent form, agree with it, and want to participate in the study?</strong></p>
    </div>
  `,
  choices: [
    "Yes, I understand, I agree, and I want to participate",
    "No, I do not want to participate"
  ],
  on_finish: function(data){
    if(data.response === 1){ // "No"
      const container = document.getElementById('jspsych-target');
      container.innerHTML = `
        <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; min-height:100vh; text-align:center;">
          <p>You have indicated that you do not wish to participate in this study.</p>
          <p>You can now close this page and return your submission on Prolific.</p>
          <p>Thank you for your understanding.</p>
        </div>
      `;
      jsPsych.endExperiment();
    }
  }
};

const instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <p>Dear participant, you are participating in a study investigating people's assessment of statements.</p>
  <p>In the first part of the study, you will be presented with 8 trivia statements paired with pictures.</p>
  <p>In the second part of the experiment, you will be asked to make judgments regarding these statements.</p>  
  <p>Please press the ‘Next’ button when you are ready to start the study.</p>`,
  choices: ["Next"],
}; 

const conditioning_instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <p>In the next task, you will be presented with 8 trivia statements, one at a time.</p> 
  <p>These statements will be paired with either <strong>positive</strong> (flowers) or <strong>negative</strong> (cockroaches) pictures.</p>
  <p>Your task is to carefully <strong>read the statements</strong> and pay attention to the <strong>pictures</strong> paired with them.</p> 
  <p>Please do your best to read all the <strong>statements</strong> and to view the <strong>positive or negative pictures</strong> that accompany them, even though the presentation is fast.</p> 
  <p>To avoid compromising the study results, please do not search for information related to the statements during the study.</p>
  <p>Press the ‘Next’ button when you are ready to start the task.</p>`,
  choices: ["Next"],
};

const memory_task_instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <p>In the next task, you will be presented with all the statements you read in the previous part of the study.</p>
  <p>For each statement, please try your best to recall whether it was paired with positive pictures (of flowers) or with negative pictures (of cockroaches).</p>
  <p>If, despite your best effort, you cannot remember whether the picture presented with a given statement was positive or negative, click 'I don't remember.'</p>
  <p>We remind you that, to avoid compromising the study results, we ask that you do not search for information related to the statements during the study.</p>
  <p>Press the ‘Next’ button when you are ready to start the task.</p>`,
  choices: ["Next"],
};

const attention_checks = [
  {
    type: jsPsychHtmlButtonResponse,
    stimulus: "<p>Did you read all the statements presented throughout the entire task?<br><small>(This response will not affect your payment)</small></p>",
    choices: ["Yes", "No"],
    data: {phase: "attention_check", question: 1}
  },
  {
    type: jsPsychHtmlButtonResponse,
    stimulus: "<p>Did you view all the images presented together with the statements throughout the entire task?<br><small>(This response will not affect your payment)</small></p>",
    choices: ["Yes", "No"],
    data: {phase: "attention_check", question: 2}
  },
  {
    type: jsPsychHtmlButtonResponse,
    stimulus: "<p>During this study, did you look for information related to the statements presented? (e.g., on Google or any other tool)<br><small>(This response will not affect your payment)</small></p>",
    choices: ["No", "Yes"],
    data: {phase: "attention_check", question: 3}
  }
];

const debriefing = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <h2>End of the study</h2>
    <p>Thank you very much for your participation!</p>
    <p>In this study, we examined whether emphasising the importance of valence in the instructions and presenting 6 times each statement
    paired with a positive or negative picture was sufficient to reach optimal memory for the pairing between statements and picture valence.</p>
    <p>If you have any questions or comments, or if you would like to receive additional information 
    on the present study, please do not hesitate to contact the person in charge of this research 
    at the following e-mail address: chloe.fournier@uclouvain.be</p>
    <p>On the next page, you will be redirected to Prolific.</p>
  `,
  choices: ["Finish"]
};

/* ---------- Memory task ---------- */
let valence_memory_trials = all_trivia.map(stim => {
  const conditioning_stim = conditioning_trials.find(trial => trial.data.trivia === stim.text);
  const real_valence = conditioning_stim.data.valence; // "positive" ou "negative"

  return {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<div style="margin-bottom:15px;">${stim.text}</div>
               <p>Was this statement previously paired with positive pictures (of flowers) or negative pictures (of cockroaches)?</p>`,
    choices: ["Positive", "Negative", "I don't remember"],
    post_trial_gap: 500,
    data: {
      phase: "valence_memory",
      trivia: stim.text,
      correct_valence: real_valence
    },
    on_finish: function(data) {
      const choiceIndex = data.response; // 0 = Positive, 1 = Negative, 2 = Idk
      const choiceLabels = ["positive","negative","unknown"];
      const choiceNumeric = choiceIndex + 1; // 1,2,3 pour les analyses
      data.response = choiceNumeric; // valeur numérique

      // correct = 1 si le participant a choisi correctement, 0 sinon
      if(choiceLabels[choiceIndex] === real_valence) {
        data.correct = 1;
      } else {
        data.correct = 0;
      }
    }
  };
});

/* ---------- INITIALISATION jsPsych ---------- */
const jsPsych = initJsPsych({
  display_element: 'jspsych-target',
  override_safe_mode: true,
  on_finish: function(){
  }
});

/* ---------- RÉCUPÉRATION VARIABLES PROLIFIC ---------- */
const prolific_id = jsPsych.data.getURLVariable('PROLIFIC_PID');
const study_id = jsPsych.data.getURLVariable('STUDY_ID');
const session_id = jsPsych.data.getURLVariable('SESSION_ID');
const subject_id = jsPsych.randomization.randomID(10); // ID anonyme

/* ---------- AJOUT MÉTADONNÉES ---------- */
jsPsych.data.addProperties({
  subject_id: subject_id,
  prolific_id: prolific_id,
  study_id: study_id,
  session_id: session_id,
});

/* ---------- DÉFINITION DU NOM DE FICHIER ---------- */
const filename = `${subject_id}.csv`;

/* ---------- ÉCRANS PROLIFIC ET SAUVEGARDE ---------- */
const save_data = {
  type: jsPsychPipe,
  action: "save",
  experiment_id: "A3AVF1ywc6tb", // ton ID OSF
  filename: filename,
  data_string: () => jsPsych.data.get().csv()
  // token: osfToken  
};

const prolific = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p class='instructions'>
      Please wait a moment, you will automatically be redirected to Prolific.
    </p>`,
  trial_duration: 3000,
  choices: "NO_KEYS",
  on_finish: function(){
    window.location.href = "https://app.prolific.com/submissions/complete?cc=CI7BHK3D";
  }
};

/* ---------- TIMELINE ---------- */
const timeline = [
  preload,
  welcome,
  consent,
  enter_fullscreen,
  instructions,
  conditioning_instructions,
  ...shuffleArray(conditioning_trials),
  memory_task_instructions,
  ...shuffleArray(valence_memory_trials),
  ...attention_checks,
  debriefing,
  save_data,
  prolific
];

/* ---------- LANCEMENT DE L’EXPÉRIENCE ---------- */
jsPsych.run(timeline);