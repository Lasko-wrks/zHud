# Z-HUD

Un HUD (Heads-Up Display) moderne, épuré et optimisé pour FiveM avec le framework ESX Legacy.

## 🚀 Fonctionnalités

- **Interface moderne** : Design épuré avec animations fluides
- **Statistiques en carrés** : Santé, armure, faim, soif avec barres de progression verticales
- **Palette de couleurs** : Noir profond (#0A0A0A), Vert saphir (#00FFAD), Blanc pur (#FFFFFF)
- **Informations du joueur** : Métier, argent, banque
- **Positionnement optimisé** : Statistiques en bas à gauche, infos joueur en haut à droite
- **Interface épurée** : Design minimaliste et moderne
- **Animations fluides** : Transitions et effets visuels élégants
- **Responsive** : S'adapte à toutes les résolutions
- **Optimisé** : Performance maximale avec JavaScript vanilla

## 🎮 Contrôles

- **F1** : Afficher/Masquer le HUD
- **Interface intuitive** : Pas de menu complexe, affichage direct des informations

## 📁 Structure du projet

```
z_hud/
├── fxmanifest.lua          # Manifeste FiveM
├── client/
│   └── client.lua          # Script client Lua
├── server/
│   └── server.lua          # Script serveur Lua
├── web/
│   ├── index.html          # Interface HTML
│   ├── style.css           # Styles CSS
│   └── script.js           # JavaScript côté web
└── README.md               # Documentation
```

## 🔧 Installation

1. **Télécharger** le script dans votre dossier `resources`
2. **Ajouter** `ensure z_hud` dans votre `server.cfg`
3. **Redémarrer** votre serveur

## 📋 Dépendances

- **ESX Legacy** (obligatoire)
- **esx_status** (optionnel - pour faim/soif/stress)
- **esx_basicneeds** (optionnel - alternative pour faim/soif)

### Configuration d'esx_status

Pour utiliser esx_status avec Z-HUD, vous devez enregistrer les statuts nécessaires. Voir le fichier `esx_status_config_example.lua` pour un exemple complet.

**Statuts requis :**
- `hunger` - Niveau de faim (0-100%)
- `thirst` - Niveau de soif (0-100%)
- `stress` - Niveau de stress (0-100%)

## 🔄 Communication Web ↔ Lua

### Lua → Web (SendNUIMessage)

```lua
-- Envoi de données depuis Lua vers l'interface web
SendNUIMessage({
    type = 'updateHUD',
    data = {
        health = 100,
        armor = 50,
        hunger = 80,
        thirst = 75,
        -- ... autres données
    }
})
```

### Web → Lua (fetch)

```javascript
// Le HUD est maintenant en lecture seule
// Aucun appel vers Lua n'est nécessaire
```

### Types de messages supportés

| Type | Description | Données |
|------|-------------|---------|
| `updateHUD` | Mise à jour des données du HUD | `data: object` |
| `toggleHUD` | Affichage/masquage du HUD | `visible: boolean` |
| `reset` | Réinitialisation du HUD | Aucune |

## 🎨 Personnalisation

### Animations et Effets Visuels

Le HUD dispose d'animations sophistiquées :
- **Remplissage des barres** : Animation fluide de 0% à la valeur cible
- **Effet de vague** : Animation dynamique sur les barres de progression
- **Transitions fluides** : Courbes de Bézier pour des mouvements naturels
- **Hover interactif** : Effets visuels au survol des éléments

### Palette de Couleurs

Le HUD utilise une palette de couleurs moderne et cohérente :

- **Couleur principale** : `#0A0A0A` (Noir Profond)
- **Couleur d'accentuation** : `#00FFAD` (Vert Saphir)
- **Couleur secondaire** : `#FFFFFF` (Blanc Pur)

### Design des Statistiques

Les statistiques sont affichées dans des carrés avec :
- **Barres de progression verticales** (de bas en haut)
- **Effet de lueur** avec animation de vague
- **Icônes colorées** et valeurs numériques
- **États spéciaux** : Orange pour santé faible, Rouge pour santé critique

### CSS Variables

Modifiez les couleurs dans `web/style.css` :

```css
.stat-square {
    background: #0A0A0A;
    border: 2px solid #00FFAD;
}

.progress-bar {
    background: #00FFAD;
}
```

## 📱 API JavaScript

### Fonctions disponibles

```javascript
// Mise à jour du HUD
window.zHUD.updateHUD(data);

// Affichage/masquage
window.zHUD.toggleHUD(visible);
```

## 🛠️ Commandes serveur

- `/hud` - Réinitialiser le HUD
- `/hudmoney` - Forcer la mise à jour de l'argent du HUD
- `/hudtoggle [playerId] [true/false]` - Forcer la visibilité (admin)

## 🔌 Exports

### Client

```lua
-- Définir la visibilité
exports['z_hud']:setHudVisible(true)
```

### Serveur

```lua
-- Récupérer les données HUD d'un joueur
local hudData = exports['z_hud']:getPlayerHudData(playerId)
```

## 🎯 Intégration avec d'autres ressources

### esx_status

```lua
-- Le script écoute automatiquement les événements esx_status
-- Pas besoin de code supplémentaire côté client

-- Les statuts sont mis à jour en temps réel via :
-- - esx_status:onTick (mise à jour périodique)
-- - esx_status:set (changement de statut)
```

### esx_basicneeds

```lua
if GetResourceState('esx_basicneeds') == 'started' then
    local hunger = exports['esx_basicneeds']:getStatus('hunger')
    local thirst = exports['esx_basicneeds']:getStatus('thirst')
end
```

## 🚨 Dépannage

### HUD ne s'affiche pas
1. Vérifiez que ESX est démarré
2. Vérifiez les erreurs dans la console
3. Appuyez sur F1 pour afficher/masquer

### Données non mises à jour
1. Vérifiez la console client
2. Vérifiez que les exports sont corrects
3. Redémarrez la ressource

### Problèmes avec esx_status
1. **Vérifiez que esx_status est démarré** : `ensure esx_status` dans server.cfg
2. **Vérifiez la configuration** : Les statuts doivent être enregistrés avec `esx_status:registerStatus`
3. **Vérifiez les événements** : Le script écoute `esx_status:onTick`, `esx_status:set`, `esx_status:add` et `esx_status:remove`
4. **Conversion des valeurs** : esx_status utilise des valeurs brutes (ex: 1000000 = 100%), le script convertit automatiquement
5. **Vérification périodique** : Le script vérifie les statuts toutes les 5 secondes pour s'assurer qu'ils sont à jour

## 🔧 Optimisations Techniques

### Performance
- **Mise à jour optimisée** : Vérification des données toutes les secondes
- **Gestion intelligente des événements** : Écoute des changements ESX uniquement
- **Cache local** : Stockage des données pour éviter les appels répétés
- **Fonctions modulaires** : `updateHUD()` et `finalizePlayerData()` pour une meilleure organisation
- **Interface simplifiée** : Pas de menu de configuration, performance maximale

### ESX Legacy Best Practices
- **`ESX.IsPlayerLoaded()`** : Vérification correcte du chargement du joueur
- **`ESX.GetAccount()`** : Récupération optimisée des comptes bancaires
- **Gestion des événements** : Mise à jour immédiate du HUD lors des changements
- **Vérification des données** : Contrôle de l'existence des données avant utilisation

## 📈 Performance

- **Mise à jour** : Toutes les secondes (configurable)
- **Animations** : CSS optimisées avec GPU
- **Mémoire** : Gestion automatique des événements
- **Réseau** : Communication minimale client-serveur
- **Interface** : Pas de menu de configuration, chargement plus rapide

## 🤝 Support

Pour toute question ou problème :
1. Vérifiez la documentation
2. Consultez les logs serveur
3. Vérifiez la console client

## 📄 Licence

Ce script est fourni "tel quel" pour un usage personnel et serveur privé.

---

**Développé par Z-Forge** - Script HUD moderne pour FiveM
