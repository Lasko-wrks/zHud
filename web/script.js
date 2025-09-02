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
    // Initialiser les icônes Lucide
    lucide.createIcons();
    
    setupEventListeners();
});

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
    const { type, data, visible } = event.data;
    
    switch (type) {
        case 'updateHUD':
            updateHUD(data);
            break;
            
        case 'toggleHUD':
            toggleHUD(visible);
            break;
            

            
        case 'reset':
            resetHUD();
            break;
            
        default:
            console.log('Message NUI non reconnu:', type);
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
            barElement.style.height = `${clampedValue}%`;
        }, 1000);
    } else {
        // Pour les mises à jour suivantes, utiliser la transition CSS
        barElement.style.height = `${clampedValue}%`;
    }
    
    // Mettre à jour la valeur affichée
    valueElement.textContent = Math.round(clampedValue);
    
    // Ajouter des classes CSS pour les états spéciaux
    const square = barElement.closest('.stat-square');
    if (square) {
        square.classList.remove('low-health', 'critical-health');
        
        if (type === 'health') {
            if (clampedValue <= 20) {
                square.classList.add('critical-health');
            } else if (clampedValue <= 50) {
                square.classList.add('low-health');
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
