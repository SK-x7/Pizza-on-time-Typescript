export function formatCurrency(value:number) {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  }
  
  export function formatDate(dateStr:string) {
    return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateStr));
  }
  
  export function calcMinutesLeft(dateStr:string) {
    const d1 = new Date().getTime();
    const d2 = new Date(dateStr).getTime();
    return Math.round((d2 - d1) / 60000);
  }
  
  export function getEstimatedDeliveryTime(min:number, max:number) {
    const currentDate = new Date();
    const estimatedMinutes = Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Add estimated minutes to the current date
    currentDate.setMinutes(currentDate.getMinutes() + estimatedMinutes);
    
    // Format the date as 'YYYY-MM-DD HH:MM'
    // const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`;
    
    return currentDate;
  }
  
  // Example usage for a random delivery time between 30 and 60 minutes
  
  
  