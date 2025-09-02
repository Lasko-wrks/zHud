# Z-HUD - HUD moderne pour FiveM ESX Legacy

Un HUD élégant et configurable pour FiveM avec ESX Legacy.

## 👀 Aperçus

![HUD Principal](https://i.postimg.cc/nV372Rf8/Capture-d-cran-2025-09-03-010758.png)
![HUD Informations](https://i.postimg.cc/qMgK5spN/Capture-d-cran-2025-09-03-010832.png)
![HUD Complet](https://i.postimg.cc/m2q9fPr8/Capture-d-cran-2025-09-03-010854.png)

## 🚀 Fonctionnalités

- **Interface moderne** : Design épuré avec animations fluides
- **Statistiques visuelles** : Santé, armure, faim, soif avec barres de progression
- **Informations joueur** : Métier, argent, banque
- **Système d'alertes** : Clignotements pour les valeurs critiques
- **Configuration simple** : Personnalisation facile via `config.lua`
- **Performance optimisée** : Chargement fluide sans flashs

## 🎮 Contrôles

- **F1** : Afficher/Masquer le HUD

## 📁 Installation

1. **Télécharger** dans votre dossier `resources`
2. **Ajouter** `ensure z_hud` dans votre `server.cfg`
3. **Redémarrer** votre serveur

## 📋 Dépendances

- **ESX Legacy** (obligatoire)
- **esx_status** (optionnel - pour faim/soif)

## ⚙️ Configuration

Modifiez `config.lua` pour personnaliser le HUD :

```lua
CFG = {
    -- Couleur du thème
    themeColor = '#00FFAD',
    
    -- Éléments à afficher
    elements = {
        health = true,    -- Barre de vie
        armor = true,     -- Barre d'armure
        hunger = true,    -- Barre de faim
        thirst = true     -- Barre de soif
    },
    
    -- Informations joueur
    playerInfo = {
        job = true,       -- Métier
        money = true,     -- Argent liquide
        bank = true       -- Argent en banque
    },
    
    -- Alertes à 0%
    blinkOnZero = {
        health = true,    -- Clignotement quand vie = 0
        armor = true,     -- Clignotement quand armure = 0
        hunger = true,    -- Clignotement quand faim = 0
        thirst = true     -- Clignotement quand soif = 0
    },
    
    -- Alertes au seuil configuré
    warnOnLow = {
        enabled = {
            health = true,    -- Activer le warning pour la vie
            armor = true,     -- Activer le warning pour l'armure
            hunger = true,    -- Activer le warning pour la faim
            thirst = true    -- Activer le warning pour la soif
        },
        pourcent = 10        -- Seuil en pourcentage (défaut: 10%)
    },
    
    -- HUD de base sous la minimap
    disableDefaultHUD = false,   -- Désactiver le HUD de base de GTA (sous la minimap)
}
```

## 🎨 Personnalisation

### Couleur du thème
```lua
CFG.themeColor = '#FF6B6B'  -- Rouge corail
CFG.themeColor = '#4ECDC4'  -- Turquoise
CFG.themeColor = '#45B7D1'  -- Bleu
```

### Masquer des éléments
```lua
-- Masquer l'armure
CFG.elements.armor = false

-- Masquer les informations d'argent
CFG.playerInfo.money = false
CFG.playerInfo.bank = false
```

### Désactiver les alertes
```lua
-- Pas de clignotement à 0% pour la faim
CFG.blinkOnZero.hunger = false

-- Pas de warning pour l'armure
CFG.warnOnLow.enabled.armor = false

-- Changer le seuil de warning à 15%
CFG.warnOnLow.pourcent = 15
```

### Masquer le HUD de base
```lua
-- Désactiver complètement le HUD de base
CFG.disableDefaultHUD = true

-- Garder le HUD de base (défaut)
CFG.disableDefaultHUD = false
```

## 🔌 Exports

### Client
```lua
-- Masquer/Afficher le HUD
exports['z_hud']:setHudVisible(true)
```

## 🛠️ Commandes

- `/hud` - Masquer/Afficher le HUD

## 🎯 Système d'alertes

### Warning configurable
- Clignotement orange sans ombre
- Se déclenche quand la valeur passe sous le seuil défini (défaut: 10%)
- Seuil configurable via `CFG.warnOnLow.pourcent`
- S'arrête automatiquement à 0%

### Clignotement à 0%
- Clignotement avec la couleur du thème + ombre
- Se déclenche quand la valeur atteint 0%
- Priorité sur le warning

## 🚨 Dépannage

### HUD ne s'affiche pas
1. Vérifiez que ESX est démarré
2. Appuyez sur F1
3. Vérifiez la console client

### Données non mises à jour
1. Vérifiez que esx_status est démarré
2. Redémarrez la ressource

## 📄 Licence

Script fourni "tel quel" pour usage personnel et serveur privé.

---

**Développé par Z-Forge** - HUD moderne pour FiveM
