import { createContext, ReactNode, useContext, useState } from "react";


interface UiContextType {
    isRegularModalOpen: boolean;
    toggleModel: () => void;
}
const UiContext=createContext<UiContextType|undefined>(undefined);


function UiProvider({children}:{children:ReactNode}) {
    const [isRegularModalOpen,setIsRegularModalOpen]=useState<boolean>(false);
    function toggleModel():void {
        setIsRegularModalOpen(!isRegularModalOpen);
    }
    
    const value={isRegularModalOpen,toggleModel}
    
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