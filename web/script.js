// Variables globales
let hudData = {
    health: 100,
    armor: 0,
    hunger: 100,
    thirst: 100,
    stress: 0,
    job: 'Chômeur',
    jobGrade: '',
    money: 0,
    bank: 0,
    id: ''
};

// Configuration par défaut
let config = {
    themeColor: 'transparent',
    elements: {
        health: true,
        armor: true,
        hunger: true,
        thirst: true
    },
    playerInfo: {
        job: true,
        money: true,
        bank: true
    },
    blinkOnZero: {
        health: true,
        armor: true,
        hunger: true,
        thirst: true
    },
    warnOnLow: {
        health: true,
        armor: true,
        hunger: true,
        thirst: true
    }
};



// Éléments DOM
const elements = {
    hud: document.getElementById('hud'),
    healthBar: document.getElementById('healthBar'),
    healthValue: document.getElementById('healthValue'),
    armorBar: document.getElementById('armorBar'),
    armorValue: document.getElementById('armorValue'),
    hungerBar: document.getElementById('hungerBar'),
    hungerValue: document.getElementById('hungerValue'),
    thirstBar: document.getElementById('thirstBar'),
    thirstValue: document.getElementById('thirstValue'),
    jobInfo: document.getElementById('jobInfo'),
    moneyInfo: document.getElementById('moneyInfo'),
    bankInfo: document.getElementById('bankInfo')
};

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Masquer immédiatement tous les éléments avant l'initialisation
    hideAllElements();
    
    // Initialiser les icônes Lucide
    lucide.createIcons();
    
    // Appliquer la configuration par défaut
    applyConfigToCSS();
    
    // Afficher seulement les éléments activés
    toggleElements();
    
    // Animation d'apparition progressive
    fadeInHUD();
    
    setupEventListeners();
});

// Masquer tous les éléments au démarrage
function hideAllElements() {
    const allSquares = document.querySelectorAll('.stat-square');
    const allInfoItems = document.querySelectorAll('.info-item');
    const statsContainer = document.querySelector('.stats-container');
    const playerInfoContainer = document.querySelector('.player-info');
    
    // Masquer tous les carrés de statistiques
    allSquares.forEach(square => {
        square.style.opacity = '0';
        square.style.transform = 'scale(0.8)';
    });
    
    // Masquer tous les éléments d'information
    allInfoItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
    });
    
    // Masquer les conteneurs
    if (statsContainer) statsContainer.style.opacity = '0';
    if (playerInfoContainer) playerInfoContainer.style.opacity = '0';
}

// Animation d'apparition progressive
function fadeInHUD() {
    const statsContainer = document.querySelector('.stats-container');
    const playerInfoContainer = document.querySelector('.player-info');
    
    // Apparition du conteneur des statistiques
    if (statsContainer && statsContainer.style.display !== 'none') {
        statsContainer.style.transition = 'opacity 0.5s ease-out';
        statsContainer.style.opacity = '1';
        
        // Apparition progressive des carrés
        const visibleSquares = statsContainer.querySelectorAll('.stat-square[style*="display: flex"]');
        visibleSquares.forEach((square, index) => {
            setTimeout(() => {
                square.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
                square.style.opacity = '1';
                square.style.transform = 'scale(1)';
            }, 100 + (index * 100));
        });
    }
    
    // Apparition du conteneur des informations joueur
    if (playerInfoContainer && playerInfoContainer.style.display !== 'none') {
        playerInfoContainer.style.transition = 'opacity 0.5s ease-out';
        playerInfoContainer.style.opacity = '1';
        
        // Apparition progressive des éléments d'information
        const visibleInfoItems = playerInfoContainer.querySelectorAll('.info-item[style*="display: flex"]');
        visibleInfoItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 200 + (index * 100));
        });
    }
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
    // Écoute des messages NUI depuis Lua
    window.addEventListener('message', handleNuiMessage);
    
    // Écoute des clics sur le HUD
    elements.hud.addEventListener('click', function(e) {
        if (e.target.closest('.hud-section')) {
            // Permet l'interaction avec le HUD
        }
    });
}

