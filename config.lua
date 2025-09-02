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
    
    themeColor = '#ff0000', -- Couleur principale du thème (remplace tous les #00FFAD)
    
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
        armor = true,     -- Clignoter quand armure = 0
        hunger = true,    -- Clignoter quand faim = 0
        thirst = true     -- Clignoter quand soif = 0
    },
    
    -- Warning quand l'élément atteint 10% (clignote)
    warnOnLow = {
        health = true,    -- Warning quand vie = 10%
        armor = true,     -- Warning quand armure = 10%
        hunger = true,    -- Warning quand faim = 10%
        thirst = true     -- Warning quand soif = 10%
    }
}