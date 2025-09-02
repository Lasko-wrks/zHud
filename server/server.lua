local ESX = exports["es_extended"]:getSharedObject()



-- Événement de déconnexion
AddEventHandler('playerDropped', function(reason)
    -- Nettoyage si nécessaire
end)

-- Commande pour Afficher/Masquer le HUD
ESX.RegisterCommand(CFG.command, 'user', function(xPlayer, args, showError)
    TriggerClientEvent('z_hud:setVisible', xPlayer.source)
end, false, {help = 'Afficher/Masquer le HUD'})
-- Export pour d'autres ressources
exports('getPlayerHudData', function(playerId)
    local xPlayer = ESX.GetPlayerFromId(playerId)
    if xPlayer then
        return {
            job = xPlayer.job,
            money = xPlayer.getMoney(),
            bank = xPlayer.getAccount('bank').money,
            identifier = xPlayer.identifier
        }
    end
    return nil
end)
