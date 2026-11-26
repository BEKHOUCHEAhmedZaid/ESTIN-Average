import type { SemesterConfig, SemesterId, TrackId, SemesterNum } from '../types'

export const SEMESTER_DATA: Record<SemesterId, SemesterConfig> = {
  '1CP-S1': {
    id: '1CP-S1',
    trackId: '1CP',
    semesterNum: 1,
    name: {
      fr: '1CP — 1er Semestre (S1)',
      en: '1CP — 1st Semester (S1)',
    },
    trackName: {
      fr: '1CP — Cycle Préparatoire',
      en: '1CP — Preparatory Cycle',
    },
    modules: [
      { unit: 'UEF 1', module: 'ALSDS', fullName: { fr: 'Algorithmique & Structures de Données Statiques (ALSDS)', en: 'Algorithms & Static Data Structures (ALSDS)' }, coef: 5, credit: 6 },
      { unit: 'UEF 1', module: 'ARCH 1', fullName: { fr: 'Architecture des Ordinateurs 1 (ARCH 1)', en: 'Computer Architecture 1 (ARCH 1)' }, coef: 4, credit: 5 },
      { unit: 'UEF 1', module: 'SYST 1', fullName: { fr: 'Systèmes d\'Exploitation 1 (SYST 1)', en: 'Operating Systems 1 (SYST 1)' }, coef: 3, credit: 3 },
      { unit: 'UEF 2', module: 'ANA 1', fullName: { fr: 'Analyse Mathématique 1 (ANA 1)', en: 'Mathematical Analysis 1 (ANA 1)' }, coef: 5, credit: 6 },
      { unit: 'UEF 2', module: 'ALG 1', fullName: { fr: 'Algèbre Linéaire 1 (ALG 1)', en: 'Linear Algebra 1 (ALG 1)' }, coef: 3, credit: 3 },
      { unit: 'UEF 2', module: 'ELECT', fullName: { fr: 'Électronique Générale (ELECT)', en: 'General Electronics (ELECT)' }, coef: 3, credit: 4 },
      { unit: 'UET', module: 'TEE', fullName: { fr: 'Techniques d\'Expression Écrite (TEE)', en: 'Written Expression Techniques (TEE)' }, coef: 2, credit: 2 },
      { unit: 'UET', module: 'ANG 1', fullName: { fr: 'Anglais Technique 1 (ANG 1)', en: 'Technical English 1 (ANG 1)' }, coef: 2, credit: 2 },
      { unit: 'UED', module: 'HIST', fullName: { fr: 'Histoire des Sciences & Informatique (HIST)', en: 'History of Science & Computing (HIST)' }, coef: 1, credit: 1 },
    ],
  },
  '1CP-S2': {
    id: '1CP-S2',
    trackId: '1CP',
    semesterNum: 2,
    name: {
      fr: '1CP — 2ème Semestre (S2)',
      en: '1CP — 2nd Semester (S2)',
    },
    trackName: {
      fr: '1CP — Cycle Préparatoire',
      en: '1CP — Preparatory Cycle',
    },
    modules: [
      { unit: 'UEF 3', module: 'ALSDD', fullName: { fr: 'Algorithmique & Structures de Données Dynamiques (ALSDD)', en: 'Algorithms & Dynamic Data Structures (ALSDD)' }, coef: 5, credit: 6 },
      { unit: 'UEF 3', module: 'SYST 2', fullName: { fr: 'Systèmes d\'Exploitation 2 (SYST 2)', en: 'Operating Systems 2 (SYST 2)' }, coef: 3, credit: 3 },
      { unit: 'UEF 4', module: 'ANA 2', fullName: { fr: 'Analyse Mathématique 2 (ANA 2)', en: 'Mathematical Analysis 2 (ANA 2)' }, coef: 5, credit: 6 },
      { unit: 'UEF 4', module: 'ALG 2', fullName: { fr: 'Algèbre Linéaire 2 (ALG 2)', en: 'Linear Algebra 2 (ALG 2)' }, coef: 3, credit: 4 },
      { unit: 'UEM 1', module: 'MECA', fullName: { fr: 'Mécanique du Point (MECA)', en: 'Classical Mechanics (MECA)' }, coef: 3, credit: 3 },
      { unit: 'UEM 1', module: 'ELEF 1', fullName: { fr: 'Électronique Fondamentale 1 (ELEF 1)', en: 'Fundamental Electronics 1 (ELEF 1)' }, coef: 4, credit: 4 },
      { unit: 'UET', module: 'TEO', fullName: { fr: 'Techniques d\'Expression Orale (TEO)', en: 'Oral Expression Techniques (TEO)' }, coef: 2, credit: 2 },
    ],
  },
  '2CP-S1': {
    id: '2CP-S1',
    trackId: '2CP',
    semesterNum: 1,
    name: {
      fr: '2CP — 1er Semestre (S1)',
      en: '2CP — 1st Semester (S1)',
    },
    trackName: {
      fr: '2CP — Cycle Préparatoire',
      en: '2CP — Preparatory Cycle',
    },
    modules: [
      { unit: 'UEF 5', module: 'SFSD', fullName: { fr: 'Structures de Fichiers & de Données (SFSD)', en: 'File Structures & Data Structures (SFSD)' }, coef: 4, credit: 4 },
      { unit: 'UEF 5', module: 'ARCH 2', fullName: { fr: 'Architecture des Ordinateurs 2 (ARCH 2)', en: 'Computer Architecture 2 (ARCH 2)' }, coef: 4, credit: 4 },
      { unit: 'UEF 5', module: 'ELECT2', fullName: { fr: 'Électronique Fondamentale 2 (ELECT 2)', en: 'Fundamental Electronics 2 (ELECT 2)' }, coef: 4, credit: 4 },
      { unit: 'UEF 6', module: 'ANA 3', fullName: { fr: 'Analyse Mathématique 3 (ANA 3)', en: 'Mathematical Analysis 3 (ANA 3)' }, coef: 5, credit: 6 },
      { unit: 'UEF 6', module: 'ALG 3', fullName: { fr: 'Algèbre Linéaire 3 (ALG 3)', en: 'Linear Algebra 3 (ALG 3)' }, coef: 3, credit: 3 },
      { unit: 'UEF 6', module: 'PROBA1', fullName: { fr: 'Probabilités & Statistiques 1 (PROBA 1)', en: 'Probability & Statistics 1 (PROBA 1)' }, coef: 4, credit: 4 },
      { unit: 'UET', module: 'ANGLAIS', fullName: { fr: 'Anglais Technique 3 (ANGLAIS)', en: 'Technical English 3 (ANGLAIS)' }, coef: 2, credit: 2 },
      { unit: 'UED', module: 'ECONOMY', fullName: { fr: 'Économie Générale & d\'Entreprise (ECONOMY)', en: 'General Economics & Management (ECONOMY)' }, coef: 2, credit: 3 },
    ],
  },
  '2CP-S2': {
    id: '2CP-S2',
    trackId: '2CP',
    semesterNum: 2,
    name: {
      fr: '2CP — 2ème Semestre (S2)',
      en: '2CP — 2nd Semester (S2)',
    },
    trackName: {
      fr: '2CP — Cycle Préparatoire',
      en: '2CP — Preparatory Cycle',
    },
    modules: [
      { unit: 'UEF 8', module: 'ANAL4', fullName: { fr: 'Analyse Numérique (ANAL 4)', en: 'Numerical Analysis (ANAL 4)' }, coef: 5, credit: 6 },
      { unit: 'UEF 8', module: 'LOGM', fullName: { fr: 'Logique Mathématique & Preuves (LOGM)', en: 'Mathematical Logic & Proofs (LOGM)' }, coef: 4, credit: 4 },
      { unit: 'UEM 3', module: 'OOE', fullName: { fr: 'Outils & Environnements de Dév. (OOE)', en: 'Development Tools & Environments (OOE)' }, coef: 3, credit: 3 },
      { unit: 'UEM 3', module: 'PRJP', fullName: { fr: 'Projet Pluridisciplinaire (PRJP)', en: 'Multidisciplinary Project (PRJP)' }, coef: 4, credit: 4 },
      { unit: 'UEM 4', module: 'PRST2', fullName: { fr: 'Probabilités & Statistiques 2 (PRST 2)', en: 'Probability & Statistics 2 (PRST 2)' }, coef: 4, credit: 4 },
      { unit: 'UET', module: 'ANG3', fullName: { fr: 'Anglais Technique 4 (ANG 3)', en: 'Technical English 4 (ANG 3)' }, coef: 2, credit: 2 },
      { unit: 'UEF 7', module: 'POO', fullName: { fr: 'Programmation Orientée Objet (POO)', en: 'Object-Oriented Programming (POO)' }, coef: 4, credit: 4 },
      { unit: 'UEF 7', module: 'SINF', fullName: { fr: 'Systèmes d\'Information (SINF)', en: 'Information Systems (SINF)' }, coef: 3, credit: 3 },
    ],
  },
  '1CS-S1': {
    id: '1CS-S1',
    trackId: '1CS',
    semesterNum: 1,
    name: {
      fr: '1CS — 1er Semestre (S1)',
      en: '1CS — 1st Semester (S1)',
    },
    trackName: {
      fr: '1CS — Second Cycle Ingénieur',
      en: '1CS — Engineering Cycle',
    },
    modules: [
      { unit: 'UEF 1.1', module: 'Système d\'exploitation', fullName: { fr: 'Système d\'exploitation', en: 'Operating Systems' }, coef: 3, credit: 5 },
      { unit: 'UEF 1.1', module: 'Réseaux 1', fullName: { fr: 'Réseaux Informatiques 1', en: 'Computer Networks 1' }, coef: 2, credit: 4 },
      { unit: 'UEF 2.1', module: 'Bases de données', fullName: { fr: 'Bases de données Relationnelles', en: 'Relational Databases' }, coef: 3, credit: 5 },
      { unit: 'UEF 2.1', module: 'Génie logiciel', fullName: { fr: 'Génie logiciel & Conception', en: 'Software Engineering & Design' }, coef: 2, credit: 4 },
      { unit: 'UEM 1.1', module: 'Recherche Opérationnelle 1', fullName: { fr: 'Recherche Opérationnelle 1', en: 'Operations Research 1' }, coef: 2, credit: 3 },
      { unit: 'UEM 1.1', module: 'Processus aléatoires & Files d\'attente', fullName: { fr: 'Processus aléatoires & Files d\'attente', en: 'Stochastic Processes & Queuing' }, coef: 2, credit: 3 },
      { unit: 'UEM 1.1', module: 'Théorie des langages', fullName: { fr: 'Théorie des langages & Compilation', en: 'Language Theory & Compilation' }, coef: 2, credit: 3 },
      { unit: 'UET 1.1', module: 'Anglais technique 1', fullName: { fr: 'Anglais technique 1', en: 'Technical English 1' }, coef: 1, credit: 3 },
    ],
  },
  '1CS-S2': {
    id: '1CS-S2',
    trackId: '1CS',
    semesterNum: 2,
    name: {
      fr: '1CS — 2ème Semestre (S2)',
      en: '1CS — 2nd Semester (S2)',
    },
    trackName: {
      fr: '1CS — Second Cycle Ingénieur',
      en: '1CS — Engineering Cycle',
    },
    modules: [
      { unit: 'UEF 1.2', module: 'Architectures distribuées & Calcul intensif', fullName: { fr: 'Architectures distribuées & Calcul intensif', en: 'Distributed Architectures & HPC' }, coef: 2, credit: 4 },
      { unit: 'UEF 1.2', module: 'Réseaux 2', fullName: { fr: 'Réseaux Informatiques 2', en: 'Computer Networks 2' }, coef: 2, credit: 4 },
      { unit: 'UEF 2.2', module: 'Intelligence Artificielle', fullName: { fr: 'Intelligence Artificielle', en: 'Artificial Intelligence' }, coef: 3, credit: 5 },
      { unit: 'UEF 2.2', module: 'Sécurité informatique', fullName: { fr: 'Sécurité informatique & Cryptographie', en: 'Computer Security & Crypto' }, coef: 3, credit: 5 },
      { unit: 'UEM 1.2', module: 'Recherche Opérationnelle 2', fullName: { fr: 'Recherche Opérationnelle 2', en: 'Operations Research 2' }, coef: 2, credit: 3 },
      { unit: 'UEM 1.2', module: 'Méthodes formelles', fullName: { fr: 'Méthodes formelles de Spécification', en: 'Formal Specification Methods' }, coef: 2, credit: 3 },
      { unit: 'UEM 1.2', module: 'Analyse numérique', fullName: { fr: 'Analyse numérique Avancée', en: 'Advanced Numerical Analysis' }, coef: 2, credit: 3 },
      { unit: 'UED 1.2', module: 'Entrepreneuriat & Startup', fullName: { fr: 'Entrepreneuriat & Startup', en: 'Entrepreneurship & Startups' }, coef: 1, credit: 3 },
    ],
  },
  '2CS-IA-S1': {
    id: '2CS-IA-S1',
    trackId: '2CS-AI',
    semesterNum: 1,
    name: {
      fr: '2CS AI — 1er Semestre (S1)',
      en: '2CS AI — 1st Semester (S1)',
    },
    trackName: {
      fr: '2CS AI — Intelligence Artificielle & Data Science',
      en: '2CS AI — Artificial Intelligence & Data Science',
    },
    modules: [
      { unit: 'UEF 1.3', module: 'Fondements du Data Science', fullName: { fr: 'Fondements du Data Science', en: 'Foundations of Data Science' }, coef: 3, credit: 5 },
      { unit: 'UEF 1.3', module: 'Complexité des Problèmes', fullName: { fr: 'Complexité des Problèmes', en: 'Problem Complexity' }, coef: 2, credit: 4 },
      { unit: 'UEF 2.3', module: 'Bases de données avancées', fullName: { fr: 'Bases de données avancées (NoSQL/NewSQL)', en: 'Advanced Databases (NoSQL/NewSQL)' }, coef: 3, credit: 5 },
      { unit: 'UEF 2.3', module: 'Ingénierie des logiciels', fullName: { fr: 'Ingénierie des logiciels', en: 'Software Engineering' }, coef: 2, credit: 4 },
      { unit: 'UEM 1.3', module: 'Cloud Computing', fullName: { fr: 'Cloud Computing & Virtualisation', en: 'Cloud Computing & Virtualization' }, coef: 2, credit: 3 },
      { unit: 'UEM 1.3', module: 'Conduite de Projet', fullName: { fr: 'Conduite de Projet Informatique', en: 'IT Project Management' }, coef: 2, credit: 3 },
      { unit: 'UEM 1.3', module: 'Analyse de données', fullName: { fr: 'Analyse & Exploration de données', en: 'Data Analysis & Exploration' }, coef: 2, credit: 3 },
      { unit: 'UET 1.3', module: 'Anglais Technique 2', fullName: { fr: 'Anglais Technique 2', en: 'Technical English 2' }, coef: 1, credit: 3 },
    ],
  },
  '2CS-IA-S2': {
    id: '2CS-IA-S2',
    trackId: '2CS-AI',
    semesterNum: 2,
    name: {
      fr: '2CS AI — 2ème Semestre (S2)',
      en: '2CS AI — 2nd Semester (S2)',
    },
    trackName: {
      fr: '2CS AI — Intelligence Artificielle & Data Science',
      en: '2CS AI — Artificial Intelligence & Data Science',
    },
    modules: [
      { unit: 'UEF 1.4', module: 'Apprentissage Machine', fullName: { fr: 'Apprentissage Machine (Machine Learning)', en: 'Machine Learning' }, coef: 3, credit: 6 },
      { unit: 'UEF 1.4', module: 'Entrepôt de données et Big Data', fullName: { fr: 'Entrepôt de données & Big Data', en: 'Data Warehousing & Big Data' }, coef: 2, credit: 3 },
      { unit: 'UEF 2.4', module: 'Ingénierie des connaissances', fullName: { fr: 'Ingénierie des connaissances & Ontologies', en: 'Knowledge Engineering & Ontologies' }, coef: 3, credit: 5 },
      { unit: 'UEF 2.4', module: 'Bases de données distribuées', fullName: { fr: 'Bases de données distribuées', en: 'Distributed Databases' }, coef: 2, credit: 4 },
      { unit: 'UEM 1.4', module: 'Statistiques avancées', fullName: { fr: 'Statistiques avancées pour l\'IA', en: 'Advanced Statistics for AI' }, coef: 2, credit: 3 },
      { unit: 'UEM 1.4', module: 'Base de traitement d\'image', fullName: { fr: 'Traitement d\'images & Vision Artificielle', en: 'Image Processing & Computer Vision' }, coef: 2, credit: 3 },
      { unit: 'UEM 1.4', module: 'Séries chronologiques', fullName: { fr: 'Analyse des Séries chronologiques', en: 'Time Series Analysis' }, coef: 2, credit: 3 },
      { unit: 'UED 1.4', module: 'Technologies du Numérique dans les organisations', fullName: { fr: 'Technologies du Numérique dans les organisations', en: 'Digital Technologies in Organizations' }, coef: 1, credit: 3 },
    ],
  },
  '2CS-CS-S1': {
    id: '2CS-CS-S1',
    trackId: '2CS-CS',
    semesterNum: 1,
    name: {
      fr: '2CS CS — 1er Semestre (S1)',
      en: '2CS CS — 1st Semester (S1)',
    },
    trackName: {
      fr: '2CS CS — Cybersécurité',
      en: '2CS CS — Cybersecurity',
    },
    modules: [
      { unit: 'UEF 1.3', module: 'Fondements du Data Science', fullName: { fr: 'Fondements du Data Science', en: 'Foundations of Data Science' }, coef: 3, credit: 5 },
      { unit: 'UEF 1.3', module: 'Complexité des Problèmes', fullName: { fr: 'Complexité des Problèmes', en: 'Problem Complexity' }, coef: 2, credit: 4 },
      { unit: 'UEF 2.3', module: 'Bases de données avancées', fullName: { fr: 'Bases de données avancées (NoSQL/NewSQL)', en: 'Advanced Databases (NoSQL/NewSQL)' }, coef: 3, credit: 5 },
      { unit: 'UEF 2.3', module: 'Ingénierie des logiciels', fullName: { fr: 'Ingénierie des logiciels', en: 'Software Engineering' }, coef: 2, credit: 4 },
      { unit: 'UEM 1.3', module: 'Cloud Computing', fullName: { fr: 'Cloud Computing & Virtualisation', en: 'Cloud Computing & Virtualization' }, coef: 2, credit: 3 },
      { unit: 'UEM 1.3', module: 'Conduite de Projet', fullName: { fr: 'Conduite de Projet Informatique', en: 'IT Project Management' }, coef: 2, credit: 3 },
      { unit: 'UEM 1.3', module: 'Analyse de données', fullName: { fr: 'Analyse & Exploration de données', en: 'Data Analysis & Exploration' }, coef: 2, credit: 3 },
      { unit: 'UET 1.3', module: 'Anglais Technique 2', fullName: { fr: 'Anglais Technique 2', en: 'Technical English 2' }, coef: 1, credit: 3 },
    ],
  },
  '2CS-CS-S2': {
    id: '2CS-CS-S2',
    trackId: '2CS-CS',
    semesterNum: 2,
    name: {
      fr: '2CS CS — 2ème Semestre (S2)',
      en: '2CS CS — 2nd Semester (S2)',
    },
    trackName: {
      fr: '2CS CS — Cybersécurité',
      en: '2CS CS — Cybersecurity',
    },
    modules: [
      { unit: 'UEF 1.4', module: 'Méthodes formelles pour la sécurité', fullName: { fr: 'Méthodes formelles pour la sécurité', en: 'Formal Methods for Security' }, coef: 3, credit: 5 },
      { unit: 'UEF 1.4', module: 'Apprentissage Machine', fullName: { fr: 'Apprentissage Machine', en: 'Machine Learning' }, coef: 3, credit: 5 },
      { unit: 'UEF 2.4', module: 'Administration système et réseaux', fullName: { fr: 'Administration système & réseaux', en: 'System & Network Administration' }, coef: 2, credit: 4 },
      { unit: 'UEF 2.4', module: 'Cryptographie avancée', fullName: { fr: 'Cryptographie avancée & Protocoles', en: 'Advanced Cryptography & Protocols' }, coef: 2, credit: 4 },
      { unit: 'UEM 1.4', module: 'Sécurité des réseaux', fullName: { fr: 'Sécurité des réseaux & Pare-feu', en: 'Network Security & Firewalls' }, coef: 2, credit: 3 },
      { unit: 'UEM 1.4', module: 'Sécurité des systèmes d\'exploitation', fullName: { fr: 'Sécurité des systèmes d\'exploitation', en: 'Operating System Security' }, coef: 2, credit: 3 },
      { unit: 'UEM 1.4', module: 'Audit de la sécurité des systèmes d\'information', fullName: { fr: 'Audit de la sécurité des SI (ISO 27001)', en: 'Information Systems Security Audit' }, coef: 2, credit: 3 },
      { unit: 'UED 1.4', module: 'Biométrie', fullName: { fr: 'Biométrie & Authentification', en: 'Biometrics & Authentication' }, coef: 2, credit: 3 },
    ],
  },
}

export function getSemesterConfig(trackId: TrackId, semesterNum: SemesterNum): SemesterConfig {
  let semKey: SemesterId
  if (trackId === '2CS-AI') {
    semKey = semesterNum === 1 ? '2CS-IA-S1' : '2CS-IA-S2'
  } else if (trackId === '2CS-CS') {
    semKey = semesterNum === 1 ? '2CS-CS-S1' : '2CS-CS-S2'
  } else {
    semKey = `${trackId}-S${semesterNum}` as SemesterId
  }
  return SEMESTER_DATA[semKey]
}
