let minuterieAnnonce = 0;

document.addEventListener("DOMContentLoaded", initialiser);

function initialiser() {
  document.documentElement.classList.add("est-pret");
  remplirProfil();
  afficherCompetences();
  afficherProjets();
  afficherReseaux();
  afficherLienNcrew();
  initialiserEntete();
  initialiserMenu();
  initialiserNavigationActive();
  initialiserRevelations();
  initialiserAnnee();
}

function remplirProfil() {
  document.querySelectorAll("[data-profil-nom]").forEach((element) => {
    element.textContent = profil.nom;
  });

  document.querySelectorAll("[data-profil-role]").forEach((element) => {
    element.textContent = profil.role;
  });

  document.title = profil.titreDocument;
}

function afficherCompetences() {
  const conteneur = document.querySelector("#liste-competences");
  const modeleCategorie = document.querySelector("#modele-competence");
  const modelePuce = document.querySelector("#modele-puce");

  if (!conteneur || !modeleCategorie || !modelePuce) {
    return;
  }

  competences.forEach((categorie, indexCategorie) => {
    const carte = modeleCategorie.content.firstElementChild.cloneNode(true);
    carte.querySelector(".competence__titre").textContent = categorie.categorie;
    carte.querySelector(".competence__texte").textContent = categorie.description;

    const liste = carte.querySelector(".competence__liste");

    categorie.elements.forEach((element) => {
      const puce = modelePuce.content.firstElementChild.cloneNode(true);
      puce.querySelector(".puce__nom").textContent = element.nom;

      const niveau = puce.querySelector(".puce__niveau");

      if (element.niveau) {
        niveau.textContent = element.niveau;
      } else {
        niveau.remove();
      }

      liste.append(puce);
    });

    carte.style.setProperty("--delai", `${indexCategorie * 90}ms`);
    carte.classList.add("revelation");
    conteneur.append(carte);
  });
}

function afficherProjets() {
  const conteneur = document.querySelector("#liste-projets");
  const modele = document.querySelector("#modele-projet");

  if (!conteneur || !modele) {
    return;
  }

  projets.forEach((projet, indexProjet) => {
    const carte = modele.content.firstElementChild.cloneNode(true);
    const titre = carte.querySelector(".projet__titre");

    titre.id = `projet-${indexProjet + 1}`;
    titre.textContent = projet.titre;
    carte.setAttribute("aria-labelledby", titre.id);
    carte.querySelector(".projet__numero").textContent = String(indexProjet + 1).padStart(2, "0");
    carte.querySelector(".projet__texte").textContent = projet.description;

    const statut = carte.querySelector(".projet__statut");

    if (projet.statut) {
      statut.textContent = projet.statut;
    } else {
      statut.remove();
    }

    if (projet.vedette) {
      carte.classList.add("projet--vedette");
    }

    const technologies = carte.querySelector(".projet__technologies");

    if (projet.technologies && projet.technologies.length) {
      projet.technologies.forEach((technologie) => {
        const etiquette = document.createElement("li");
        etiquette.className = "etiquette";
        etiquette.textContent = technologie;
        technologies.append(etiquette);
      });
    } else {
      technologies.remove();
    }

    const lien = carte.querySelector(".projet__lien");

    if (projet.lien) {
      lien.href = projet.lien;
      lien.querySelector(".projet__lien-texte").textContent = projet.libelleLien || "Voir le projet";

      if (/^https?:/i.test(projet.lien)) {
        lien.target = "_blank";
        lien.rel = "noopener noreferrer";
        lien.append(creerIndicationNouvelOnglet());
      }
    } else {
      lien.remove();
    }

    carte.style.setProperty("--delai", `${Math.min(indexProjet, 3) * 90}ms`);
    carte.classList.add("revelation");
    conteneur.append(carte);
  });
}

function creerIndicationNouvelOnglet() {
  const indication = document.createElement("span");
  indication.className = "lecteur-ecran";
  indication.textContent = " (nouvel onglet)";
  return indication;
}

function construireReseaux() {
  const reseaux = [];

  if (profil.email) {
    reseaux.push({
      nom: "Email",
      identifiant: profil.email,
      url: `mailto:${profil.email}`
    });
  }

  (profil.reseaux || []).forEach((reseau) => {
    if (reseau.url || reseau.identifiant) {
      reseaux.push(reseau);
    }
  });

  return reseaux;
}

function afficherReseaux() {
  const conteneur = document.querySelector("#liste-reseaux");
  const modeleLien = document.querySelector("#modele-reseau");
  const modeleCopie = document.querySelector("#modele-reseau-copie");

  if (!conteneur || !modeleLien || !modeleCopie) {
    return;
  }

  construireReseaux().forEach((reseau) => {
    if (reseau.url) {
      const element = modeleLien.content.firstElementChild.cloneNode(true);
      const lien = element.querySelector(".reseau__lien");
      const externe = /^https?:/i.test(reseau.url);

      lien.href = reseau.url;
      lien.setAttribute("aria-label", externe ? `${reseau.nom} : ${reseau.identifiant} — ouvre dans un nouvel onglet` : `${reseau.nom} : ${reseau.identifiant}`);
      element.querySelector(".reseau__nom").textContent = reseau.nom;
      element.querySelector(".reseau__identifiant").textContent = reseau.identifiant;

      if (!externe) {
        lien.removeAttribute("target");
        lien.removeAttribute("rel");
      }

      conteneur.append(element);
      return;
    }

    if (reseau.identifiant) {
      const element = modeleCopie.content.firstElementChild.cloneNode(true);
      const bouton = element.querySelector(".reseau__bouton");

      element.querySelector(".reseau__nom").textContent = reseau.nom;
      element.querySelector(".reseau__identifiant").textContent = reseau.identifiant;
      bouton.setAttribute("aria-label", `Copier l’identifiant ${reseau.nom}`);
      bouton.addEventListener("click", () => copierIdentifiant(reseau, bouton));
      conteneur.append(element);
    }
  });
}

