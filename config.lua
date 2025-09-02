CFG = {}

CFG = {
    -- ===========================================
    -- CONFIGURATION GÉNÉRALE
    -- ===========================================
    
    -- Contrôles
    keybind = 288, -- F1
    command = 'hud',
    updateInterval = 1000, -- Mise à jour toutes les secondes
    
    -- ===========================================
    -- COULEUR DU THÈME
    -- ===========================================
    
    themeColor = '#00FFAD', -- Couleur principale du thème (remplace tous les #00FFAD)
    alertColor = '#ff0000', -- Couleur de l'alerte
    
    -- ===========================================
    -- ÉLÉMENTS À AFFICHER
    -- ===========================================
    
    -- HUD Principal (statistiques)
    elements = {
        health = true,    -- Barre de vie
        armor = true,     -- Barre d'armure
        hunger = true,    -- Barre de faim
        thirst = true     -- Barre de soif
    },
    
    -- HUD Informations joueur
    playerInfo = {
        job = true,       -- Métier
        money = true,     -- Argent liquide
        bank = true       -- Argent en banque
    },
    
    -- ===========================================
    -- SEUILS D'ALERTE
    -- ===========================================
    
    -- Clignotement quand l'élément atteint 0
    blinkOnZero = {
        health = true,    -- Clignoter quand vie = 0
        armor = false,     -- Clignoter quand armure = 0
        hunger = true,    -- Clignoter quand faim = 0
        thirst = true     -- Clignoter quand soif = 0
    },
    
    -- Warning quand l'élément atteint un seuil (clignote)
    warnOnLow = {
        enabled = {
            health = true,    -- Activer le warning pour la vie
            armor = true,     -- Activer le warning pour l'armure
            hunger = true,    -- Activer le warning pour la faim
            thirst = true    -- Activer le warning pour la soif
        },
        pourcent = 10        -- Seuil en pourcentage (défaut: 10%)
    },
    
    -- ===========================================
    -- HUD DE BASE SOUS LA MINIMAP
    -- ===========================================
    
    -- Désactiver le HUD de base de GTA (sous la minimap)
    disableDefaultHUD = {
        health = true,    -- Masquer la barre de vie de base
        armor = true,     -- Masquer la barre d'armure de base
        ability = true,   -- Masquer la barre d'habileté de base
        air = true        -- Masquer la barre d'air de base
    }
}