import React, { createContext, ReactNode, useContext, useState } from "react";
import { MenuItem } from "../features/menu/menuInterfaces";


interface UiContextType {
    isRegularModalOpen: boolean;
    toggleModel: () => void;
    selectedPizza:MenuItem|null;
    setSelectedPizza:React.Dispatch<React.SetStateAction<MenuItem|null>>;
}
const UiContext=createContext<UiContextType|undefined>(undefined);


function UiProvider({children}:{children:ReactNode}) {
    const [isRegularModalOpen,setIsRegularModalOpen]=useState<boolean>(false);
    function toggleModel():void {
        setIsRegularModalOpen(!isRegularModalOpen);
    }
    
    const [selectedPizza, setSelectedPizza] = useState<MenuItem | null>(null);
    
    const value={isRegularModalOpen,toggleModel,selectedPizza,setSelectedPizza}
    
    return <UiContext.Provider value={value}>{children}</UiContext.Provider>
}

function useUiContext() {
    const context = useContext(UiContext);
    if(context===undefined){
        throw new Error("UiContext was used outside of the ui provider");
    }
    return context;
}

export {UiProvider,useUiContext};