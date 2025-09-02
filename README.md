# Z-HUD - HUD moderne pour FiveM ESX Legacy

Un HUD élégant et configurable pour FiveM avec ESX Legacy.

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
    
    -- Alertes à 10%
    warnOnLow = {
        health = true,    -- Warning quand vie = 10%
        armor = true,     -- Warning quand armure = 10%
        hunger = true,    -- Warning quand faim = 10%
        thirst = true     -- Warning quand soif = 10%
    }
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

-- Pas de warning à 10% pour l'armure
CFG.warnOnLow.armor = false
```

## 🔌 Exports

### Client
```lua
-- Masquer/Afficher le HUD
exports['z_hud']:setHudVisible(true)
```

## 🛠️ Commandes

- `/hud` - Réinitialiser le HUD
- `/hudmoney` - Forcer la mise à jour de l'argent

## 🎯 Système d'alertes

### Warning à 10%
- Clignotement orange sans ombre
- Se déclenche quand la valeur passe sous 10%
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
