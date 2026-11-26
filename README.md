# 📐 ESTIN Average

> **Calculateur Académique & Simulateur de Progression pour l'ESTIN Béjaïa**  
> *Academic Average Calculator & Progress Simulator for ESTIN Students.*

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3-61dafb.svg?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6.svg?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg?logo=vite)
![Vitest](https://img.shields.io/badge/Vitest-2.1-729b1a.svg?logo=vitest)

---

## 📌 Présentation / Overview

**ESTIN Average** est une application web moderne, légère et réactive dédiée au calcul de la moyenne générale, des moyennes par unité d'enseignement (UE) et des crédits ECTS pour tous les cycles et semestres de l'**ESTIN** (*École Supérieure en Sciences et Technologies de l'Informatique et du Numérique*, Amizour - Béjaïa).

Conçue avec fidélité absolue aux programmes officiels de l'ESTIN et au design system **Google Stitch**, cette solution fonctionne entièrement côté client avec persistance locale sans fuite de données personnelles.

---

## 🎓 Cursus Académiques Couverts (10 Semestres)

L'application couvre l'intégralité des 5 filières et des 10 semestres :

1. **1CP — Cycle Préparatoire 1ère Année** : Semestre 1 (32 crédits, 28 coeff), Semestre 2 (28 crédits, 25 coeff)
2. **2CP — Cycle Préparatoire 2ème Année** : Semestre 1 (30 crédits, 28 coeff), Semestre 2 (30 crédits, 29 coeff)
3. **1CS — Second Cycle Ingénieur** : Semestre 1 (30 crédits, 17 coeff), Semestre 2 (30 crédits, 17 coeff)
4. **2CS AI — Intelligence Artificielle & Data Science** : Semestre 1 (30 crédits, 17 coeff), Semestre 2 (30 crédits, 17 coeff)
5. **2CS CS — Cybersécurité** : Semestre 1 (30 crédits, 17 coeff), Semestre 2 (30 crédits, 18 coeff)

---

## ⚖️ Formules et Règles de Calcul

### 1. Moyenne d'une Matière ($M$)
Formule officielle du contrôle continu à l'ESTIN (ratio 2:1) :
$$\text{Moyenne} = \frac{2 \times \text{Examen} + \text{Note TD/TP}}{3}$$

### 2. Moyenne d'une Unité d'Enseignement ($UE$)
Moyenne pondérée des matières composant l'unité :
$$UE = \frac{\sum (M_i \times C_i)}{\sum C_i}$$

### 3. Moyenne Générale du Semestre ($S$)
Moyenne pondérée de l'ensemble des matières sur le semestre :
$$S = \frac{\sum (M_j \times C_j)}{\sum C_j}$$

### 4. Validation et Crédits ECTS
- **Seuil de validation d'une matière** : $\ge 10.00 / 20.00$.
- **Règle de compensation par UE** : Si la moyenne d'une UE est $\ge 10.00 / 20.00$, l'ensemble des crédits de l'unité est acquis.
- **Règle de compensation semestrielle** : Si la moyenne générale du semestre est $\ge 10.00 / 20.00$, le semestre est validé et la totalité des crédits du semestre est accordée.

---

## 🚀 Fonctionnalités Clés

- 🌐 **Bilingue Intégral (FR / EN)** : Changement instantané de langue sans perte des notes saisies.
- ⚡ **Calcul en Temps Réel** : Mise à jour instantanée dès la saisie des notes, sans rechargement.
- 🔢 **Support Virgule et Point** : Accepte indifféremment `14.5` et `14,5`.
- 💾 **Sauvegarde Locale (localStorage)** : Les notes restent enregistrées par semestre sur l'appareil de l'étudiant.
- 🎲 **Bouton Exemple / Sample** : Préremplit le tableau avec des notes de démonstration réalistes.
- 🧹 **Bouton Effacer / Clear** : Réinitialise uniquement les notes du semestre actif.
- 📱 **100% Responsive** : Optimisé pour tous les écrans (320px, 375px, 390px, 430px, 768px, 1024px, 1440px).
- 🖨️ **Mode Impression** : Feuille de style d'impression épurée pour générer des bulletins PDF propres.

---

## 💻 Installation et Développement

### Prérequis
- Node.js (v18 ou supérieur recommandé, testé sur v24)
- npm ou pnpm

### Commandes

```bash
# Cloner le dépôt
git clone https://github.com/<your-username>/ESTIN-Average.git
cd ESTIN-Average

# Installer les dépendances
npm install

# Lancer en environnement de développement
npm run dev

# Lancer les tests automatisés
npm test

# Compiler pour la production
npm run build

# Prévisualiser le build de production
npm run preview
```

---

## ☁️ Déploiement sur Vercel

Le projet est configuré pour un déploiement zéro-configuration sur **Vercel** :

1. Connectez votre compte GitHub à [Vercel](https://vercel.com).
2. Importez le dépôt `ESTIN-Average`.
3. Vercel détecte automatiquement le framework **Vite** :
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Cliquez sur **Deploy**.

---

## 🛡️ Confidentialité et Sécurité

Aucune note ni donnée personnelle n'est envoyée à des serveurs tiers. Tout calcul et toute persistance sont strictement confinés au navigateur de l'étudiant (`localStorage`).

---

## 📄 Licence

Projet open-source développé avec soin pour la communauté étudiante de l'**ESTIN Béjaïa**.
