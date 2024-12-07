Healthbar = {}; 

ESX = exports.es_extended:getSharedObject();

function Healthbar:load()
    while not ESX.IsPlayerLoaded() do 
        Citizen.Wait(250)
    end

    local values = {
        voice = false, 
        health = 0, 
        armor = 0, 
        hunger = 0, 
        thirst = 0
    }

    local playerPed = PlayerPedId()

    AddEventHandler("esx_status:onTick", function(data)
        local hunger, thirst

        for i = 1, #data do
            if data[i].name == "thirst" then
                thirst = math.floor(data[i].percent)
            end
            if data[i].name == "hunger" then
                hunger = math.floor(data[i].percent)
            end
        end

        values.healthBar = math.floor((GetEntityHealth(playerPed) - 100) / (GetEntityMaxHealth(playerPed) - 100) * 100)
        values.armor = GetPedArmour(playerPed)
        values.thirst = thirst

        values.hunger = hunger; 

        SendNUIMessage({
            event = 'updateStatus', 
            data = {
                voice = MumbleIsPlayerTalking(PlayerId()), 
                health = values.healthBar, 
                armor = values.armor,
                hunger = values.hunger,
                thirst = values.thirst,
            }
        })     
    end)
end