// Gestion des messages NUI depuis Lua
function handleNuiMessage(event) {
    const { type, data, visible, config: newConfig } = event.data;
    
    switch (type) {
        case 'updateHUD':
            updateHUD(data);
            break;
            
        case 'toggleHUD':
            toggleHUD(visible);
            break;
            
        case 'updateConfig':
            updateConfig(newConfig);
            break;
            
        case 'reset':
            resetHUD();
            break;
            
        default:
            console.log('Message NUI non reconnu:', type);
    }
}

// Mise à jour de la configuration
function updateConfig(newConfig) {
    if (newConfig) {
        config = { ...config, ...newConfig };
        applyConfigToCSS();
        
        // Réinitialiser l'état des warnings si la configuration change
        resetWarningState();
    }
}

// Réinitialiser l'état des warnings
function resetWarningState() {
    // Retirer tous les warnings actifs
    const allSquares = document.querySelectorAll('.stat-square');
    allSquares.forEach(square => {
        square.classList.remove('warn-low', 'zero-health', 'zero-armor', 'zero-hunger', 'zero-thirst');
    });
}

// Application de la configuration aux variables CSS
function applyConfigToCSS() {
    const root = document.documentElement;
    
    // Couleur du thème
    root.style.setProperty('--theme-color', config.themeColor);
    
    // Masquer/afficher les éléments selon la configuration
    toggleElements();
}

// Fonction pour masquer/afficher les éléments selon la configuration
function toggleElements() {
    // HUD Principal avec transitions
    const healthSquare = elements.healthBar ? elements.healthBar.closest('.health-square') : null;
    const armorSquare = elements.armorBar ? elements.armorBar.closest('.armor-square') : null;
    const hungerSquare = elements.hungerBar ? elements.hungerBar.closest('.hunger-square') : null;
    const thirstSquare = elements.thirstBar ? elements.thirstBar.closest('.thirst-square') : null;
    
    // Appliquer les changements avec transitions
    if (healthSquare) {
        healthSquare.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
        if (config.elements.health) {
            healthSquare.style.display = 'flex';
            setTimeout(() => {
                healthSquare.style.opacity = '1';
                healthSquare.style.transform = 'scale(1)';
            }, 10);
        } else {
            healthSquare.style.opacity = '0';
            healthSquare.style.transform = 'scale(0.8)';
            setTimeout(() => {
                healthSquare.style.display = 'none';
            }, 300);
        }
    }
    
    if (armorSquare) {
        armorSquare.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
        if (config.elements.armor) {
            armorSquare.style.display = 'flex';
            setTimeout(() => {
                armorSquare.style.opacity = '1';
                armorSquare.style.transform = 'scale(1)';
            }, 10);
        } else {
            armorSquare.style.opacity = '0';
            armorSquare.style.transform = 'scale(0.8)';
            setTimeout(() => {
                armorSquare.style.display = 'none';
            }, 300);
        }
    }
    
    if (hungerSquare) {
        hungerSquare.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
        if (config.elements.hunger) {
            hungerSquare.style.display = 'flex';
            setTimeout(() => {
                hungerSquare.style.opacity = '1';
                hungerSquare.style.transform = 'scale(1)';
            }, 10);
        } else {
            hungerSquare.style.opacity = '0';
            hungerSquare.style.transform = 'scale(0.8)';
            setTimeout(() => {
                hungerSquare.style.display = 'none';
            }, 300);
        }
    }
    
    if (thirstSquare) {
        thirstSquare.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
        if (config.elements.thirst) {
            thirstSquare.style.display = 'flex';
            setTimeout(() => {
                thirstSquare.style.opacity = '1';
                thirstSquare.style.transform = 'scale(1)';
            }, 10);
        } else {
            thirstSquare.style.opacity = '0';
            thirstSquare.style.transform = 'scale(0.8)';
            setTimeout(() => {
                thirstSquare.style.display = 'none';
            }, 300);
        }
    }
    
    // HUD Informations joueur avec transitions
    const jobItem = elements.jobInfo ? elements.jobInfo.closest('.info-item') : null;
    const moneyItem = elements.moneyInfo ? elements.moneyInfo.closest('.info-item') : null;
    const bankItem = elements.bankInfo ? elements.bankInfo.closest('.info-item') : null;
    
    if (jobItem) {
        jobItem.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
        if (config.playerInfo.job) {
            jobItem.style.display = 'flex';
            setTimeout(() => {
                jobItem.style.opacity = '1';
                jobItem.style.transform = 'translateX(0)';
            }, 10);
        } else {
            jobItem.style.opacity = '0';
            jobItem.style.transform = 'translateX(20px)';
            setTimeout(() => {
                jobItem.style.display = 'none';
            }, 300);
        }
    }
    
    if (moneyItem) {
        moneyItem.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
        if (config.playerInfo.money) {
            moneyItem.style.display = 'flex';
            setTimeout(() => {
                moneyItem.style.opacity = '1';
                moneyItem.style.transform = 'translateX(0)';
            }, 10);
        } else {
            moneyItem.style.opacity = '0';
            moneyItem.style.transform = 'translateX(20px)';
            setTimeout(() => {
                moneyItem.style.display = 'none';
            }, 300);
        }
    }
    
    if (bankItem) {
        bankItem.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
        if (config.playerInfo.bank) {
            bankItem.style.display = 'flex';
            setTimeout(() => {
                bankItem.style.opacity = '1';
                bankItem.style.transform = 'translateX(0)';
            }, 10);
        } else {
            bankItem.style.opacity = '0';
            bankItem.style.transform = 'translateX(20px)';
            setTimeout(() => {
                bankItem.style.display = 'none';
            }, 300);
        }
    }
    
    // Masquer complètement le conteneur stats-container si tous les éléments sont désactivés
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        const hasVisibleStats = config.elements.health || config.elements.armor || config.elements.hunger || config.elements.thirst;
        statsContainer.style.transition = 'opacity 0.5s ease-out';
        if (hasVisibleStats) {
            statsContainer.style.display = 'flex';
            setTimeout(() => {
                statsContainer.style.opacity = '1';
            }, 10);
        } else {
            statsContainer.style.opacity = '0';
            setTimeout(() => {
                statsContainer.style.display = 'none';
            }, 500);
        }
    }
    
    // Masquer complètement le conteneur player-info si tous les éléments sont désactivés
    const playerInfoContainer = document.querySelector('.player-info');
    if (playerInfoContainer) {
        const hasVisibleElements = config.playerInfo.job || config.playerInfo.money || config.playerInfo.bank;
        playerInfoContainer.style.transition = 'opacity 0.5s ease-out';
        if (hasVisibleElements) {
            playerInfoContainer.style.display = 'block';
            setTimeout(() => {
                playerInfoContainer.style.opacity = '1';
            }, 10);
        } else {
            playerInfoContainer.style.opacity = '0';
            setTimeout(() => {
                playerInfoContainer.style.display = 'none';
            }, 500);
        }
    }
}

