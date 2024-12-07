Citizen.CreateThread(function()
	AddEventHandler('status:loaded', function(status)
		TriggerEvent('status:registerStatus', 'hunger', 1000000, '#ff9900', function(status)
			return false
		end, function(status)
			status.remove(85)
		end)
	
		TriggerEvent('status:registerStatus', 'thirst', 1000000, '#00b7ff', function(status)
			return false
		end, function(status)
			status.remove(85)
		end)
	
		TriggerEvent('status:registerStatus', 'stress', 1000000, '#00b7ff', function(status)
				return false
			end,
			function(status)
				status.remove(100)
			end)
	
		Citizen.CreateThread(function()
			while true do
				local playerPed  = PlayerPedId()
				local prevHealth = GetEntityHealth(playerPed)
				local health     = prevHealth
	
				TriggerEvent('status:getStatus', 'hunger', function(status)
					if status.val == 0 then
						if prevHealth <= 150 then
							health = health - 5
						else
							health = health - 1
						end
					end
				end)
	
				TriggerEvent('status:getStatus', 'thirst', function(status)
					if status.val == 0 then
						if prevHealth <= 150 then
							health = health - 5
						else
							health = health - 1
						end
					end
				end)
	
				if health ~= prevHealth then
					SetEntityHealth(playerPed, health)
				end
	
				Citizen.Wait(1000)
			end
		end)
	end)
	
    Healthbar:load()
end)