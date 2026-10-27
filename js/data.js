const profil = {
  nom: "Tranchent",
  role: "Développeur web & logiciel — débutant",
  titreDocument: "Tranchent — Développeur web & logiciel",
  email: "",
  reseaux: [
    {
      nom: "GitHub",
      identifiant: "@Tranchent0",
      url: "https://github.com/Tranchent0"
    },
    {
      nom: "Discord",
      identifiant: "tranchdev",
      url: ""
    },
    {
      nom: "LinkedIn",
      identifiant: "",
      url: ""
    }
  ]
};

const competences = [
  {
    categorie: "Langages & technologies",
    description: "Ce que j’utilise pour construire des pages, des scripts et de petites applications.",
    elements: [
      { nom: "HTML5", niveau: "Bonnes bases" },
      { nom: "CSS3", niveau: "Bonnes bases" },
      { nom: "JavaScript", niveau: "Bases" },
      { nom: "Python", niveau: "Bases" }
    ]
  },
  {
    categorie: "Outils & pratiques",
    description: "Mon environnement de travail et les bonnes habitudes que j’installe projet après projet.",
    elements: [
      { nom: "Git", niveau: "Bases" },
      { nom: "GitHub", niveau: "Bases" },
      { nom: "VS Code", niveau: "Au quotidien" },
      { nom: "Responsive design", niveau: "Bases" },
      { nom: "Accessibilité", niveau: "Notions" },
      { nom: "Référencement naturel", niveau: "Notions" }
    ]
  },
  {
    categorie: "En cours d’apprentissage",
    description: "Ce que je travaille en ce moment, sans le considérer comme acquis.",
    elements: [
      { nom: "JavaScript côté navigateur", niveau: "En progression" },
      { nom: "Python : scripts & automatisation", niveau: "En progression" },
      { nom: "Bonnes pratiques de code", niveau: "En progression" }
    ]
  }
];

const projets = [
  {
    titre: "Extensions de logiciels",
    statut: "Projets personnels",
    description: "Plusieurs petites extensions développées pour ajouter des fonctionnalités à des logiciels que j’utilise. Des projets courts, dont l’objectif était simple : rendre une tâche plus rapide et plus agréable.",
    technologies: ["JavaScript", "Python"],
    lien: "",
    libelleLien: "",
    vedette: false
  },
  {
    titre: "Sites web vitrines",
    statut: "Projets personnels",
    description: "Des sites vitrines conçus et codés de A à Z : structure, mise en page responsive, animations légères et contenu clair. Chaque site a été l’occasion de travailler la lisibilité et le détail.",
    technologies: ["HTML", "CSS", "JavaScript"],
    lien: "",
    libelleLien: "",
    vedette: false
  },
  {
    titre: "NCrew — messagerie privée",
    statut: "Projet collaboratif",
    description: "Participation au développement d’une messagerie privée conçue pour proposer des communications chiffrées et sécurisées. Mon premier vrai projet en équipe, et celui qui m’a le plus appris.",
    technologies: [],
    lien: "#ncrew",
    libelleLien: "En savoir plus",
    vedette: true
  }
];

const ncrew = {
  lienExterne: "",
  libelleLienExterne: "Découvrir NCrew"
};
