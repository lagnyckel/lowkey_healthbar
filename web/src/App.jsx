import { useState, useEffect } from "react";

import './App.css'; 
import { registerNui, emitNet } from './Nuihandler.jsx';

import Icon from '@mdi/react';
import { mdiMicrophone, mdiMicrophoneOff, mdiHeart, mdiShield, mdiFood, mdiCup } from '@mdi/js';

const App = () => {
    const [display, setDisplay] = useState(false);
    const [status, setStatus] = useState(null);

    const getClass = (procent) => {
        procent = parseInt(procent);

        if (procent <= 20) return 'text-red-500 animate-blink-animation';
        if (procent <= 40) return 'text-yellow-500 animate-blink-animation';
        if (procent <= 60) return 'text-yellow-300';
        if (procent <= 80) return 'text-white-300';
        
        return 'bg-primary text-foreground';
    };

    const getBackgroundStyle = (procent) => {
        return {
            height: `${procent}%`,
        };
    };

    useEffect(() => {
        registerNui({
            event: 'updateStatus',
            callback: (data) => {
                if (!display) setDisplay(true);

                setStatus(data);
            }
        })
    });

    return (
        <>
            {display && (
                <div>
                    <div className="flex justify-end items-start flex-col min-h-screen p-2">
                        <div className="bg-primary text-foreground w-[38px] h-[38px] flex justify-center items-center rounded-[20%]">
                            <span>
                               <Icon 
                                    path={status.voice ? mdiMicrophone : mdiMicrophoneOff } 
                                    size={1} 
                                    className="text-white"
                                />
                            </span>
                        </div>

                        <div className="relative w-[38px] h-[38px] mt-2 flex justify-center items-center rounded-[20%] bg-gray-700">
                            <div className="absolute bottom-0 left-0 w-full bg-primary rounded-[20%]" style={getBackgroundStyle(status.health)}></div>
                            <Icon
                                className={`relative z-10 ${getClass(status.health)}`}
                                path={mdiHeart} 
                                size={1}
                            />
                        </div>

                        {status.armor > 0 && (
                            <div className="relative w-[38px] h-[38px] mt-2 flex justify-center items-center rounded-[20%] bg-gray-700">
                                <div className="absolute bottom-0 left-0 w-full bg-primary rounded-[20%] rounded-b-[20%]" style={getBackgroundStyle(status.armor)}></div>
                                <Icon
                                    className={`relative z-10 ${getClass(status.armor)}`}
                                    path={mdiShield} 
                                    size={1}
                                />
                            </div>
                        )}

                        <div className="relative w-[38px] h-[38px] mt-2 flex justify-center items-center rounded-[20%] bg-gray-700">
                            <div className="absolute bottom-0 left-0 w-full bg-primary rounded-[20%] rounded-b-[20%]" style={getBackgroundStyle(status.hunger)}></div>
                            <Icon
                                className={`relative z-10 ${getClass(status.hunger)}`}
                                path={mdiFood} 
                                size={1}
                            />
                        </div>

                        <div className="relative w-[38px] h-[38px] mt-2 flex justify-center items-center rounded-[20%] bg-gray-700">
                            <div className="absolute bottom-0 left-0 w-full bg-primary rounded-[20%] rounded-b-[20%]" style={getBackgroundStyle(status.thirst)}></div>
                            <Icon
                                className={`relative z-10 ${getClass(status.thirst)}`}
                                path={mdiCup} 
                                size={1}
                            />
                        </div>

                        {/* <div className="relative w-[38px] h-[38px] mt-2 flex justify-center items-center rounded-[20%] bg-gray-700">
                            <div className="absolute bottom-0 left-0 w-full bg-primary rounded-[20%] rounded-b-[20%]" style={getBackgroundStyle(status.stress)}></div>
                            <Icon
                                className={`relative z-10 ${getClass(status.stress)}`}
                                path={mdiBrain} 
                                size={1}
                            />
                        </div> */}
                    </div>
                </div>
            )}
        </>
    );
}

export default App;