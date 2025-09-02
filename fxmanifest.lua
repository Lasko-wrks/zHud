fx_version 'cerulean'
game 'gta5'

author 'Z-Forge'
description 'HUD moderne et épuré pour ESX Legacy'
version '1.0.0'

shared_scripts {
    '@es_extended/imports.lua',
    'config.lua'
}

client_scripts {
    'client/client.lua'
}

server_scripts {
    'server/server.lua'
}

ui_page 'web/index.html'

files {
    'web/index.html',
    'web/style.css',
    'web/script.js'
}

dependencies {
    'es_extended',
    'esx_status'
}