async function copierIdentifiant(reseau, bouton) {
  const succes = await copierTexte(reseau.identifiant);

  bouton.textContent = succes ? "Copié" : "Copie manuelle";

  annoncer(succes
    ? `Identifiant ${reseau.nom} copié dans le presse-papiers.`
    : `Copie automatique impossible : l’identifiant est « ${reseau.identifiant} ».`);

  window.setTimeout(() => {
    bouton.textContent = "Copier";
  }, 2600);
}

async function copierTexte(texte) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(texte);
      return true;
    }

    const zone = document.createElement("textarea");
    zone.className = "zone-copie";
    zone.value = texte;
    zone.setAttribute("readonly", "");
    document.body.append(zone);
    zone.select();
    const succes = document.execCommand("copy");
    zone.remove();
    return succes;
  } catch (erreur) {
    return false;
  }
}

function annoncer(message) {
  const zone = document.querySelector("#annonce");

  if (!zone) {
    return;
  }

  zone.textContent = message;
  zone.classList.add("est-visible");
  window.clearTimeout(minuterieAnnonce);
  minuterieAnnonce = window.setTimeout(() => zone.classList.remove("est-visible"), 3400);
}

function afficherLienNcrew() {
  const lien = document.querySelector("#lien-ncrew");

  if (!lien) {
    return;
  }

  if (!ncrew.lienExterne) {
    lien.remove();
    return;
  }

  lien.href = ncrew.lienExterne;
  lien.textContent = ncrew.libelleLienExterne;
  lien.target = "_blank";
  lien.rel = "noopener noreferrer";
  lien.setAttribute("aria-label", `${ncrew.libelleLienExterne} — ouvre dans un nouvel onglet`);
  lien.hidden = false;
}

function initialiserEntete() {
  const entete = document.querySelector("[data-entete]");

  if (!entete) {
    return;
  }

  const mettreAJourEntete = () => {
    entete.classList.toggle("est-defile", window.scrollY > 12);
  };

  mettreAJourEntete();
  window.addEventListener("scroll", mettreAJourEntete, { passive: true });
}

function initialiserMenu() {
  const bascule = document.querySelector(".bascule-menu");
  const navigation = document.querySelector("#navigation-principale");

  if (!bascule || !navigation) {
    return;
  }

  const fermerMenu = () => {
    navigation.classList.remove("est-ouverte");
    bascule.setAttribute("aria-expanded", "false");
    bascule.setAttribute("aria-label", "Ouvrir le menu");
  };

  bascule.addEventListener("click", () => {
    const ouvert = navigation.classList.toggle("est-ouverte");
    bascule.setAttribute("aria-expanded", String(ouvert));
    bascule.setAttribute("aria-label", ouvert ? "Fermer le menu" : "Ouvrir le menu");
  });

  navigation.addEventListener("click", (evenement) => {
    if (evenement.target.closest("a")) {
      fermerMenu();
    }
  });

  document.addEventListener("keydown", (evenement) => {
    if (evenement.key === "Escape" && navigation.classList.contains("est-ouverte")) {
      fermerMenu();
      bascule.focus();
    }
  });

  const affichageLarge = window.matchMedia("(min-width: 55.0625rem)");

  affichageLarge.addEventListener("change", (evenement) => {
    if (evenement.matches) {
      fermerMenu();
    }
  });
}

function initialiserNavigationActive() {
  const liens = Array.from(document.querySelectorAll(".navigation__lien"));

  if (!liens.length || !("IntersectionObserver" in window)) {
    return;
  }

  const sections = liens
    .map((lien) => document.querySelector(lien.getAttribute("href")))
    .filter(Boolean);

  const observateur = new IntersectionObserver((entrees) => {
    entrees.forEach((entree) => {
      if (!entree.isIntersecting) {
        return;
      }

      liens.forEach((lien) => {
        const actif = lien.getAttribute("href") === `#${entree.target.id}`;
        lien.classList.toggle("est-actif", actif);

        if (actif) {
          lien.setAttribute("aria-current", "true");
        } else {
          lien.removeAttribute("aria-current");
        }
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  sections.forEach((section) => observateur.observe(section));
}

function initialiserRevelations() {
  const elements = Array.from(document.querySelectorAll(".revelation, [data-revelation]"));

  if (!elements.length) {
    return;
  }

  const mouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (mouvementReduit || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("est-visible"));
    return;
  }

  const observateur = new IntersectionObserver((entrees, observateurInterne) => {
    entrees.forEach((entree) => {
      if (!entree.isIntersecting) {
        return;
      }

      entree.target.classList.add("est-visible");
      observateurInterne.unobserve(entree.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

  elements.forEach((element) => observateur.observe(element));
}

function initialiserAnnee() {
  const annee = new Date().getFullYear();

  document.querySelectorAll("[data-annee]").forEach((element) => {
    element.textContent = annee;
  });
}
