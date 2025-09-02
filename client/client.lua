local ESX = exports["es_extended"]:getSharedObject()
local PlayerData = {}
local isHudVisible = true

-- Variables pour les statuts
local hunger = 100
local thirst = 100
local stress = 0

-- Initialisation
Citizen.CreateThread(function()
    -- Attendre que le joueur soit complètement chargé
    while not ESX.IsPlayerLoaded() do
        Citizen.Wait(100)
    end
    
    -- Récupérer les données du joueur
    PlayerData = ESX.GetPlayerData()
    
    -- Récupérer les comptes bancaires avec ESX.GetAccount
    local moneyAccount = ESX.GetAccount('money')
    local bankAccount = ESX.GetAccount('bank')
    
    if moneyAccount then
        PlayerData.money = moneyAccount.money
    end
    
    if bankAccount then
        PlayerData.bank = bankAccount.money
    end
    
    -- Récupérer les statuts initiaux si esx_status est disponible
    if GetResourceState('esx_status') == 'started' then
        Citizen.Wait(1000) -- Attendre que esx_status soit prêt
        
        -- Récupérer tous les statuts
        TriggerEvent('esx_status:getAllStatus', function(statuses)
            if statuses then
                for i = 1, #statuses do
                    local status = statuses[i]
                    if status.name == 'hunger' then
                        hunger = status.val / 10000
                    elseif status.name == 'thirst' then
                        thirst = status.val / 10000
                    elseif status.name == 'stress' then
                        stress = status.val / 10000
                    end
                end
            end
        end)
    end
    
    -- Envoyer la configuration au HUD
    Citizen.Wait(500)
    sendConfigToHUD()
    
    -- Première mise à jour du HUD
    Citizen.Wait(100)
    updateHUD()
    
    -- Vérification finale après 2 secondes
    Citizen.Wait(2000)
    finalizePlayerData()
end)

-- Fonction pour mettre à jour le HUD
function updateHUD()
    if not PlayerData.job then return end
    
    local playerPed = PlayerPedId()
    local health = GetEntityHealth(playerPed) - 100
    local armor = GetPedArmour(playerPed)
    
    SendNUIMessage({
        type = 'updateHUD',
        data = {
            health = health,
            armor = armor,
            hunger = hunger,
            thirst = thirst,
            stress = stress,
            job = PlayerData.job.label,
            jobGrade = PlayerData.job.grade_label,
            money = PlayerData.money or 0,
            bank = PlayerData.bank or 0,
            id = PlayerData.identifier
        }
    })
end

-- Fonction pour envoyer la configuration au HUD
function sendConfigToHUD()
    SendNUIMessage({
        type = 'updateConfig',
        config = {
            themeColor = CFG.themeColor,
            elements = CFG.elements,
            playerInfo = CFG.playerInfo,
            blinkOnZero = CFG.blinkOnZero,
            warnOnLow = CFG.warnOnLow
        }
    })
end

-- Fonction pour finaliser les données du joueur
function finalizePlayerData()
    -- Récupérer les données finales
    local finalPlayerData = ESX.GetPlayerData()
    local finalMoneyAccount = ESX.GetAccount('money')
    local finalBankAccount = ESX.GetAccount('bank')
    
    if finalPlayerData and finalPlayerData.job then
        PlayerData.job = finalPlayerData.job
    end
    
    if finalMoneyAccount then
        PlayerData.money = finalMoneyAccount.money
    end
    
    if finalBankAccount then
        PlayerData.bank = finalBankAccount.money
    end
    
    -- Mise à jour finale du HUD
    updateHUD()
end

-- Mise à jour des données du joueur
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(CFG.updateInterval)
        
        if PlayerData.job then
            updateHUD()
        end
    end
end)

-- Gestion des touches
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        if IsControlJustPressed(0, CFG.keybind) then
            isHudVisible = not isHudVisible
            SendNUIMessage({
                type = 'toggleHUD',
                visible = isHudVisible
            })
        end
    end
end)

-- Événements ESX
RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(xPlayer)
    PlayerData = xPlayer
    
    -- Mettre à jour les comptes bancaires
    local moneyAccount = ESX.GetAccount('money')
    local bankAccount = ESX.GetAccount('bank')
    
    if moneyAccount then
        PlayerData.money = moneyAccount.money
    end
    
    if bankAccount then
        PlayerData.bank = bankAccount.money
    end
    
    -- Mise à jour immédiate du HUD
    updateHUD()
end)

RegisterNetEvent('esx:setJob')
AddEventHandler('esx:setJob', function(job)
    PlayerData.job = job
    updateHUD()
end)

