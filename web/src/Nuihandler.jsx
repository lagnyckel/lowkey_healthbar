const NuiCache = new Map();

export const registerNui = (data) => {
  const { event, callback } = data;

  if (NuiCache.has(event)) {
    return 
  }

  NuiCache.set(event, callback);
};

function triggerNui(data) {
  if (!NuiCache.has(data.event)) {
    return 
  }

  const callback = NuiCache.get(data.event);

  if (typeof callback !== 'function') {
    return 
  }

  callback(data.data);
}

export const Listener = () => {
  window.addEventListener('message', (event) => {
    const data = event.data;

    if (!data.event) {
      return;
    }

    triggerNui(data);
  });

  return null;
};

export const emitNet = (eventName, data, useServer, callback) => {
  fetch(`https://${GetParentResourceName()}/lowkey_healthbar:eventHandler`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
          args: data, 
          eventName: eventName, 
          useServer: useServer
      })
  }).then(resp => resp.json()).then(resp => callback(resp));
}