// Mise à jour du HUD
function updateHUD(data) {
    hudData = { ...hudData, ...data };
    
    // Mise à jour des barres
    updateBar(elements.healthBar, elements.healthValue, data.health, 'health');
    updateBar(elements.armorBar, elements.armorValue, data.armor, 'armor');
    updateBar(elements.hungerBar, elements.hungerValue, data.hunger, 'hunger');
    updateBar(elements.thirstBar, elements.thirstValue, data.thirst, 'thirst');
    
    // Mise à jour des informations
    elements.jobInfo.textContent = `${data.job}${data.jobGrade ? ` - ${data.jobGrade}` : ''}`;
    elements.moneyInfo.textContent = `${formatNumber(data.money)} $`;
    elements.bankInfo.textContent = `${formatNumber(data.bank)} $`;
}

// Mise à jour d'une barre
function updateBar(barElement, valueElement, value, type) {
    if (!barElement || !valueElement) return;
    
    // Limiter la valeur entre 0 et 100
    const clampedValue = Math.max(0, Math.min(100, value));
    
    // Vérifier si c'est la première initialisation ou si l'animation est forcée
    const isFirstUpdate = !barElement.style.height || barElement.style.height === '0%';
    const isForcedAnimation = barElement.classList.contains('force-animation');
    
    if (isFirstUpdate || isForcedAnimation) {
        // Pour l'initialisation ou l'animation forcée, utiliser l'animation CSS
        barElement.style.setProperty('--target-height', `${clampedValue}%`);
        barElement.classList.add('initializing');
        barElement.classList.remove('force-animation');
        
        // Retirer la classe après l'animation
        setTimeout(() => {
            barElement.classList.remove('initializing');
            if (clampedValue <= 0) {
                barElement.style.height = '0%';
                barElement.style.display = 'none';
            } else {
                barElement.style.height = `${clampedValue}%`;
                barElement.style.display = 'block';
            }
        }, 1000);
    } else {
        // Pour les mises à jour suivantes, utiliser la transition CSS
        if (clampedValue <= 0) {
            barElement.style.height = '0%';
            barElement.style.display = 'none';
        } else {
            barElement.style.height = `${clampedValue}%`;
            barElement.style.display = 'block';
        }
    }
    
    // Mettre à jour la valeur affichée
    valueElement.textContent = Math.round(clampedValue);
    
    // Ajouter des classes CSS pour les états spéciaux
    const square = barElement.closest('.stat-square');
    if (square) {
        square.classList.remove('low-health', 'critical-health', 'zero-health', 'zero-hunger', 'zero-thirst', 'zero-armor', 'warn-low');
        
        if (type === 'health') {
            if (clampedValue <= 0 && config.blinkOnZero.health) {
                square.classList.add('zero-health');
            } else if (clampedValue <= 10 && clampedValue > 0 && config.warnOnLow.health) {
                square.classList.add('warn-low');
            }
        } else if (type === 'armor') {
            if (clampedValue <= 0 && config.blinkOnZero.armor) {
                square.classList.add('zero-armor');
            } else if (clampedValue <= 10 && clampedValue > 0 && config.warnOnLow.armor) {
                square.classList.add('warn-low');
            }
        } else if (type === 'hunger') {
            if (clampedValue <= 0 && config.blinkOnZero.hunger) {
                square.classList.add('zero-hunger');
            } else if (clampedValue <= 10 && clampedValue > 0 && config.warnOnLow.hunger) {
                square.classList.add('warn-low');
            }
        } else if (type === 'thirst') {
            if (clampedValue <= 0 && config.blinkOnZero.thirst) {
                square.classList.add('zero-thirst');
            } else if (clampedValue <= 10 && clampedValue > 0 && config.warnOnLow.thirst) {
                square.classList.add('warn-low');
            }
        }
    }
}