RegisterNetEvent('esx:setAccountMoney')
AddEventHandler('esx:setAccountMoney', function(account)
    if account.name == 'money' then
        PlayerData.money = account.money
    elseif account.name == 'bank' then
        PlayerData.bank = account.money
    end
    
    -- Mise à jour immédiate du HUD
    updateHUD()
end)

-- Événement pour forcer la mise à jour de l'argent
RegisterNetEvent('z_hud:updateMoney')
AddEventHandler('z_hud:updateMoney', function()
    -- Récupérer les comptes bancaires actuels
    local moneyAccount = ESX.GetAccount('money')
    local bankAccount = ESX.GetAccount('bank')
    
    if moneyAccount then
        PlayerData.money = moneyAccount.money
    end
    
    if bankAccount then
        PlayerData.bank = bankAccount.money
    end

    updateHUD()
end)

-- Événement pour réinitialiser le HUD
RegisterNetEvent('z_hud:reset')
AddEventHandler('z_hud:reset', function()
    resetHUD()
end)

-- Événement pour forcer la visibilité du HUD
RegisterNetEvent('z_hud:setVisible')
AddEventHandler('z_hud:setVisible', function(visible)
    isHudVisible = visible
    SendNUIMessage({
        type = 'toggleHUD', 
        visible = isHudVisible
    })
end)

-- Fonction pour réinitialiser le HUD
function resetHUD()
    -- Remettre les barres à 0% pour forcer l'animation
    if elements.healthBar then elements.healthBar.style.height = '0%' end
    if elements.armorBar then elements.armorBar.style.height = '0%' end
    if elements.hungerBar then elements.hungerBar.style.height = '0%' end
    if elements.thirstBar then elements.thirstBar.style.height = '0%' end
    
    -- Réinitialiser les données
    hunger = 100
    thirst = 100
    stress = 0
    
    -- Mise à jour immédiate du HUD
    updateHUD()
end

-- Événements esx_status pour les statuts
if GetResourceState('esx_status') == 'started' then
    -- Écouter les mises à jour des statuts
    AddEventHandler('esx_status:onTick', function(statuses)
        for i = 1, #statuses do
            local status = statuses[i]
            if status.name == 'hunger' then
                hunger = status.val / 10000 -- Convertir au pourcentage
            elseif status.name == 'thirst' then
                thirst = status.val / 10000 -- Convertir au pourcentage
            elseif status.name == 'stress' then
                stress = status.val / 10000 -- Convertir au pourcentage
            end
        end
    end)
    
    -- Écouter les changements de statuts
    AddEventHandler('esx_status:set', function(name, val)
        if name == 'hunger' then
            hunger = val / 10000
        elseif name == 'thirst' then
            thirst = val / 10000
        elseif name == 'stress' then
            stress = val / 10000
        end
    end)
    
    -- Écouter les ajouts de statuts
    AddEventHandler('esx_status:add', function(name, val)
        if name == 'hunger' then
            hunger = math.min(100, hunger + (val / 10000))
        elseif name == 'thirst' then
            thirst = math.min(100, thirst + (val / 10000))
        elseif name == 'stress' then
            stress = math.min(100, stress + (val / 10000))
        end
    end)
    
    -- Écouter les suppressions de statuts
    AddEventHandler('esx_status:remove', function(name, val)
        if name == 'hunger' then
            hunger = math.max(0, hunger - (val / 10000))
        elseif name == 'thirst' then
            thirst = math.max(0, thirst - (val / 10000))
        elseif name == 'stress' then
            stress = math.max(0, stress - (val / 10000))
        end
    end)
    
    -- Thread de vérification périodique des statuts
    Citizen.CreateThread(function()
        while true do
            Citizen.Wait(5000) -- Vérifier toutes les 5 secondes
            
            -- Récupérer tous les statuts pour s'assurer qu'ils sont à jour
            TriggerEvent('esx_status:getAllStatus', function(statuses)
                if statuses then
                    for i = 1, #statuses do
                        local status = statuses[i]
                        if status.name == 'hunger' then
                            hunger = status.val / 10000
                        elseif status.name == 'thirst' then
                            thirst = status.val / 10000
                        elseif status.name == 'stress' then
                            stress = status.val / 10000
                        end
                    end
                end
            end)
        end
    end)
end



-- Export pour d'autres ressources
exports('setHudVisible', function(visible)
    isHudVisible = visible
    SendNUIMessage({
        type = 'toggleHUD',
        visible = isHudVisible
    })
end)