// Affichage/masquage du HUD
function toggleHUD(visible) {
    if (visible !== undefined) {
        if (visible) {
            elements.hud.style.display = 'block';
            // Forcer l'animation de remplissage lors de la réouverture
            forceProgressAnimation();
        } else {
            elements.hud.style.display = 'none';
        }
    } else {
        const currentDisplay = elements.hud.style.display;
        if (currentDisplay === 'none') {
            elements.hud.style.display = 'block';
            // Forcer l'animation de remplissage lors de la réouverture
            forceProgressAnimation();
        } else {
            elements.hud.style.display = 'none';
        }
    }
}

// Forcer l'animation de remplissage des barres
function forceProgressAnimation() {
    // Ajouter la classe pour forcer l'animation
    if (elements.healthBar) elements.healthBar.classList.add('force-animation');
    if (elements.armorBar) elements.armorBar.classList.add('force-animation');
    if (elements.hungerBar) elements.hungerBar.classList.add('force-animation');
    if (elements.thirstBar) elements.thirstBar.classList.add('force-animation');
    
    // Mettre à jour avec animation forcée
    updateHUD(hudData);
}

// Réinitialisation du HUD
function resetHUD() {
    // Remettre les barres à 0% pour forcer l'animation
    if (elements.healthBar) elements.healthBar.style.height = '0%';
    if (elements.armorBar) elements.armorBar.style.height = '0%';
    if (elements.hungerBar) elements.hungerBar.style.height = '0%';
    if (elements.thirstBar) elements.thirstBar.style.height = '0%';
    
    hudData = {
        health: 100,
        armor: 0,
        hunger: 100,
        thirst: 100,
        stress: 0,
        job: 'Chômeur',
        jobGrade: '',
        money: 0,
        bank: 0,
        id: ''
    };
    
    updateHUD(hudData);
}

// Formatage des nombres
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Export des fonctions pour utilisation externe
window.zHUD = {
    updateHUD,
    toggleHUD
};
